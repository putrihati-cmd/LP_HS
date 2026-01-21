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
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-md transition-all hover:bg-white/20">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wide text-white">
            Open Every Day 06:30 - 21:30
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-8 text-5xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Print Without
          <br />
          <span className="animate-gradient bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Queues
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed font-light text-gray-100 sm:text-2xl">
          Professional printing services in Purwokerto. Upload file dari kasur,
          ambil saat sudah siap.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href={getWhatsAppLink('Halo, saya mau upload file')}
            target="_blank"
          >
            <Button
              size="lg"
              className="h-14 min-w-[200px] rounded-full bg-blue-600 px-8 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-blue-500/50"
            >
              <Upload className="mr-2 h-6 w-6" />
              Upload File
            </Button>
          </Link>

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
              className="h-14 min-w-[200px] rounded-full border-2 border-white/20 bg-white/10 px-8 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
            >
              <Calculator className="mr-2 h-6 w-6" />
              Get Price
            </Button>
          </Link>
        </div>

        {/* Modern Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4 lg:gap-12">
          {[
            { label: 'Happy Customers', value: '10k+' },
            { label: 'Pages Printed', value: '1M+' },
            { label: 'Years Experience', value: '5+' },
            { label: 'Rating', value: '4.9/5' },
          ].map((stat, i) => (
            <div
              key={i}
              className="group text-center transition-transform duration-300 hover:scale-105"
            >
              <div className="text-3xl font-bold text-white transition-colors group-hover:text-orange-400 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium tracking-wider text-gray-400 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
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
