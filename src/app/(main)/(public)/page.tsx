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
import { getHomeSections, getSettings } from "@/services/api";

export default async function HomePage() {
  const [homeRes, settingsRes] = await Promise.all([
    getHomeSections().catch(() => null),
    getSettings().catch(() => null),
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
