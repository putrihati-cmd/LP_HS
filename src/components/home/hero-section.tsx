'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Printer,
  FileText,
  Palette,
  Send,
  Calculator,
  Award,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

// Stats Counter Hook
function useCountUp(end: number, duration: number = 2000) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let start = 0;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const current = Math.floor(progress * end);

              if (element) {
                element.textContent = current.toLocaleString('id-ID');
              }

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                if (element) element.textContent = end.toLocaleString('id-ID');
              }
            };

            requestAnimationFrame(animate);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration]);

  return ref;
}

export function HeroSection() {
  const customersRef = useCountUp(500, 2000);
  const projectsRef = useCountUp(10000, 2500);
  const yearsRef = useCountUp(5, 1500);

  return (
    <section
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20"
      style={{
        background:
          'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      }}
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="animate-float absolute top-[20%] left-[10%] opacity-10"
          style={{ animationDelay: '0s' }}
        >
          <Printer className="h-16 w-16 text-white" />
        </div>
        <div
          className="animate-float absolute top-[60%] right-[15%] opacity-10"
          style={{ animationDelay: '2s' }}
        >
          <FileText className="h-12 w-12 text-white" />
        </div>
        <div
          className="animate-float absolute bottom-[30%] left-[20%] opacity-10"
          style={{ animationDelay: '4s' }}
        >
          <Palette className="h-14 w-14 text-white" />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8">
        {/* Trust Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-6 py-2 backdrop-blur-sm">
          <Award className="h-4 w-4 text-blue-300" />
          <span className="text-sm font-medium text-blue-200">
            Dipercaya 500+ Mahasiswa di Purwokerto
          </span>
        </div>

        {/* Headline - Professional */}
        <h1 className="mb-6 text-4xl leading-tight font-black text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Solusi Cetak
          <br />
          <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Profesional
          </span>
          <br />
          <span className="text-2xl font-bold text-blue-200 sm:text-3xl md:text-4xl">
            di Purwokerto
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-blue-100/80 md:text-xl">
          Dari fotocopy hingga cetak premium, kami hadir untuk memenuhi
          kebutuhan percetakan Anda dengan{' '}
          <strong className="text-white">kualitas terbaik</strong> dan
          <strong className="text-white"> harga mahasiswa</strong>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={getWhatsAppLink(
              'Halo, saya ingin konsultasi tentang layanan cetak'
            )}
            target="_blank"
          >
            <Button
              size="lg"
              className="h-14 min-w-[220px] rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-700"
            >
              <Send className="mr-2 h-5 w-5" />
              Mulai Cetak
            </Button>
          </Link>

          <Link href="#calculator">
            <Button
              size="lg"
              className="h-14 min-w-[200px] rounded-xl border-2 border-white/20 bg-white/10 px-6 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Hitung Harga
            </Button>
          </Link>
        </div>

        {/* Stats Counter */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 text-4xl font-black md:text-5xl">
              <span
                ref={customersRef}
                className="bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent"
              >
                0
              </span>
              <span className="text-blue-300">+</span>
            </div>
            <p className="text-sm font-medium text-blue-200">Pelanggan Puas</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-black md:text-5xl">
              <span
                ref={projectsRef}
                className="bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent"
              >
                0
              </span>
              <span className="text-blue-300">+</span>
            </div>
            <p className="text-sm font-medium text-blue-200">Dokumen Dicetak</p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-black md:text-5xl">
              <span
                ref={yearsRef}
                className="bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent"
              >
                0
              </span>
              <span className="text-blue-300">+</span>
            </div>
            <p className="text-sm font-medium text-blue-200">
              Tahun Pengalaman
            </p>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-black md:text-5xl">
              <span className="bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
                24
              </span>
            </div>
            <p className="text-sm font-medium text-blue-200">Jam Respons WA</p>
          </div>
        </div>

        {/* Contact Card */}
        <div className="mt-12">
          <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="mb-2 text-sm text-blue-200">
              <Clock className="mr-2 inline h-4 w-4" />
              Buka setiap hari:
            </p>
            <p className="text-xl font-bold text-white">06:30 - 21:00 WIB</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-blue-200">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Mulai Rp 300/lembar
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Garansi Cetak Ulang
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
