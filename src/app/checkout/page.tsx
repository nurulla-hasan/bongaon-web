import Link from "next/link";
import {
  CheckCircle2,
  Globe,
  HandCoins,
  Home,
  ShieldCheck,
  Truck,
} from "lucide-react";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DELIVERY_CHARGE_BDT, MOCK_CART_ITEMS } from "@/data/mock-bazar";

export default function CheckoutPage() {
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
          { name: "কার্ট", href: "/cart" },
          { name: "চেকআউট (COD)", isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h1"
        alignment="left"
        eyebrow="লগইন ছাড়াই অর্ডার"
        title="ক্যাশ অন ডেলিভারি চেকআউট"
        description="শুধুমাত্র বাংলাদেশের ভেতরের ঠিকানা দিন। ৪–৭ দিনের মধ্যে পার্সেল পৌঁছে যাবে এবং হাতে পেয়েই টাকা পরিশোধ করা যাবে।"
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>১. অর্ডারটি কার জন্য?</CardTitle>
              <CardDescription>
                নিজের শহরের বাসায় নিতে পারেন অথবা প্রবাস থেকে দেশের পরিবারের
                ঠিকানায় পাঠাতে পারেন।
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border-2 border-primary bg-primary/5 p-4">
                <Home className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      নিজের জন্য (শহরে)
                    </p>
                    <Badge variant="default">নির্বাচিত</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    আপনি নিজেই পার্সেল রিসিভ করবেন ও COD টাকা দেবেন।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <Globe className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    প্রবাস থেকে পরিবারের জন্য
                  </p>
                  <p className="text-xs text-muted-foreground">
                    দেশে থাকা পরিবার পার্সেল হাতে পেয়ে টাকা পরিশোধ করবে।
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>২. ডেলিভারি ঠিকানা ও রিসিভার তথ্য</CardTitle>
              <CardDescription>
                ডেলিভারির আগে কুরিয়ার থেকে রিসিভারের নম্বরে কল করা হবে।
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="receiver-name">রিসিভারের পূর্ণ নাম *</Label>
                  <Input
                    id="receiver-name"
                    placeholder="যেমন: মো. রাশেদুল ইসলাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiver-phone">
                    রিসিভারের মোবাইল নম্বর (বাংলাদেশ) *
                  </Label>
                  <Input id="receiver-phone" placeholder="017XXXXXXXX" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="district">জেলা ও থানা *</Label>
                  <Input id="district" placeholder="যেমন: ঢাকা, মিরপুর-১০" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="probashi-whatsapp">
                    অর্ডারকারীর WhatsApp (প্রবাসী হলে ঐচ্ছিক)
                  </Label>
                  <Input
                    id="probashi-whatsapp"
                    placeholder="+966 / +971 / +880..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-address">
                  বিস্তারিত বাসা/বাড়ির ঠিকানা ও ল্যান্ডমার্ক *
                </Label>
                <Textarea
                  id="full-address"
                  rows={3}
                  placeholder="বাসা নং, রোড নং, পাড়া বা কাছাকাছি পরিচিত জায়গার নাম..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order-note">বিশেষ নির্দেশনা (ঐচ্ছিক)</Label>
                <Input
                  id="order-note"
                  placeholder="যেমন: মায়ের জন্য উপহার, বিকেলে ডেলিভারি দিলে ভালো হয়"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>৩. পেমেন্ট পদ্ধতি</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 rounded-xl border border-primary/40 bg-primary/5 p-4">
                <HandCoins className="mt-0.5 size-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      ক্যাশ অন ডেলিভারি (Cash on Delivery)
                    </p>
                    <Badge variant="secondary">একমাত্র মাধ্যম</Badge>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    আগে কোনো টাকা দিতে হবে না। ৪–৭ দিনের মধ্যে পার্সেল হাতে
                    পেয়ে ডেলিভারি ম্যানকে মোট ৳{total} পরিশোধ করবেন।
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>আপনার অর্ডারের বিবরণ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {MOCK_CART_ITEMS.map((item) => (
                  <div
                    key={`${item.product.slug}-${item.selectedPack}`}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.selectedPack} × {item.quantity}
                      </p>
                    </div>
                    <span className="font-semibold text-foreground">
                      ৳{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">সাবটোটাল</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
                  <span>৳{DELIVERY_CHARGE_BDT}</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-foreground">
                  মোট প্রদেয় (হাতে পেয়ে)
                </span>
                <span className="text-2xl font-bold text-primary">
                  ৳{total}
                </span>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Truck className="size-4 shrink-0 text-primary" />
                  <span>সম্ভাব্য ডেলিভারি: ৪ থেকে ৭ কর্মদিবস</span>
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="size-4 shrink-0 text-primary" />
                  <span>শুধুমাত্র বাংলাদেশের ভেতরে ডেলিভারি প্রযোজ্য</span>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
                size="xl"
                className="w-full"
                render={<Link href="/order-success" />}
              >
                <CheckCircle2 />
                অর্ডার কনফার্ম করুন (COD)
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                render={<Link href="/cart" />}
              >
                কার্টে ফিরে যান
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
