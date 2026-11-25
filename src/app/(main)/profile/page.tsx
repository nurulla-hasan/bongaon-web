import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/common/section-heading";
import { CONTAINER_GUTTER, CONTAINER_MAX_WIDTH } from "@/lib/layout";
import { cn } from "@/lib/utils";
import { ProfileView } from "./_components/profile-view";

export const metadata: Metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const t = await getTranslations("Profile");

  return (
    <section className={cn("mx-auto py-10", CONTAINER_MAX_WIDTH, CONTAINER_GUTTER)}>
      <div className="flex flex-col gap-8">
        <SectionHeading
          as="h1"
          alignment="left"
          constrain={false}
          title={t("title")}
          description={t("description")}
        />

        <ProfileView />
      </div>
    </section>
  );
}
