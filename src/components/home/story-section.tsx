import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, Leaf, Sprout } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { cn } from "@/lib/utils";
import { ctaPrimary } from "./cta";

export async function StorySection() {
  const t = await getTranslations("Home");
  const points = [t("heroPoint2"), t("trust3Desc"), t("trust1Desc")];

  return (
    <SectionWrapper id="story" padding="lg">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative isolate">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-4xl bg-primary/10 blur-2xl"
          />
          <div className="relative aspect-4/3 overflow-hidden rounded-4xl border border-border/70 shadow-xl">
            <Image
              src="/images/story-village-kitchen.png"
              alt="বনগাঁও গ্রামের রান্নাঘরে হাতে আচার বয়াম ভরা হচ্ছে"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-2xl bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sprout className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {t("storyFamilies")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("storyInvolved")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-clay/10 px-4 py-1.5 text-xs font-semibold text-clay">
            <Leaf className="size-3.5" />
            {t("storyBadge")}
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("storyTitle")}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {t("storyDesc")}
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Link href="/products" className={cn(ctaPrimary, "mt-8")}>
            {t("storyCta")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
