'use client';

import Link from 'next/link';
import { Send, Calculator, FileText } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gray-900 pt-20">
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
          <span className="text-sm text-gray-300">Buka 07:00 - 21:00 WIB</span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
          Fotocopy & Cetak
          <br />
          <span className="text-gray-400">Cepat, Rapi, Berkualitas</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
          Kirim file via WhatsApp, tinggal ambil. Melayani mahasiswa, pelajar,
          dan umum di Purwokerto.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={getWhatsAppLink('Halo, saya mau kirim file untuk dicetak')}
            target="_blank"
          >
            <Button
              size="lg"
              className="h-12 min-w-[180px] rounded-full bg-white px-6 font-bold text-gray-900 transition-all hover:bg-gray-100"
            >
              <Send className="mr-2 h-5 w-5" />
              Kirim File
            </Button>
          </Link>

          <Link href="#calculator">
            <Button
              size="lg"
              className="h-12 min-w-[180px] rounded-full border border-gray-600 bg-transparent px-6 font-bold text-white transition-all hover:bg-gray-800"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Hitung Harga
            </Button>
          </Link>
        </div>

        {/* Quick Info */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Print dari WA / Flashdisk</span>
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>A4, F4, A3</span>
          </div>
          <div className="flex items-center gap-2">
            <span>•</span>
            <span>Mulai Rp 300/lembar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
