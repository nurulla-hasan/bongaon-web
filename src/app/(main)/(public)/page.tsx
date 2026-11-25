import {
  CategoryGrid,
  CategoryShowcaseSection,
  ClosingCta,
  FeaturedProductsSection,
  HeroBanner,
  ProbashiGuideSection,
  ReviewsSection,
  StorySection,
} from "@/components/home";
import { productApi, settingApi } from "@/services/api";

export default async function HomePage() {
  const [homeRes, settingsRes] = await Promise.all([
    productApi.getHomeSections().catch(() => null),
    settingApi.getSettings().catch(() => null),
  ]);

  const homeData = homeRes?.data ?? null;
  const heroBanners = settingsRes?.data?.heroBanners ?? [];

  return (
    <>
      <HeroBanner banners={heroBanners} />
      <CategoryGrid apiCategories={homeData?.categories} />
      <FeaturedProductsSection apiProducts={homeData?.featuredProducts} />
      <CategoryShowcaseSection apiShowcases={homeData?.showcases} />
      <StorySection />
      <ProbashiGuideSection />
      <ReviewsSection />
      <ClosingCta />
    </>
  );
}
