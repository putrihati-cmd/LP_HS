'use client';

import Link from 'next/link';
import {
  FileText,
  Palette,
  BookOpen,
  Shield,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

const services = [
  {
    icon: FileText,
    title: 'Fotocopy & Print',
    description:
      'Fotocopy dan print B/W berkualitas tinggi untuk dokumen, tugas kuliah, dan kebutuhan sehari-hari. Kertas premium 70-80gsm.',
    price: 'Rp 150',
    unit: '/lembar',
    color: 'blue',
    features: ['A4, F4, A3', 'Cepat & Rapi', 'Bulk Discount'],
  },
  {
    icon: Palette,
    title: 'Print Warna',
    description:
      'Cetak full color untuk poster, foto, presentasi, dan dokumen berwarna dengan kualitas premium.',
    price: 'Rp 2.000',
    unit: '/lembar',
    color: 'orange',
    features: ['A3-A5 Sizes', 'High Resolution', 'Photo Quality'],
  },
  {
    icon: BookOpen,
    title: 'Jilid Buku',
    description:
      'Jilid soft cover, hard cover, dan spiral untuk skripsi, tesis, laporan, dan buku dengan hasil profesional.',
    price: 'Rp 5.000',
    unit: '/buku',
    color: 'green',
    features: ['Soft Cover', 'Hard Cover', 'Spiral Binding'],
  },
  {
    icon: Shield,
    title: 'Laminating',
    description:
      'Laminating dokumen penting, sertifikat, ijazah, dan kartu identitas untuk perlindungan maksimal.',
    price: 'Rp 3.000',
    unit: '/lembar',
    color: 'purple',
    features: ['Glossy/Doff', 'A4-A3 Size', 'Tahan Lama'],
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    hover: 'group-hover:bg-blue-600',
    icon: 'text-blue-600 group-hover:text-white',
    badge: 'bg-blue-100 text-blue-700',
    border: 'group-hover:border-blue-500',
  },
  orange: {
    bg: 'bg-orange-50',
    hover: 'group-hover:bg-orange-500',
    icon: 'text-orange-600 group-hover:text-white',
    badge: 'bg-orange-100 text-orange-700',
    border: 'group-hover:border-orange-500',
  },
  green: {
    bg: 'bg-green-50',
    hover: 'group-hover:bg-green-600',
    icon: 'text-green-600 group-hover:text-white',
    badge: 'bg-green-100 text-green-700',
    border: 'group-hover:border-green-500',
  },
  purple: {
    bg: 'bg-purple-50',
    hover: 'group-hover:bg-purple-600',
    icon: 'text-purple-600 group-hover:text-white',
    badge: 'bg-purple-100 text-purple-700',
    border: 'group-hover:border-purple-500',
  },
};

export function ServicesSection() {
  return (
    <section id="services" className="bg-gray-50 py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-bold tracking-wider text-blue-600 uppercase">
            Layanan Kami
          </span>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
            Semua Kebutuhan Cetak Anda
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Dari fotocopy sederhana sampai jilid skripsi, kami siap melayani
            dengan cepat, berkualitas, dan harga mahasiswa.
          </p>
        </div>

        {/* Services Grid - 4 Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(service => {
            const colors =
              colorClasses[service.color as keyof typeof colorClasses];
            return (
              <Card
                key={service.title}
                className={`group relative overflow-hidden border-2 border-transparent bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${colors.border}`}
              >
                <CardContent className="flex h-full flex-col p-6">
                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${colors.bg} ${colors.hover} transition-all duration-300`}
                  >
                    <service.icon
                      className={`h-8 w-8 ${colors.icon} transition-colors duration-300`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className={`rounded-full px-2 py-1 text-xs font-medium ${colors.badge}`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="mb-4 border-t border-gray-100 pt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        {service.price}
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.unit}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-500">5.0</span>
                    </div>
                  </div>

                  {/* Order Button */}
                  <Link
                    href={getWhatsAppLink(
                      `Halo, saya mau order ${service.title}`
                    )}
                    target="_blank"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full transition-all group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                    >
                      Order Sekarang
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
