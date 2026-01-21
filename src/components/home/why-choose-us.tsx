'use client';

import { Zap, ThumbsUp, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Cepat',
    description:
      'Proses cepat, tidak bertele-tele. File masuk, langsung dikerjakan.',
  },
  {
    icon: ThumbsUp,
    title: 'Rapi',
    description: 'Hasil cetak konsisten, tidak asal jadi. Mesin terawat rutin.',
  },
  {
    icon: CheckCircle,
    title: 'Berkualitas',
    description: 'Kertas bagus, tinta oke. Bukan cetak murahan.',
  },
];

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="border-y border-gray-100 bg-white py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(feature => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <feature.icon className="h-7 w-7 text-gray-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
