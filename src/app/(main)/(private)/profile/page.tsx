import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { ProfileView } from "./_components/profile-view";

export const metadata: Metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const [tCommon, tProfile] = await Promise.all([
    getTranslations("Common"),
    getTranslations("Profile"),
  ]);

  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: tCommon("home"), href: "/" },
          { name: tProfile("title"), isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h3"
        variant="plain"
        alignment="left"
        constrain={false}
        title={tProfile("title")}
        description={tProfile("description")}
        className="border-b pb-6"
      />

      <ProfileView />
    </PageWrapper>
  );
}
