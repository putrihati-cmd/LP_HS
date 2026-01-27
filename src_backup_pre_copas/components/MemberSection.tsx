import {
  Crown,
  Gift,
  Calendar,
  Star,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const levels = [
  { name: 'Bronze', emoji: '🥉', spend: 'Rp 0', discount: '-', bonus: '1x' },
  {
    name: 'Silver',
    emoji: '🥈',
    spend: 'Rp 500.000',
    discount: '2%',
    bonus: '1.2x',
  },
  {
    name: 'Gold',
    emoji: '🥇',
    spend: 'Rp 2.000.000',
    discount: '5%',
    bonus: '1.5x',
  },
  {
    name: 'Platinum',
    emoji: '💎',
    spend: 'Rp 5.000.000',
    discount: '10%',
    bonus: '2x',
  },
];

const benefits = [
  {
    icon: Star,
    title: 'Sistem Poin',
    description:
      'Setiap belanja Rp 10.000 = 1 Poin. Tukar 1 Poin = Rp 100. Berlaku 24 bulan!',
  },
  {
    icon: Gift,
    title: 'Hadiah Ulang Tahun',
    description:
      '3x lipat poin + voucher gratis hingga Rp 200.000 di bulan ultah!',
  },
  {
    icon: Calendar,
    title: 'Bonus Weekend',
    description: 'Setiap Sabtu & Minggu dapat 2x Poin untuk semua transaksi!',
  },
  {
    icon: TrendingUp,
    title: 'Hadiah Naik Level',
    description:
      'Setiap naik level dapat voucher belanja hingga Rp 100.000 + bonus poin!',
  },
];

export function MemberSection() {
  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/6285659055374?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="member"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 text-white lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/20 px-4 py-2">
            <Crown className="h-5 w-5 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-400">
              MEMBER EXCLUSIVE
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Daftar Member, Dapat Banyak Keuntungan!
          </h2>
          <p className="mx-auto max-w-xl text-gray-400">
            Gratis tanpa biaya. Cukup isi nama & nomor HP, langsung aktif!
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(benefit => (
            <div
              key={benefit.title}
              className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
                <benefit.icon className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="mb-2 font-bold text-white">{benefit.title}</h3>
              <p className="text-sm text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Level Table */}
        <div className="mb-12 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="border-b border-white/10 p-4">
            <h3 className="flex items-center gap-2 text-lg font-bold">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Level Member & Diskon
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-3 text-left font-semibold">Level</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Syarat Belanja
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Diskon
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Bonus Poin
                  </th>
                </tr>
              </thead>
              <tbody>
                {levels.map((level, idx) => (
                  <tr
                    key={level.name}
                    className={
                      idx < levels.length - 1 ? 'border-b border-white/5' : ''
                    }
                  >
                    <td className="px-4 py-3 font-medium">
                      <span className="mr-2">{level.emoji}</span>
                      {level.name}
                    </td>
                    <td className="px-4 py-3 text-gray-400">{level.spend}</td>
                    <td className="px-4 py-3 text-center">
                      {level.discount !== '-' ? (
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold text-green-400">
                          {level.discount}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-yellow-400">
                      {level.bonus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={getWhatsAppLink(
              'Halo, saya mau daftar member HS Copy Center'
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-block"
          >
            <button
              className="flex items-center h-14 rounded-full bg-yellow-500 px-8 text-lg font-bold text-gray-900 shadow-lg shadow-yellow-500/30 transition-all hover:scale-105 hover:bg-yellow-400"
            >
              <Crown className="mr-2 h-5 w-5" />
              Daftar Member Sekarang - GRATIS!
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Cukup isi nama & nomor HP via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
