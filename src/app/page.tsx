import {
  HeroSection,
  PanicButton,
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

      {/* 2. PANIC BUTTON - Untuk deadline darurat */}
      <PanicButton />

      {/* 3. PROMO - Trigger impulse */}
      <PromoSection />

      {/* 4. SERVICES - Apa yang bisa dikerjakan */}
      <ServicesSection />

      {/* 5. CALCULATOR - Transparansi harga = Kepercayaan */}
      <PriceCalculator />

      {/* 6. TESTIMONIALS - Social proof */}
      <TestimonialsSection />

      {/* 7. WHY US - Keunggulan */}
      <WhyChooseUs />

      {/* 8. FAQ - Jawab keraguan */}
      <FAQSection />

      {/* 9. LOCATION - Di mana? */}
      <LocationSection />

      {/* 10. MEMBER - Retention (BUKAN acquisition) */}
      <MemberSection />
    </>
  );
}
