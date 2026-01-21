'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export function WhatsAppFloat() {
  return (
    <Link
      href={getWhatsAppLink('Halo, saya mau kirim file untuk dicetak')}
      target="_blank"
      className="group fixed right-6 bottom-6 z-50"
      aria-label="Chat via WhatsApp"
    >
      {/* Pulse ring animation */}
      <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75" />

      {/* Button */}
      <div className="relative flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition-all group-hover:scale-105 group-hover:bg-green-600 group-hover:shadow-xl">
        <MessageCircle className="h-6 w-6" />
        <span className="hidden font-medium sm:block">Chat WA</span>
      </div>
    </Link>
  );
}
