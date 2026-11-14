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

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProductsSection />
      <CategoryShowcaseSection />
      <StorySection />
      <ProbashiGuideSection />
      <ReviewsSection />
      <ClosingCta />
    </>
  );
}
