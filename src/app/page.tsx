import {
  HeroSection,
  PromoSection,
  MemberSection,
  ServicesSection,
  GallerySection,
  TestimonialsSection,
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
      <TestimonialsSection />
      <WhyChooseUs />
      <PriceCalculator />
      <FAQSection />
      <LocationSection />
    </>
  );
}
