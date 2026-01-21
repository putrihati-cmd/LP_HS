'use client';

import { useState, useEffect } from 'react';
import { Zap, BadgeDollarSign, Trophy } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Same Day Service',
    description:
      'Pesanan ready dalam 30 menit - 2 jam. Express service untuk kebutuhan mendesak.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    stat: 30,
    statSuffix: ' Menit',
    statLabel: 'Rata-rata Waktu Selesai',
  },
  {
    icon: BadgeDollarSign,
    title: 'Harga Terjangkau',
    description:
      'Harga bersaing mulai Rp 150/lembar. Diskon khusus untuk mahasiswa dan bulk order.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
    stat: 150,
    statPrefix: 'Rp ',
    statLabel: 'Mulai Dari',
  },
  {
    icon: Trophy,
    title: 'Kualitas Terjamin',
    description:
      'Mesin fotocopy dan printer terbaru. Hasil cetak tajam dan warna akurat. Garansi kepuasan.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
    stat: 100,
    statSuffix: '%',
    statLabel: 'Kepuasan Pelanggan',
  },
];

function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="text-4xl font-bold text-gray-900 sm:text-5xl">
      {prefix}
      {count.toLocaleString('id-ID')}
      {suffix}
    </span>
  );
}

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-gray-50 py-20 lg:py-24"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-bold tracking-wider text-blue-600 uppercase">
            Mengapa Pilih Kami
          </span>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
            Keunggulan HS Copy Center
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Lebih dari 5 tahun melayani mahasiswa dan masyarakat Purwokerto
            dengan kualitas terbaik.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(feature => (
            <div
              key={feature.title}
              className="group rounded-3xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon */}
              <div
                className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${feature.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className={`h-10 w-10 ${feature.iconColor}`} />
              </div>

              {/* Animated Stat */}
              <div className="mb-4">
                <AnimatedCounter
                  target={feature.stat}
                  prefix={feature.statPrefix}
                  suffix={feature.statSuffix}
                />
                <p className="mt-1 text-sm tracking-wide text-gray-500 uppercase">
                  {feature.statLabel}
                </p>
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Total Orders Counter */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center text-white">
          <p className="mb-2 text-sm tracking-wider text-blue-200 uppercase">
            Total Pesanan Selesai
          </p>
          <div className="text-5xl font-bold sm:text-6xl">50.000+</div>
          <p className="mt-2 text-blue-200">dan terus bertambah setiap hari</p>
        </div>
      </div>
    </section>
  );
}
