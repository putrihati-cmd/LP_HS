import Link from 'next/link';
import { Upload, Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900" />

      {/* Animated Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 h-96 w-96 animate-pulse rounded-full bg-white blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 animate-pulse rounded-full bg-orange-400 blur-3xl delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
          <span className="text-sm text-white">
            Buka Setiap Hari 06:30 - 21:30 WIB
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-4xl leading-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          CETAK
          <br />
          <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            TANPA ANTRE.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100 sm:text-xl">
          Layanan fotocopy, print, dan jilid profesional di Purwokerto. Kirim
          file dari kasur, ambil di toko saat sudah siap.
        </p>

        {/* Stats */}
        <div className="mb-10 flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">30</div>
            <div className="text-sm text-blue-200">Menit Siap</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">Rp 150</div>
            <div className="text-sm text-blue-200">Mulai Dari</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5★</div>
            <div className="text-sm text-blue-200">Rating</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href={getWhatsAppLink(
              'Halo, saya ingin upload file untuk diprint.'
            )}
            target="_blank"
          >
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <Upload className="h-5 w-5" />
              Upload File
            </Button>
          </Link>
          <Link href="#calculator">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white text-white hover:bg-white/10 sm:w-auto"
            >
              <Calculator className="h-5 w-5" />
              Hitung Harga
            </Button>
          </Link>
          <Link href="/layanan">
            <Button
              variant="ghost"
              size="lg"
              className="w-full text-white hover:bg-white/10 sm:w-auto"
            >
              Layanan Kami
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50 pt-2">
          <div className="h-3 w-1 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
