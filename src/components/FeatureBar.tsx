import React from 'react';
import { Star, Truck, ThumbsUp, Headset } from 'lucide-react';

export default function FeatureBar() {
  const features = [
    {
      icon: <Star className="w-8 h-8 text-primary-500" />,
      title: 'Kualitas Premium',
      desc: 'Hasil cetak terbaik'
    },
    {
      icon: <Truck className="w-8 h-8 text-primary-500" />,
      title: 'Pengiriman Cepat',
      desc: 'Same day delivery'
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-primary-500" />,
      title: 'Layanan Terbaik',
      desc: 'Kepuasan pelanggan'
    },
    {
      icon: <Headset className="w-8 h-8 text-primary-500" />,
      title: 'Support 24/7',
      desc: 'Siap membantu'
    },
  ];

  return (
    <section className="bg-white border-b border-gray-100 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-primary-50 rounded-full text-primary-600">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
