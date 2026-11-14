import Link from "next/link";
import { ArrowRight, CheckCircle2, HandCoins, Truck } from "lucide-react";
import { PageWrapper } from "@/components/common/page-wrapper";
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

export default function OrderSuccessPage() {
  const subtotal = MOCK_CART_ITEMS.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const total = subtotal + DELIVERY_CHARGE_BDT;

  return (
    <PageWrapper padding="spacious">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="size-9" />
            </div>
            <div className="flex justify-center">
              <Badge variant="secondary">অর্ডার নম্বর: #BB-2026-104</Badge>
            </div>
            <CardTitle>আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে!</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-center text-sm leading-relaxed text-muted-foreground">
              ধন্যবাদ! বনগাঁও থেকে আপনার স্পেশাল প্যাকেটজাত খাবারগুলো ফ্রেশ
              প্যাক করে পাঠানো হবে। ডেলিভারির আগে রিসিভারের মোবাইল নম্বরে কল করা
              হবে।
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <Truck className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    ডেলিভারি সময়সীমা
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    ৪ থেকে ৭ দিনের মধ্যে
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <HandCoins className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    পেমেন্ট মাধ্যম
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    ক্যাশ অন ডেলিভারি (৳{total})
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <p className="font-semibold text-foreground">অর্ডারকৃত পণ্যসমূহ:</p>
              {MOCK_CART_ITEMS.map((item) => (
                <div
                  key={`${item.product.slug}-${item.selectedPack}`}
                  className="flex items-center justify-between text-muted-foreground"
                >
                  <span>
                    {item.product.name} ({item.selectedPack}) × {item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    ৳{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap justify-center gap-3">
            <Button size="lg" render={<Link href="/products" />}>
              আরও প্রোডাক্ট দেখুন
              <ArrowRight />
            </Button>
            <Button variant="outline" size="lg" render={<Link href="/" />}>
              হোমপেজে ফিরে যান
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageWrapper>
  );
}
