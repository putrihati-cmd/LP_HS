import Link from 'next/link';
import {
  FileText,
  Palette,
  BookOpen,
  Shield,
  Star,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';

const services = [
  {
    icon: FileText,
    title: 'Fotocopy & Print',
    description:
      'High quality B/W & Color printing. Support A4, F4, A3. Kertas 70-80gsm premium.',
    price: 'Start Rp 150',
    href: '#calculator',
  },
  {
    icon: BookOpen,
    title: 'Book Binding',
    description:
      'Soft cover, Hard cover, Spiral, dan Skripsi binding. Pengerjaan cepat & rapi.',
    price: 'Start Rp 5k',
    href: '#calculator',
  },
  {
    icon: Shield,
    title: 'Laminating & Scan',
    description:
      'Lindungi dokumen penting atau digitalkan file fisik Anda dengan resolusi tinggi.',
    price: 'Start Rp 3k',
    href: '#calculator',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            Layanan Kami
          </span>
          <h2 className="mt-2 mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Semua Kebutuhan Cetak Anda
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Dari fotocopy sederhana sampai jilid skripsi, kami siap melayani
            dengan cepat dan berkualitas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map(service => (
            <Card
              key={service.title}
              className="group relative overflow-hidden border-0 bg-white shadow-xl shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardContent className="flex h-full flex-col p-8">
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  <service.icon className="h-8 w-8" />
                </div>

                {/* Title & Description */}
                <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                  {service.title}
                </h3>
                <p className="mb-6 flex-grow leading-relaxed text-gray-600">
                  {service.description}
                </p>

                {/* Price & CTA */}
                <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-6">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">
                      Starts From
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {service.price}
                    </p>
                  </div>
                  <Link href={service.href}>
                    <div className="rounded-full bg-gray-50 p-2 text-gray-400 transition-all group-hover:bg-blue-100 group-hover:text-blue-600">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
