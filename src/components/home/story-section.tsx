import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, Sprout } from "lucide-react";
import { SectionWrapper } from "@/components/common/section-wrapper";
import { Button } from "@/components/ui/button";

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
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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

          <div className="mt-8">
            <Button size="xl" render={<Link href="/products" />}>
              {t("storyCta")}
              <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
