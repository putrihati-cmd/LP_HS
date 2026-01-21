import {
  HeroSection,
  PromoSection,
  ServicesSection,
  PriceCalculator,
  WhyChooseUs,
  MemberSection,
  LocationSection,
  FAQSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromoSection />
      <ServicesSection />
      <WhyChooseUs />
      <PriceCalculator />
      <MemberSection />
      <FAQSection />
      <LocationSection />
    </>
  );
}
