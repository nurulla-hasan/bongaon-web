import CustomBreadcrumb from "@/components/common/custom-breadcrumb";
import { PageWrapper } from "@/components/common/page-wrapper";
import { SectionHeading } from "@/components/common/section-heading";
import { ProductCard } from "@/components/storefront/product-card";
import { Badge } from "@/components/ui/badge";
import { BAZAR_CATEGORIES, BAZAR_PRODUCTS } from "@/data/mock-bazar";

export default function ProductsPage() {
  return (
    <PageWrapper>
      <CustomBreadcrumb
        links={[
          { name: "হোম", href: "/" },
          { name: "সব প্রোডাক্ট", isCurrent: true },
        ]}
      />

      <SectionHeading
        as="h1"
        alignment="left"
        eyebrow="Bongaon Bazar ক্যাটালগ"
        title="গ্রামের সব স্পেশাল প্যাকেটজাত প্রোডাক্ট"
        description="শহরের বাসায় কিংবা প্রবাস থেকে দেশের পরিবারের ঠিকানায় ৪–৭ দিনে ক্যাশ অন ডেলিভারিতে অর্ডার করুন।"
      />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge variant="default">সবগুলো ({BAZAR_PRODUCTS.length})</Badge>
        {BAZAR_CATEGORIES.map((category) => (
          <Badge key={category.id} variant="outline">
            {category.name}
          </Badge>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BAZAR_PRODUCTS.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </PageWrapper>
  );
}
