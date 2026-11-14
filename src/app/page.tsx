import {
  CategoryGrid,
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
      <StorySection />
      <ProbashiGuideSection />
      <ReviewsSection />
      <ClosingCta />
    </>
  );
}
