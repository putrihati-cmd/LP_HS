'use client';

import { useState, useMemo } from 'react';
import { MessageCircle, Plus, Minus } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { formatPrice, getWhatsAppLink } from '@/lib/utils';

const SERVICES = {
  fotocopy: { name: 'Fotocopy B/W', price: 300, unit: 'lembar' },
  print_bw: { name: 'Print B/W', price: 500, unit: 'lembar' },
  print_warna: { name: 'Print Warna', price: 1000, unit: 'lembar' },
  print_full: { name: 'Print Full Warna', price: 2000, unit: 'lembar' },
  cetak_foto: { name: 'Cetak Foto', price: 2000, unit: 'lembar' },
};

type ServiceKey = keyof typeof SERVICES;

export function PriceCalculator() {
  const [service, setService] = useState<ServiceKey>('fotocopy');
  const [pages, setPages] = useState(10);
  const [copies, setCopies] = useState(1);

  const totalPrice = useMemo(() => {
    return SERVICES[service].price * pages * copies;
  }, [service, pages, copies]);

  const handleWhatsAppOrder = () => {
    const message = `Halo HS Copy Center, saya ingin order:

📋 Layanan: ${SERVICES[service].name}
📄 Jumlah: ${pages} ${SERVICES[service].unit}
📚 Copy: ${copies}x
💰 Total: ${formatPrice(totalPrice)}

Mohon konfirmasi. Terima kasih!`;

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
      <div className="absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 opacity-60 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-50 opacity-60 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-bold tracking-wider text-gray-700 uppercase">
            Kalkulator Harga
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Hitung Biaya Cetak
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Estimasi harga instan. Harga final bisa berbeda tergantung kondisi
            file.
          </p>
        </div>

        <Card className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div className="grid gap-6">
              {/* Service Selection */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Jenis Layanan
                </label>
                <select
                  value={service}
                  onChange={e => setService(e.target.value as ServiceKey)}
                  className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-base font-medium transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
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
                {/* Pages */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Jumlah Lembar
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={decrementPages}
                      aria-label="Kurangi halaman"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={pages}
                      onChange={e =>
                        setPages(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      aria-label="Jumlah halaman"
                      className="h-12 flex-1 rounded-lg border border-gray-300 bg-white px-2 text-center text-lg font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      onClick={incrementPages}
                      aria-label="Tambah halaman"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 text-white transition-all hover:bg-gray-900"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Copies */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Jumlah Copy
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={decrementCopies}
                      aria-label="Kurangi copy"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={copies}
                      onChange={e =>
                        setCopies(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      aria-label="Jumlah copy"
                      className="h-12 flex-1 rounded-lg border border-gray-300 bg-white px-2 text-center text-lg font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      onClick={incrementCopies}
                      aria-label="Tambah copy"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 text-white transition-all hover:bg-gray-900"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Price Display */}
              <div className="rounded-xl bg-gray-900 p-6 text-white">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <div className="text-center sm:text-left">
                    <p className="mb-1 text-sm text-gray-400">Total Estimasi</p>
                    <p className="text-3xl font-bold">
                      {formatPrice(totalPrice)}
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      {pages} lembar × {copies} copy
                    </p>
                  </div>
                  <Button
                    size="lg"
                    onClick={handleWhatsAppOrder}
                    className="h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-700"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Order via WhatsApp
                  </Button>
                </div>
              </div>

              {/* Note */}
              <p className="text-center text-sm text-gray-500">
                💡 Daftar member untuk dapat diskon. Tanya admin untuk info
                lebih lanjut.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
