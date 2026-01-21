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
      'Fotocopy dan print B/W untuk dokumen, tugas, dan keperluan sehari-hari.',
    price: 'Rp 150',
    rating: 5,
    href: '/layanan#fotocopy',
  },
  {
    icon: Palette,
    title: 'Print Color',
    description:
      'Cetak full color untuk poster, foto, presentasi, dan dokumen berwarna.',
    price: 'Rp 2.000',
    rating: 5,
    href: '/layanan#print-color',
  },
  {
    icon: BookOpen,
    title: 'Jilid Buku',
    description:
      'Jilid soft cover dan hard cover untuk skripsi, tesis, laporan, dan buku.',
    price: 'Rp 5.000',
    rating: 5,
    href: '/layanan#jilid',
  },
  {
    icon: Shield,
    title: 'Laminating',
    description:
      'Laminating dokumen penting, sertifikat, ijazah, dan kartu identitas.',
    price: 'Rp 5.000',
    rating: 5,
    href: '/layanan#laminating',
  },
];

export function ServicesSection() {
  return (
    <section className="bg-gray-50 py-20">
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(service => (
            <Card
              key={service.title}
              className="group transition-all hover:shadow-lg"
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-600">
                  <service.icon className="h-7 w-7 text-blue-600 transition-colors group-hover:text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  {service.description}
                </p>

                {/* Price & Rating */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-orange-500">
                      {service.price}
                    </span>
                    <span className="text-sm text-gray-400">/lembar</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(service.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link href={service.href}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  >
                    Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <Link href="/layanan">
            <Button variant="primary" size="lg">
              Lihat Semua Layanan
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
