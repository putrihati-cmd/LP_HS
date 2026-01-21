'use client';

import { useState, useMemo } from 'react';
import { MessageCircle, Plus, Minus, Percent } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { formatPrice, getWhatsAppLink } from '@/lib/utils';

const SERVICES = {
  fotocopy: { name: 'Fotocopy B/W', price: 150, unit: 'lembar' },
  print_bw: { name: 'Print B/W', price: 200, unit: 'lembar' },
  print_color: { name: 'Print Warna', price: 2000, unit: 'lembar' },
  jilid_soft: { name: 'Jilid Soft Cover', price: 5000, unit: 'buku' },
  jilid_hard: { name: 'Jilid Hard Cover', price: 25000, unit: 'buku' },
  jilid_spiral: { name: 'Jilid Spiral', price: 8000, unit: 'buku' },
  laminating: { name: 'Laminating', price: 3000, unit: 'lembar' },
};

const PAPER_SIZES = ['A4', 'F4', 'A3', 'A5'];

type ServiceKey = keyof typeof SERVICES;

export function PriceCalculator() {
  const [service, setService] = useState<ServiceKey>('fotocopy');
  const [pages, setPages] = useState(10);
  const [paperSize, setPaperSize] = useState('A4');
  const [copies, setCopies] = useState(1);
  const [isColor, setIsColor] = useState(false);

  // Calculate price with multipliers
  const { totalPrice, discount, discountedPrice } = useMemo(() => {
    let basePrice = SERVICES[service].price;

    // Color multiplier for print
    if (isColor && service === 'print_bw') {
      basePrice = SERVICES['print_color'].price;
    }

    // Size multiplier
    const sizeMultiplier =
      paperSize === 'A3' ? 2 : paperSize === 'A5' ? 0.7 : 1;

    const total = basePrice * pages * copies * sizeMultiplier;

    // Bulk discount
    let discountPercent = 0;
    if (pages >= 500) discountPercent = 15;
    else if (pages >= 200) discountPercent = 10;
    else if (pages >= 100) discountPercent = 5;

    const discounted = total - (total * discountPercent) / 100;

    return {
      totalPrice: total,
      discount: discountPercent,
      discountedPrice: discounted,
    };
  }, [service, pages, paperSize, copies, isColor]);

  const handleWhatsAppOrder = () => {
    const serviceName =
      isColor && service === 'print_bw'
        ? SERVICES['print_color'].name
        : SERVICES[service].name;
    const message = `Halo HS Copy Center, saya ingin order:

📋 Layanan: ${serviceName}
📄 Jumlah: ${pages} ${SERVICES[service].unit}
📐 Ukuran: ${paperSize}
📚 Jumlah Copy: ${copies}
${discount > 0 ? `🎁 Diskon: ${discount}%` : ''}
💰 Total: ${formatPrice(discountedPrice)}

Mohon konfirmasi ketersediaan. Terima kasih!`;

    window.open(getWhatsAppLink(message), '_blank');
  };

  const incrementPages = () => setPages(prev => prev + 10);
  const decrementPages = () => setPages(prev => Math.max(1, prev - 10));
  const incrementCopies = () => setCopies(prev => prev + 1);
  const decrementCopies = () => setCopies(prev => Math.max(1, prev - 1));

  return (
    <section
      id="calculator"
      className="relative overflow-hidden bg-white py-20 lg:py-24"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-50 opacity-60 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-50 opacity-60 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-bold tracking-wider text-blue-600 uppercase">
            Kalkulator Harga
          </span>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
            Hitung Biaya Cetak Anda
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Masukkan detail pesanan untuk mendapatkan estimasi harga instan.
            Transparan tanpa biaya tersembunyi.
          </p>
        </div>

        <Card className="mx-auto max-w-3xl overflow-hidden rounded-3xl border-0 bg-white shadow-2xl">
          <CardContent className="p-8 sm:p-12">
            <div className="grid gap-8">
              {/* Service Selection */}
              <div>
                <label className="mb-3 block text-sm font-bold tracking-wide text-gray-700 uppercase">
                  Jenis Layanan
                </label>
                <select
                  value={service}
                  onChange={e => setService(e.target.value as ServiceKey)}
                  className="h-14 w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-6 text-lg font-medium transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                >
                  {Object.entries(SERVICES).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.name} - {formatPrice(value.price)}/{value.unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pages & Copies with +/- Buttons */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Pages */}
                <div>
                  <label className="mb-3 block text-sm font-bold tracking-wide text-gray-700 uppercase">
                    Jumlah Halaman
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrementPages}
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={pages}
                      onChange={e =>
                        setPages(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="h-14 flex-1 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-center text-xl font-bold focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                    <button
                      onClick={incrementPages}
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 active:scale-95"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Copies */}
                <div>
                  <label className="mb-3 block text-sm font-bold tracking-wide text-gray-700 uppercase">
                    Jumlah Copy
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrementCopies}
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={copies}
                      onChange={e =>
                        setCopies(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="h-14 flex-1 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-center text-xl font-bold focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />
                    <button
                      onClick={incrementCopies}
                      className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 active:scale-95"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Paper Size Selector */}
              <div>
                <label className="mb-3 block text-sm font-bold tracking-wide text-gray-700 uppercase">
                  Ukuran Kertas
                </label>
                <div className="flex flex-wrap gap-3">
                  {PAPER_SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => setPaperSize(size)}
                      className={`rounded-xl px-6 py-3 font-bold transition-all ${
                        paperSize === size
                          ? 'bg-blue-600 text-white shadow-lg ring-2 shadow-blue-500/30 ring-blue-600 ring-offset-2'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                      {size === 'A3' && (
                        <span className="ml-1 text-xs opacity-70">+100%</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Toggle */}
              {(service === 'fotocopy' || service === 'print_bw') && (
                <div>
                  <label className="mb-3 block text-sm font-bold tracking-wide text-gray-700 uppercase">
                    Opsi Warna
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsColor(false)}
                      className={`flex-1 rounded-xl py-4 font-bold transition-all ${
                        !isColor
                          ? 'bg-gray-800 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Hitam Putih
                    </button>
                    <button
                      onClick={() => setIsColor(true)}
                      className={`flex-1 rounded-xl py-4 font-bold transition-all ${
                        isColor
                          ? 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Full Color
                    </button>
                  </div>
                </div>
              )}

              {/* Bulk Discount Indicator */}
              {discount > 0 && (
                <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white">
                    <Percent className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800">
                      Selamat! Anda dapat diskon {discount}%
                    </p>
                    <p className="text-sm text-green-600">
                      Berlaku untuk pesanan {pages}+ halaman
                    </p>
                  </div>
                </div>
              )}

              {/* Total Price Display */}
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <div className="text-center sm:text-left">
                    <p className="mb-1 text-sm tracking-wide text-blue-200 uppercase">
                      Total Estimasi
                    </p>
                    {discount > 0 && (
                      <p className="text-lg text-blue-300 line-through">
                        {formatPrice(totalPrice)}
                      </p>
                    )}
                    <p className="text-4xl font-bold">
                      {formatPrice(discountedPrice)}
                    </p>
                    <p className="mt-2 text-sm text-blue-200">
                      {pages} halaman × {copies} copy × {SERVICES[service].name}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleWhatsAppOrder}
                    className="h-14 rounded-full bg-white px-8 text-lg font-bold text-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-gray-100"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Order via WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
