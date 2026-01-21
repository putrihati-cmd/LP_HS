'use client';

import { useState, useMemo } from 'react';
import { Calculator, MessageCircle } from 'lucide-react';
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
    <section id="calculator" className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            Kalkulator Harga
          </span>
          <h2 className="mt-2 mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Hitung Biaya Cetak Anda
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Masukkan detail pesanan untuk mendapatkan estimasi harga secara
            instan.
          </p>
        </div>

        <Card className="mx-auto max-w-2xl border-2 border-blue-100 shadow-lg">
          <CardContent className="p-8">
            <div className="grid gap-6">
              {/* Service Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Jenis Layanan
                </label>
                <select
                  value={service}
                  onChange={e => setService(e.target.value as ServiceKey)}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(SERVICES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name} - {formatPrice(value.price)}/{value.unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pages & Copies */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Jumlah Halaman"
                  min={1}
                  value={pages}
                  onChange={e =>
                    setPages(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
                <Input
                  type="number"
                  label="Jumlah Copy"
                  min={1}
                  value={copies}
                  onChange={e =>
                    setCopies(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
              </div>

              {/* Paper Size */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Ukuran Kertas
                </label>
                <div className="flex flex-wrap gap-2">
                  {PAPER_SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setPaperSize(size)}
                      className={`rounded-lg px-4 py-2 font-medium transition-all ${
                        paperSize === size
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className="rounded-xl bg-gradient-to-r from-blue-50 to-orange-50 p-6 text-center">
                <p className="mb-1 text-sm text-gray-600">Estimasi Total</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatPrice(totalPrice)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {pages} halaman × {copies} copy × {SERVICES[service].name}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleWhatsAppOrder}
                >
                  <MessageCircle className="h-5 w-5" />
                  Order via WhatsApp
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Calculator className="h-5 w-5" />
                  Tambah ke Keranjang
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
