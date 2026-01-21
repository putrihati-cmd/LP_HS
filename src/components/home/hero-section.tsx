'use client';

import Link from 'next/link';
import { Upload, Calculator, FileText } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient - Blue to Soft Orange */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500/30" />

      {/* Background Pattern - Dots */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute top-20 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div
          className="animate-float absolute right-10 bottom-20 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8">
        {/* Operating Hours Badge */}
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-md">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wide text-white">
            Buka Setiap Hari 06:30 - 21:30 WIB
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="mb-6 text-5xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          CETAK TANPA
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300 bg-clip-text text-transparent">
            ANTRI
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed font-light text-blue-100 sm:text-2xl">
          Layanan fotocopy, print, dan jilid profesional di Purwokerto.
          <br className="hidden sm:block" />
          Kirim file dari kasur, ambil di toko saat sudah siap.
        </p>

        {/* 3 CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {/* Upload File Button */}
          <Link
            href={getWhatsAppLink('Halo, saya mau upload file untuk diprint')}
            target="_blank"
          >
            <Button
              size="lg"
              className="h-14 min-w-[200px] rounded-full bg-orange-500 px-8 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:scale-105 hover:bg-orange-600 hover:shadow-orange-500/50"
            >
              <Upload className="mr-2 h-6 w-6" />
              Upload File
            </Button>
          </Link>

          {/* Get Quote Button */}
          <Link
            href="#calculator"
            onClick={e => {
              e.preventDefault();
              document
                .querySelector('#calculator')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Button
              size="lg"
              className="h-14 min-w-[200px] rounded-full bg-white px-8 text-lg font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-gray-100"
            >
              <Calculator className="mr-2 h-6 w-6" />
              Hitung Harga
            </Button>
          </Link>

          {/* View Pricing Button */}
          <Link
            href="#services"
            onClick={e => {
              e.preventDefault();
              document
                .querySelector('#services')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Button
              size="lg"
              className="h-14 min-w-[200px] rounded-full border-2 border-white/30 bg-white/10 px-8 text-lg font-bold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
            >
              <FileText className="mr-2 h-6 w-6" />
              Lihat Layanan
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
          {[
            { label: 'Pelanggan Puas', value: '10.000+' },
            { label: 'Halaman Tercetak', value: '1 Juta+' },
            { label: 'Tahun Pengalaman', value: '5+' },
            { label: 'Rating', value: '4.9/5' },
          ].map((stat, i) => (
            <div key={i} className="group text-center">
              <div
                className="animate-count-up text-3xl font-bold text-white transition-colors group-hover:text-orange-400 sm:text-4xl"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium tracking-wider text-blue-200 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white/50 pt-2">
          <div className="h-3 w-1 animate-pulse rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}
