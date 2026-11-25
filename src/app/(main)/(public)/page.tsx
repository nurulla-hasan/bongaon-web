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
import { productApi } from "@/services/api";

export default async function HomePage() {
  let homeData = null;
  try {
    const res = await productApi.getHomeSections();
    homeData = res.data ?? null;
  } catch {
    homeData = null;
  }

  return (
    <>
      <HeroBanner highlightProduct={homeData?.featuredProducts?.[0]} />
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
