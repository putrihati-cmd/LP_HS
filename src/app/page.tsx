import {
  HeroSection,
  PromoSection,
  MemberSection,
  ServicesSection,
  GallerySection,
  WhyChooseUs,
  PriceCalculator,
  FAQSection,
  LocationSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <MemberSection />
      <ServicesSection />
      <GallerySection />
      <WhyChooseUs />
      <PriceCalculator />
      <FAQSection />
      <LocationSection />
    </>
  );
}
