import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  tool,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import type {
  ApiCategory,
  ApiOrder,
  ApiProduct,
  ApiResponse,
  StoreSetting,
} from "@/types";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const MAX_CLIENT_MESSAGES = 30;
const MAX_MODEL_CONTEXT_MESSAGES = 20;
const MAX_TEXT_PART_LENGTH = 1000;
const BACKEND_TIMEOUT_MS = 5000;

const ipRequestLog = new Map<string, number[]>();

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        id: z.string().max(100).optional(),
        role: z.enum(["user", "assistant"]),
        parts: z
          .array(
            z.union([
              z.object({
                type: z.literal("text"),
                text: z.string().max(MAX_TEXT_PART_LENGTH),
              }),
              z
                .object({
                  type: z.string().max(100),
                })
                .passthrough(),
            ]),
          )
          .max(20),
      }),
    )
    .min(1)
    .max(MAX_CLIENT_MESSAGES),
});

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (ipRequestLog.get(ip) ?? []).filter((ts) => ts > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = timestamps[0] ?? now;
    const retryAfterSec = Math.max(
      1,
      Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000),
    );
    ipRequestLog.set(ip, timestamps);
    return { allowed: false, retryAfterSec };
  }

  timestamps.push(now);
  ipRequestLog.set(ip, timestamps);
  return { allowed: true, retryAfterSec: 0 };
}

function getBackendApiBaseUrl(): string {
  const backendOrigin = process.env.API_BACKEND_URL?.trim().replace(/\/+$/, "");
  if (backendOrigin) {
    return `${backendOrigin}/api/v1`;
  }

  const publicBase = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (publicBase && /^https?:\/\//i.test(publicBase)) {
    return publicBase.replace(/\/+$/, "");
  }

  return "http://localhost:5000/api/v1";
}

async function fetchBackend<T>(
  path: string,
  revalidateSeconds?: number,
): Promise<T | null> {
  try {
    const fetchOptions: RequestInit & { next?: { revalidate: number } } =
      revalidateSeconds !== undefined
        ? {
            next: { revalidate: revalidateSeconds },
            signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
          }
        : {
            cache: "no-store",
            signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
          };

    const res = await fetch(`${getBackendApiBaseUrl()}${path}`, fetchOptions);
    if (!res.ok) return null;
    const json = (await res.json()) as ApiResponse<T>;
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim()) {
    return Response.json(
      {
        error:
          "AI assistant is not configured yet (missing GOOGLE_GENERATIVE_AI_API_KEY).",
      },
      { status: 503 },
    );
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return Response.json(
      { error: "Too many messages. Please wait a moment and try again." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid chat message payload." },
      { status: 400 },
    );
  }

  const sanitizedMessages = parsed.data.messages
    .slice(-MAX_MODEL_CONTEXT_MESSAGES)
    .map((msg) => ({
      id: msg.id ?? crypto.randomUUID(),
      role: msg.role,
      parts:
        msg.role === "user"
          ? msg.parts.filter(
              (p): p is { type: "text"; text: string } => p.type === "text",
            )
          : msg.parts,
    })) as UIMessage[];

  const modelId = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash-lite";

  const result = streamText({
    model: google(modelId),
    maxOutputTokens: 600,
    instructions: [
      "You are Bongaon Assistant, the friendly bilingual (Bangla & English) shopping and customer support assistant for Bongaon Bazar — a Bangladeshi online store selling authentic village foods (shutki, bhorta, homemade achar, pure ghee, mustard oil, date jaggery/gur, Sundarbans honey, village spices, and probashi family combos) with nationwide Cash on Delivery.",
      "Reply in the same language the customer uses (Bangla, Banglish, or English). Keep answers concise, warm, and in plain text (avoid markdown formatting like **bold**).",
      "Always use the live tools to look up products, categories, delivery charges/store info, or order tracking instead of guessing prices, stock, or policies. After every tool call, always write a clear helpful reply summarizing the result.",
      "Never invent product prices or order statuses. If a customer wants to track an order, ask for both their order number (e.g. BB-2026-123456) and receiver phone number before calling trackOrder.",
    ].join(" "),
    messages: await convertToModelMessages(sanitizedMessages),
    stopWhen: isStepCount(5),
    tools: {
      searchProducts: tool({
        description:
          "Search active Bongaon Bazar products by keyword or category slug.",
        inputSchema: z.object({
          searchTerm: z
            .string()
            .trim()
            .max(100)
            .optional()
            .describe("Product keyword such as shutki, gur, ghee, achar, honey"),
          categorySlug: z
            .string()
            .trim()
            .max(100)
            .optional()
            .describe("Optional category slug from getCategories"),
        }),
        execute: async ({ searchTerm, categorySlug }) => {
          const params = new URLSearchParams({
            isActive: "true",
            limit: "5",
          });
          if (searchTerm) params.set("searchTerm", searchTerm);
          if (categorySlug) params.set("categorySlug", categorySlug);

          const products = await fetchBackend<ApiProduct[]>(
            `/products?${params.toString()}`,
          );

          if (!products || products.length === 0) {
            return { products: [], message: "No matching active products found." };
          }

          return {
            products: products.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              price: p.price,
              originalPrice: p.originalPrice,
              unit: p.unit,
              stock: p.stock,
              imageUrl: p.imageUrl,
              shortTag: p.shortTag,
              deliveryDays: p.deliveryDays,
            })),
          };
        },
      }),
      getCategories: tool({
        description: "Get all active product categories at Bongaon Bazar.",
        inputSchema: z.object({}),
        execute: async () => {
          const categories = await fetchBackend<ApiCategory[]>(
            "/categories?isActive=true&limit=20",
            60,
          );
          if (!categories) {
            return { categories: [] };
          }
          return {
            categories: categories.map((c) => ({
              name: c.name,
              slug: c.slug,
              subtitle: c.subtitle,
              productCount: c._count?.products ?? 0,
            })),
          };
        },
      }),
      getStoreInfo: tool({
        description:
          "Get Bongaon Bazar delivery charges, free delivery minimum order, estimated delivery days, support phone, WhatsApp, and store status.",
        inputSchema: z.object({}),
        execute: async () => {
          const setting = await fetchBackend<StoreSetting>("/settings", 60);
          if (!setting) {
            return { error: "Could not load store settings." };
          }
          return {
            storeName: setting.storeName,
            supportPhone: setting.supportPhone,
            whatsappNumber: setting.whatsappNumber,
            supportEmail: setting.supportEmail,
            storeAddress: setting.storeAddress,
            defaultDeliveryCharge: setting.defaultDeliveryCharge,
            freeDeliveryMinOrder: setting.freeDeliveryMinOrder,
            estimatedDeliveryDays: setting.estimatedDeliveryDays,
            isOrderingEnabled: setting.isOrderingEnabled,
          };
        },
      }),
      trackOrder: tool({
        description:
          "Track a Bongaon Bazar COD order using orderNumber and receiver phone number.",
        inputSchema: z.object({
          orderNumber: z
            .string()
            .trim()
            .min(3)
            .max(50)
            .describe("Order number such as BB-2026-123456"),
          phone: z
            .string()
            .trim()
            .min(6)
            .max(30)
            .describe("Receiver phone number used during checkout"),
        }),
        execute: async ({ orderNumber, phone }) => {
          const query = new URLSearchParams({ phone });
          const order = await fetchBackend<ApiOrder>(
            `/orders/track/${encodeURIComponent(orderNumber)}?${query.toString()}`,
          );

          if (!order) {
            return {
              found: false,
              error: "Order not found with this order number and phone.",
            };
          }

          return {
            found: true,
            orderNumber: order.orderNumber,
            status: order.status,
            total: order.total,
            district: order.district,
            paymentMethod: order.paymentMethod,
            itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
            createdAt: order.createdAt,
          };
        },
      }),
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
