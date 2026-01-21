import {
  HeroSection,
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
      <ServicesSection />
      <WhyChooseUs />
      <PriceCalculator />
      <FAQSection />
      <LocationSection />
    </>
  );
}
