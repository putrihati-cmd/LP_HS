import React from 'react';
import { Award, Clock, Coins, MapPin } from 'lucide-react';

export default function FeatureBar() {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: 'Berpengalaman',
      desc: 'Spesialis Skripsi & Dokumen'
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: 'Proses Cepat',
      desc: 'Bisa Ditunggu'
    },
    {
      icon: <Coins className="w-8 h-8 text-white" />,
      title: 'Harga Mahasiswa',
      desc: 'Terjangkau & Berkualitas'
    },
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: 'Lokasi Strategis',
      desc: 'Mudah Dijangkau'
    },
  ];

  return (
    <section className="bg-white border-b border-gray-100 shadow-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="p-2 bg-primary-500 rounded-full text-white shadow-md">
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
