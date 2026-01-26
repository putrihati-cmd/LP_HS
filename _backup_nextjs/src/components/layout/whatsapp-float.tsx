'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export function WhatsAppFloat() {
  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {/* Main button */}
      <Link
        href={getWhatsAppLink(
          'Halo, saya ingin konsultasi tentang layanan cetak'
        )}
        target="_blank"
        className="group"
        aria-label="Chat via WhatsApp"
      >
        {/* Button */}
        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 text-white shadow-lg shadow-blue-500/30 transition-all group-hover:scale-110 group-hover:shadow-xl">
          <MessageCircle className="h-6 w-6" />
          <span className="hidden font-bold sm:block">Hubungi Kami</span>
        </div>
      </Link>
    </div>
  );
}
