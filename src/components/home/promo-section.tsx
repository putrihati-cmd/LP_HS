'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

interface Promo {
  id: string;
  title: string;
  description: string;
  badge: string;
  validUntil: string;
  active: boolean;
}

export function PromoSection() {
  const [promos, setPromos] = useState<Promo[]>([]);

  useEffect(() => {
    fetch('/data/promo.json')
      .then(res => res.json())
      .then(data => {
        const now = new Date();
        const activePromos = data.promos.filter(
          (p: Promo) => p.active && new Date(p.validUntil) >= now
        );
        setPromos(activePromos);
      })
      .catch(() => setPromos([]));
  }, []);

  if (promos.length === 0) return null;

  return (
    <section
      id="promo"
      className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-12 lg:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-sm font-bold text-white">PROMO SPESIAL</span>
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Jangan Lewatkan!
          </h2>
        </div>

        {/* Promo Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {promos.map(promo => (
            <div
              key={promo.id}
              className="rounded-xl bg-white p-5 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  {promo.badge}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  s/d{' '}
                  {new Date(promo.validUntil).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {promo.title}
              </h3>
              <p className="mb-4 text-sm text-gray-600">{promo.description}</p>
              <Link
                href={getWhatsAppLink(
                  `Halo, saya mau tanya promo: ${promo.title}`
                )}
                target="_blank"
              >
                <Button
                  size="sm"
                  className="w-full rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Klaim Promo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
