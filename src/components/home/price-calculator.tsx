'use client';

import { useState, useMemo } from 'react';
import { Calculator, MessageCircle, ArrowRight } from 'lucide-react';
import { Button, Card, CardContent, Input } from '@/components/ui';
import {
  SERVICES,
  PAPER_SIZES,
  formatPrice,
  getWhatsAppLink,
} from '@/lib/utils';

type ServiceKey = keyof typeof SERVICES;

export function PriceCalculator() {
  const [service, setService] = useState<ServiceKey>('fotocopy');
  const [pages, setPages] = useState(1);
  const [paperSize, setPaperSize] = useState('A4');
  const [copies, setCopies] = useState(1);

  const totalPrice = useMemo(() => {
    const basePrice = SERVICES[service].price;
    const sizeMultiplier = paperSize === 'A3' ? 2 : 1;
    return basePrice * pages * copies * sizeMultiplier;
  }, [service, pages, paperSize, copies]);

  const handleWhatsAppOrder = () => {
    const message = `Halo HS Copy Center, saya ingin order:

📋 Layanan: ${SERVICES[service].name}
📄 Jumlah Halaman: ${pages}
📐 Ukuran: ${paperSize}
📚 Jumlah Copy: ${copies}
💰 Estimasi Harga: ${formatPrice(totalPrice)}

Mohon konfirmasi ketersediaan. Terima kasih!`;

    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-white py-32"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 opacity-50 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-50 opacity-50 blur-3xl" />

      <div className="relative z-10 container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl text-center">
          <span className="mb-4 block text-sm font-bold tracking-wider text-blue-600 uppercase">
            Pricing
          </span>
          <h2 className="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Calculate Your Cost
          </h2>
          <p className="text-xl font-light text-gray-500">
            Transparan. Tidak ada biaya tersembunyi.
          </p>
        </div>

        <Card className="round-3xl mx-auto w-full max-w-2xl overflow-hidden border-0 bg-white shadow-2xl shadow-blue-900/5">
          <CardContent className="p-8 sm:p-12">
            <div className="grid gap-8">
              {/* Service Selection */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Jenis Layanan
                </label>
                <select
                  value={service}
                  onChange={e => setService(e.target.value as ServiceKey)}
                  className="h-14 w-full rounded-xl border border-gray-200 bg-gray-50 px-6 text-lg transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                >
                  {Object.entries(SERVICES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name} - {formatPrice(value.price)}/{value.unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pages & Copies */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Halaman
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={pages}
                    className="h-14 rounded-xl border-gray-200 bg-gray-50 text-lg focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    onChange={e =>
                      setPages(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                </div>
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700">
                    Jumlah Copy
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={copies}
                    className="h-14 rounded-xl border-gray-200 bg-gray-50 text-lg focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    onChange={e =>
                      setCopies(Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                </div>
              </div>

              {/* Paper Size */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  Ukuran Kertas
                </label>
                <div className="flex flex-wrap gap-3">
                  {PAPER_SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setPaperSize(size)}
                      className={`rounded-xl px-6 py-3 font-semibold transition-all ${
                        paperSize === size
                          ? 'bg-blue-600 text-white shadow-lg ring-2 shadow-blue-500/30 ring-blue-600 ring-offset-2'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Price & CTA */}
              <div className="mt-4 flex flex-col items-center justify-between rounded-2xl bg-gray-900 p-8 text-white sm:flex-row">
                <div className="mb-6 text-center sm:mb-0 sm:text-left">
                  <p className="mb-1 text-sm text-gray-400">Total Estimasi</p>
                  <p className="text-4xl font-bold text-white">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={handleWhatsAppOrder}
                  className="h-14 rounded-full bg-white px-8 text-lg font-bold text-gray-900 hover:bg-gray-100"
                >
                  Pesan Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
