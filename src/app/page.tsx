import {
  HeroSection,
  PromoSection,
  MemberSection,
  ServicesSection,
  PriceCalculator,
  WhyChooseUs,
  LocationSection,
  FAQSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <MemberSection />
      <ServicesSection />
      <WhyChooseUs />
      <PriceCalculator />
      <FAQSection />
      <LocationSection />
    </>
  );
}
