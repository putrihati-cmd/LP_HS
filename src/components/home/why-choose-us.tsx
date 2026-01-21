import { Clock, BadgeDollarSign, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Same Day Service',
    description:
      'Pesanan ready dalam 30 menit - 2 jam. Express service untuk kebutuhan mendesak.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: BadgeDollarSign,
    title: 'Harga Terjangkau',
    description:
      'Harga bersaing mulai Rp 150/lembar. Diskon khusus untuk mahasiswa dan bulk order.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: ShieldCheck,
    title: 'Kualitas Terjamin',
    description:
      'Mesin fotocopy dan printer terbaru. Hasil cetak tajam dan warna akurat.',
    color: 'bg-green-100 text-green-600',
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            Mengapa Pilih Kami
          </span>
          <h2 className="mt-2 mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Keunggulan HS Copy Center
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Lebih dari 5 tahun melayani mahasiswa dan masyarakat Purwokerto
            dengan kualitas terbaik.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(feature => (
            <div key={feature.title} className="group text-center">
              {/* Icon */}
              <div
                className={`mx-auto h-20 w-20 rounded-2xl ${feature.color} mb-6 flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <feature.icon className="h-10 w-10" />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
