'use client';

import Link from 'next/link';
import { Send, Calculator, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gray-900 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-700 bg-gray-800 px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span className="text-sm text-gray-300">
            Buka 06:30 - 21:00 WIB Setiap Hari
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
          Fotocopy & Cetak
          <br />
          <span className="text-gray-400">Cepat, Rapi, Berkualitas</span>
        </h1>

        {/* Subheadline - More compelling */}
        <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
          Kirim file via WhatsApp,{' '}
          <strong className="text-white">siap 5 menit!</strong> Melayani
          mahasiswa & umum di Purwokerto.
        </p>

        {/* CTA Buttons - More compelling */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={getWhatsAppLink('Halo, saya mau kirim file untuk dicetak')}
            target="_blank"
          >
            <Button
              size="lg"
              className="h-14 min-w-[220px] rounded-full bg-green-500 px-8 text-lg font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:scale-105 hover:bg-green-600"
            >
              <Send className="mr-2 h-5 w-5" />
              Kirim File Sekarang 📄
            </Button>
          </Link>

          <Link href="#calculator">
            <Button
              size="lg"
              className="h-14 min-w-[200px] rounded-full border-2 border-gray-600 bg-transparent px-6 font-bold text-white transition-all hover:bg-gray-800"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Hitung Harga
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2 rounded-full bg-gray-800/50 px-4 py-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Garansi Cetak Ulang</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-gray-800/50 px-4 py-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Harga Transparan</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-gray-800/50 px-4 py-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Mulai Rp 300</span>
          </div>
        </div>
      </div>
    </section>
  );
}
