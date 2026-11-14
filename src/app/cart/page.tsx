import Link from "next/link";
import { ArrowRight, Minus, Plus, ShieldCheck, Trash2, Truck } from "lucide-react";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductVisual } from "@/components/storefront/product-visual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DELIVERY_CHARGE_BDT, MOCK_CART_ITEMS } from "@/data/mock-bazar";

export default function CartPage() {
  const subtotal = MOCK_CART_ITEMS.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal + DELIVERY_CHARGE_BDT;

  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: "হোম", href: "/" },
          { name: "আপনার কার্ট", isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h1"
        alignment="left"
        eyebrow="অর্ডার রিভিউ"
        title="আপনার শপিং কার্ট"
        description="চেকআউটে যাওয়ার আগে পণ্যের পরিমাণ ও প্যাকেট সাইজ দেখে নিন।"
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          {MOCK_CART_ITEMS.map((item) => (
            <Card key={`${item.product.slug}-${item.selectedPack}`}>
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="w-full shrink-0 sm:w-36">
                  <ProductVisual
                    tone={item.product.visualTone}
                    unit={item.selectedPack}
                    shortTag={item.product.shortTag}
                    image={item.product.image}
                    alt={item.product.name}
                    size="card"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Badge variant="secondary">{item.product.category}</Badge>
                      <h2 className="mt-1 text-base font-semibold text-foreground">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        প্যাকেট: {item.selectedPack} • প্রতি প্যাক ৳
                        {item.unitPrice}
                      </p>
                    </div>

                    <p className="text-lg font-bold text-primary">
                      ৳{item.unitPrice * item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon-sm" aria-label="কমান">
                        <Minus />
                      </Button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <Button variant="outline" size="icon-sm" aria-label="বাড়ান">
                        <Plus />
                      </Button>
                    </div>

                    <Button variant="ghost" size="sm">
                      <Trash2 />
                      বাদ দিন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>অর্ডার সামারি</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">পণ্যের মূল্য</span>
                  <span className="font-medium text-foreground">
                    ৳{subtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    ডেলিভারি চার্জ (সারাদেশে)
                  </span>
                  <span className="font-medium text-foreground">
                    ৳{DELIVERY_CHARGE_BDT}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">
                  সর্বমোট (COD)
                </span>
                <span className="text-xl font-bold text-primary">৳{total}</span>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Truck className="size-4 shrink-0 text-primary" />
                  <span>৪–৭ দিনের মধ্যে হোম ডেলিভারি</span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="size-4 shrink-0 text-primary" />
                  <span>প্যাকেট হাতে পেয়ে ক্যাশ টাকা পরিশোধ</span>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                size="xl"
                className="w-full"
                render={<Link href="/checkout" />}
              >
                চেকআউটে যান (COD)
                <ArrowRight />
              </Button>
              <Button
                variant="outline"
                className="w-full"
                render={<Link href="/products" />}
              >
                আরও প্রোডাক্ট যোগ করুন
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
