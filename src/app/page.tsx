import {
  HeroSection,
  PanicButton,
  PromoSection,
  ServicesSection,
  UploadSection,
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

      {/* 5. UPLOAD - Kirim file langsung */}
      <UploadSection />

      {/* 6. CALCULATOR - Transparansi harga = Kepercayaan */}
      <PriceCalculator />

      {/* 7. TESTIMONIALS - Social proof */}
      <TestimonialsSection />

      {/* 8. WHY US - Keunggulan */}
      <WhyChooseUs />

      {/* 9. FAQ - Jawab keraguan */}
      <FAQSection />

      {/* 10. LOCATION - Di mana? */}
      <LocationSection />

      {/* 11. MEMBER - Retention (BUKAN acquisition) */}
      <MemberSection />
    </>
  );
}
