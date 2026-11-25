import { getTranslations } from "next-intl/server";
import {
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Truck,
} from "lucide-react";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { getSettings } from "@/services/api";
import { ContactForm } from "./_components/contact-form";

export default async function ContactPage() {
  const [tCommon, tContact, tProducts, settingsRes] = await Promise.all([
    getTranslations("Common"),
    getTranslations("Contact"),
    getTranslations("Products"),
    getSettings().catch(() => null),
  ]);

  const settings = settingsRes?.data;

  const contactItems = [
    {
      icon: MapPin,
      title: tContact("infoAddressTitle"),
      value: settings?.storeAddress || tContact("infoAddressValue"),
    },
    {
      icon: PhoneCall,
      title: tContact("infoPhoneTitle"),
      value: settings?.supportPhone || tContact("infoPhoneValue"),
    },
    {
      icon: MessageCircle,
      title: tContact("infoWhatsappTitle"),
      value: settings?.whatsappNumber || tContact("infoWhatsappValue"),
    },
    {
      icon: Truck,
      title: tContact("infoDeliveryTitle"),
      value: settings?.estimatedDeliveryDays || tContact("infoDeliveryValue"),
    },
  ];

  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: tCommon("home"), href: "/" },
          { name: tContact("breadcrumb"), isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h3"
        variant="plain"
        alignment="left"
        title={tContact("title")}
        description={tContact("description")}
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

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title}>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div className="space-y-1">
                      <h2 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </PageWrapper>
  );
}
