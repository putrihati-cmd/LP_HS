'use client';

import Link from 'next/link';
import { MessageCircle, Zap } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export function WhatsAppFloat() {
  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:right-6 sm:bottom-6">
      {/* Urgency tooltip - visible on desktop */}
      <div className="hidden animate-bounce rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white shadow-lg sm:block">
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3 text-yellow-400" />5 menit jadi!
        </span>
        {/* Arrow */}
        <div className="absolute right-6 -bottom-1 h-2 w-2 rotate-45 bg-gray-900" />
      </div>

      {/* Main button */}
      <Link
        href={getWhatsAppLink('Halo, saya mau kirim file untuk dicetak')}
        target="_blank"
        className="group relative"
        aria-label="Chat via WhatsApp"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-50" />

        {/* Button */}
        <div className="relative flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-white shadow-lg shadow-green-500/30 transition-all group-hover:scale-110 group-hover:bg-green-600 group-hover:shadow-xl">
          <MessageCircle className="h-6 w-6" />
          <span className="hidden font-bold sm:block">Kirim File</span>
        </div>
      </Link>
    </div>
  );
}
