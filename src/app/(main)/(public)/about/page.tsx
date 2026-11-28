import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  Globe,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AboutPage() {
  const [tCommon, tAbout, tProducts] = await Promise.all([
    getTranslations("Common"),
    getTranslations("About"),
    getTranslations("Products"),
  ]);

  const pillars = [
    {
      icon: Sparkles,
      title: tAbout("pillar1Title"),
      desc: tAbout("pillar1Desc"),
    },
    {
      icon: PackageCheck,
      title: tAbout("pillar2Title"),
      desc: tAbout("pillar2Desc"),
    },
    {
      icon: Globe,
      title: tAbout("pillar3Title"),
      desc: tAbout("pillar3Desc"),
    },
  ];

  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: tCommon("home"), href: "/" },
          { name: tAbout("breadcrumb"), isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h3"
        variant="plain"
        alignment="left"
        title={tAbout("title")}
        description={tAbout("description")}
        className="border-b pb-6"
      >
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-xs font-medium text-foreground">
            <Truck className="size-3.5 text-primary" aria-hidden />
            {tProducts("catalogDeliveryTag")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-xs font-medium text-foreground">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden />
            {tProducts("catalogPaymentTag")}
          </span>
        </div>
      </SectionHeading>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {tAbout("storyHeading")}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {tAbout("storyParagraph1")}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            {tAbout("storyParagraph2")}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-square max-w-xs overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-xs">
            <Image
              src="/images/brand-seal.jpg"
              alt={tCommon("brandName")}
              fill
              sizes="(max-width: 1024px) 80vw, 320px"
              className="object-contain p-4"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {pillars.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title}>
              <CardHeader>
                <div className="space-y-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10">
        <Card>
          <CardContent>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-foreground">
                  {tAbout("ctaTitle")}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {tAbout("ctaDesc")}
                </p>
              </div>
              <Button size="xl" render={<Link href="/products" />}>
                {tAbout("ctaButton")}
                <ArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
