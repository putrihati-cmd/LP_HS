import {
  HeroSection,
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
      <ServicesSection />
      <WhyChooseUs />
      <PriceCalculator />
      <MemberSection />
      <FAQSection />
      <LocationSection />
    </>
  );
}
