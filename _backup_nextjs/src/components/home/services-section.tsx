'use client';

import Link from 'next/link';
import { FileText, Printer, Palette, Image, ArrowRight } from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

const services = [
  {
    icon: FileText,
    title: 'Fotocopy B/W',
    description: 'Fotocopy dokumen hitam putih. Cepat, rapi, hasil konsisten.',
    price: 'Rp 300',
    color: 'gray',
  },
  {
    icon: Printer,
    title: 'Print B/W',
    description:
      'Cetak dokumen hitam putih dari file digital (PDF, Word, dll).',
    price: 'Rp 500',
    color: 'gray',
  },
  {
    icon: Palette,
    title: 'Print Warna',
    description: 'Cetak dokumen berwarna untuk presentasi, grafik, dll.',
    price: 'Rp 1.000',
    color: 'blue',
  },
  {
    icon: Image,
    title: 'Print Full Warna',
    description: 'Cetak full color untuk poster, brosur, atau foto dokumen.',
    price: 'Rp 2.000',
    color: 'blue',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-gray-50 py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-700">
            Layanan
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Fotocopy & Cetak Dokumen
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Kirim file via WhatsApp, tinggal ambil. Cepat, rapi, berkualitas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(service => (
            <Card
              key={service.title}
              className="group border border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="flex h-full flex-col p-6">
                {/* Icon */}
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${
                    service.color === 'blue'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <service.icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mb-4 flex-grow text-sm text-gray-600">
                  {service.description}
                </p>

                {/* Price */}
                <div className="mb-4 border-t border-gray-100 pt-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {service.price}
                  </span>
                  <span className="text-sm text-gray-500">/lembar</span>
                </div>

                {/* Order Button */}
                <Link
                  href={getWhatsAppLink(`Halo, saya mau ${service.title}`)}
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full transition-all group-hover:border-green-500 group-hover:bg-green-500 group-hover:text-white"
                  >
                    Pesan Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-10 text-center">
          <p className="text-gray-600">
            📸 <strong>Cetak Foto</strong> mulai dari Rp 2.000/lembar.
            <Link
              href={getWhatsAppLink('Halo, saya mau cetak foto')}
              target="_blank"
              className="ml-1 text-blue-600 hover:underline"
            >
              Hubungi kami
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
