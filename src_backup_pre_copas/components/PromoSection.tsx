import { useState, useEffect } from 'react';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { client } from '../api/client';

interface Promo {
  id: number;
  title: string;
  description: string;
  badge: string;
  validUntil: number;
  active: number;
}

export function PromoSection() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const res = await client.api.fetch('/api/promos');
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        const now = Date.now();
        const activePromos = data.data.filter(
          (p: Promo) => p.active === 1 && p.validUntil >= now
        );
        setPromos(activePromos);
      }
    } catch (error) {
      console.error('Failed to fetch promos', error);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/6285659055374?text=${encodeURIComponent(message)}`;
  };

  if (loading) return null;
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
              className="flex flex-col rounded-xl bg-white p-5 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
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
              <p className="mb-4 flex-grow text-sm text-gray-600">
                {promo.description}
              </p>
              <a
                href={getWhatsAppLink(
                  `Halo, saya mau tanya promo: ${promo.title}`
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-auto"
              >
                <button
                  className="w-full flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Klaim Promo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
