'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export function WhatsAppFloat() {
  return (
    <Link
      href={getWhatsAppLink('Halo HS Copy Center, saya ingin order.')}
      target="_blank"
      className="fixed right-6 bottom-6 z-50 rounded-full bg-green-500 p-4 text-white shadow-lg transition-all hover:scale-110 hover:bg-green-600"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
