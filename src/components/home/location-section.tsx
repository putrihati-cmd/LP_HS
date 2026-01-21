'use client';

import Link from 'next/link';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from '@/components/ui';

export function LocationSection() {
  const googleMapsUrl =
    'https://www.google.com/maps/place/HS+COPY+CENTER/@-7.4146012,109.2741218,17z';
  const googleMapsEmbed =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.5!2d109.2741218!3d-7.4146012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655f049b91c75d%3A0x5e8d9cd11f3df730!2sHS%20COPY%20CENTER!5e0!3m2!1sid!2sid!4v1705852858000!5m2!1sid!2sid';

  return (
    <section id="location" className="bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-700">
            Lokasi
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Temukan Kami
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Dekat kampus UMP & UNSOED. Mudah dijangkau!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Map Embed */}
          <div className="h-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 lg:h-[400px]">
            <iframe
              src={googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi HS Copy Center"
            />
          </div>

          {/* Location Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <MapPin className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Alamat</h3>
                  <p className="text-gray-600">
                    Jl. Riyanto No.RT 05, Dukuhwaluh
                    <br />
                    Kec. Kembaran, Kab. Banyumas
                    <br />
                    Jawa Tengah 53182
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    📍 Dekat kampus UMP (5 menit jalan kaki)
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <Clock className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Jam Operasional</h3>
                  <p className="text-gray-600">
                    Senin - Minggu: 06:30 - 21:00 WIB
                  </p>
                  <p className="mt-1 text-sm font-medium text-green-600">
                    ✓ Buka setiap hari termasuk hari libur
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100">
                  <Phone className="h-6 w-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Kontak</h3>
                  <a
                    href="tel:+6285659055374"
                    className="text-gray-600 hover:text-blue-600"
                  >
                    0856-5905-5374
                  </a>
                  <p className="mt-1 text-sm text-gray-500">
                    WhatsApp tersedia
                  </p>
                </div>
              </div>

              {/* CTA */}
              <Link href={googleMapsUrl} target="_blank" className="block">
                <Button
                  size="lg"
                  className="w-full rounded-xl bg-gray-900 py-4 font-bold text-white transition-all hover:bg-gray-800"
                >
                  <Navigation className="mr-2 h-5 w-5" />
                  Buka di Google Maps
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
