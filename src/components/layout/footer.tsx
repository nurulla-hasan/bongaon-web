import Link from "next/link";
import { MapPin, PhoneCall, ShieldCheck, Truck } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { Separator } from "@/components/ui/separator";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div
        className={cn(
          "mx-auto py-12",
          CONTAINER_MAX_WIDTH,
          CONTAINER_GUTTER
        )}
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Logo size="md" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              বনগাঁও গ্রামের নিজস্ব ও খাঁটি প্যাকেটজাত খাবার — শহরের ব্যস্ত পরিবার
              এবং প্রবাসীদের প্রিয়জনের জন্য সরাসরি পৌঁছে দেওয়ার নির্ভরযোগ্য ঠিকানা।
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              প্রয়োজনীয় লিংক
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">
                  হোমপেজ
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-foreground">
                  সব স্পেশাল প্রোডাক্ট
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-foreground">
                  আপনার কার্ট
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-foreground">
                  ক্যাশ অন ডেলিভারি চেকআউট
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              ডেলিভারি ও পেমেন্ট
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Truck className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>বাংলাদেশের যেকোনো জেলায় ৪–৭ দিনে ডেলিভারি</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>১০০% ক্যাশ অন ডেলিভারি (হাতে পেয়ে টাকা দিন)</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              যোগাযোগ ও ঠিকানা
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>বনগাঁও বাজার, বাংলাদেশ</span>
              </li>
              <li className="flex items-start gap-2">
                <PhoneCall className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>হেল্পলাইন: ০১৭০০-০০০০০০ (সকাল ৯টা – রাত ৯টা)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8">
          <Separator />
        </div>

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© ২০২৬ Bongaon Bazar — সর্বস্বত্ব সংরক্ষিত।</p>
          <p>UI/UX প্রোটোটাইপ (স্ট্যাটিক মক ডেটা ভার্সন)</p>
        </div>
      </div>
    </footer>
  );
}
