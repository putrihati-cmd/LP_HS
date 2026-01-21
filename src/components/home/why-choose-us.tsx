import { Zap, Coins, Trophy } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Fast Service',
    description: 'Selesai dalam hitungan menit. Kami menghargai waktu Anda.',
    color: 'bg-blue-50 text-blue-600',
    iconColor: 'text-blue-600',
  },
  {
    icon: Coins,
    title: 'Best Price',
    description:
      'Harga mahasiswa mulai Rp 150. Hemat tanpa mengurangi kualitas.',
    color: 'bg-orange-50 text-orange-600',
    iconColor: 'text-orange-600',
  },
  {
    icon: Trophy,
    title: 'High Quality',
    description:
      'Mesin terbaru anti-garis & kertas premium paperOne/SinarDunia.',
    color: 'bg-indigo-50 text-indigo-600',
    iconColor: 'text-indigo-600',
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="border-t border-gray-100 bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(feature => (
            <div
              key={feature.title}
              className="group rounded-3xl p-8 text-center transition-all hover:bg-gray-50"
            >
              {/* Icon */}
              <div
                className={`mx-auto h-20 w-20 rounded-2xl ${feature.color} mb-6 flex items-center justify-center shadow-lg shadow-gray-100 transition-transform group-hover:scale-110`}
              >
                <feature.icon className={`h-10 w-10 ${feature.iconColor}`} />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="leading-relaxed font-light text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
