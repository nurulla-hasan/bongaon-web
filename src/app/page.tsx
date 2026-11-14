import {
  CategoryGrid,
  ClosingCta,
  FeaturedProductsSection,
  HeroBanner,
  ProbashiGuideSection,
  ReviewsSection,
  StorySection,
  TrustBar,
} from "@/components/storefront/home-sections";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProductsSection />
      <StorySection />
      <ProbashiGuideSection />
      <ReviewsSection />
      <ClosingCta />
    </>
  );
}
