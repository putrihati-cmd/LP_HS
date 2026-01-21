import {
  HeroSection,
  PromoSection,
  ServicesSection,
  PriceCalculator,
  TestimonialsSection,
  WhyChooseUs,
  FAQSection,
  LocationSection,
  MemberSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      {/* 1. HERO - Solusi instan */}
      <HeroSection />

      {/* 2. PROMO - Trigger impulse */}
      <PromoSection />

      {/* 3. SERVICES - Apa yang bisa dikerjakan */}
      <ServicesSection />

      {/* 4. CALCULATOR - Transparansi harga = Kepercayaan */}
      <PriceCalculator />

      {/* 5. TESTIMONIALS - Social proof */}
      <TestimonialsSection />

      {/* 6. WHY US - Keunggulan */}
      <WhyChooseUs />

      {/* 7. FAQ - Jawab keraguan */}
      <FAQSection />

      {/* 8. LOCATION - Di mana? */}
      <LocationSection />

      {/* 9. MEMBER - Retention (BUKAN acquisition) */}
      <MemberSection />
    </>
  );
}
