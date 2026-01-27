import React from 'react';
import { Check } from 'lucide-react';

export default function PricingPackages() {
  const packages = [
    {
      name: 'Paket Reguler',
      price: 'Hemat',
      desc: 'Pilihan ekonomis untuk kebutuhan standard.',
      features: ['Print Laser HVS 70-80gr', 'Jilid Hardcover Rapi', 'Pengerjaan 2-3 Hari', 'Free Plastik Cover'],
      highlight: false
    },
    {
      name: 'Paket Express',
      price: 'Prioritas',
      desc: 'Solusi cepat untuk deadline mepet.',
      features: ['Print Prioritas', 'Jilid Hardcover Kilat', 'Pengerjaan < 24 Jam', 'Free Konsultasi Format'],
      highlight: true
    },
    {
      name: 'Paket Lengkap',
      price: 'All in One',
      desc: 'Terima beres tanpa ribet.',
      features: ['Print + Jilid Eksklusif', 'Burning CD / Softfile', 'Scan Dokumen', 'Bonus ATK Wisuda'],
      highlight: false
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-12 md:w-20 bg-gray-300"></div>
        <h2 className="text-xl md:text-2xl font-bold text-primary-500 uppercase tracking-wide text-center">
          PAKET SKRIPSI & TESIS
        </h2>
        <div className="h-px w-12 md:w-20 bg-gray-300"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`relative p-6 rounded-xl border ${pkg.highlight ? 'border-secondary-500 shadow-xl bg-white scale-105 z-10' : 'border-gray-200 bg-gray-50'}`}
          >
            {pkg.highlight && (
              <div className="absolute top-0 right-0 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                POPULAR
              </div>
            )}
            <h3 className="text-lg font-bold text-gray-800 mb-2">{pkg.name}</h3>
            <div className="text-primary-600 font-bold text-xl mb-2">{pkg.price}</div>
            <p className="text-sm text-gray-500 mb-6 border-b border-gray-200 pb-4">{pkg.desc}</p>

            <ul className="space-y-3">
              {pkg.features.map((feat, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-secondary-500 mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full mt-6 py-2 rounded-lg font-bold text-sm transition-colors ${pkg.highlight ? 'bg-primary-500 text-white hover:bg-primary-600' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
              Pilih Paket
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
