'use client';

import { Zap, Wallet, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Proses Cepat 5 Menit',
    description:
      'Kirim file jam 8 pagi, siap diambil sebelum kelas jam 9. Kami paham deadline tugas tidak bisa ditunda.',
    highlight: '5 Menit',
  },
  {
    icon: Wallet,
    title: 'Harga Pelajar-Friendly',
    description:
      'Fotocopy Rp 300/lembar, lebih murah dari kampus. Cetak skripsi 100 halaman cuma Rp 30.000.',
    highlight: 'Rp 300',
  },
  {
    icon: Shield,
    title: 'Garansi Cetak Ulang',
    description:
      'Hasil buram atau salah cetak? Kami cetak ulang tanpa biaya tambahan. Kepuasan Anda prioritas kami.',
    highlight: 'GRATIS',
  },
  {
    icon: Clock,
    title: 'Buka Pagi - Malam',
    description:
      'Operasional 06:30-21:00 setiap hari. Kebut semalam buat tugas? Kami siap bantu!',
    highlight: '06:30-21:00',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-gray-50 py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-700">
            Kenapa HS Copy Center?
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Bukan Tukang Fotocopy Biasa
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Partner cetak yang bisa diandalkan mahasiswa & pelajar Purwokerto.
          </p>
        </div>

        {/* Features Grid - 2x2 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map(feature => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-900 text-white transition-transform group-hover:scale-110">
                    <feature.icon className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                      {feature.highlight}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
