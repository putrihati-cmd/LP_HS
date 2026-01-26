'use client';

import Link from 'next/link';
import { AlertTriangle, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

export function PanicButton() {
  return (
    <section className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-8 lg:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          {/* Left - Message */}
          <div className="flex items-center gap-4">
            <div className="hidden h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm md:flex">
              <AlertTriangle className="h-8 w-8 animate-pulse text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white md:text-2xl">
                DEADLINE 2 JAM LAGI? 😱
              </h3>
              <p className="text-sm text-white/90 md:text-base">
                Tenang! Kirim file sekarang, <strong>30 menit jadi!</strong>
              </p>
            </div>
          </div>

          {/* Right - CTA */}
          <Link
            href={getWhatsAppLink(
              '🚨 URGENT: Deadline saya 2 jam lagi! Butuh cetak kilat sekarang!'
            )}
            target="_blank"
          >
            <Button
              size="lg"
              className="h-14 min-w-[240px] rounded-full bg-white px-6 text-lg font-bold text-red-600 shadow-lg transition-all hover:scale-105 hover:bg-yellow-100"
            >
              <Zap className="mr-2 h-5 w-5" />
              TOLONG SAYA! 🆘
            </Button>
          </Link>
        </div>

        {/* Speed Promise */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Cetak Kilat: 30 menit</span>
          </div>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center gap-2">
            <span>📱 Respons WA: 2 menit</span>
          </div>
          <span className="hidden md:inline">•</span>
          <div className="flex items-center gap-2">
            <span>✅ Garansi Jadi Tepat Waktu</span>
          </div>
        </div>
      </div>
    </section>
  );
}
