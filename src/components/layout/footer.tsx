'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  ArrowUp,
  Send,
} from 'lucide-react';

const services = [
  { name: 'Fotocopy & Print', href: '#services' },
  { name: 'Print Warna', href: '#services' },
  { name: 'Jilid Buku', href: '#services' },
  { name: 'Laminating', href: '#services' },
  { name: 'Scan Dokumen', href: '#services' },
];

const operatingHours = [
  { day: 'Senin - Jumat', hours: '06:30 - 21:30 WIB' },
  { day: 'Sabtu', hours: '06:30 - 21:30 WIB' },
  { day: 'Minggu', hours: '07:00 - 21:00 WIB' },
  { day: 'Hari Libur', hours: '07:00 - 20:00 WIB' },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Contact Info */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative h-12 w-12">
                <Image
                  src="/images/logo.png"
                  alt="HS Copy Center"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">HS Copy Center</h3>
                <p className="text-sm text-gray-400">Cetak Tanpa Antri</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-400" />
                <p className="text-gray-300">
                  Jl. Riyanto, Dukuhwaluh, Purwokerto
                  <br />
                  Dekat Kampus UMP & UNSOED
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <a
                  href="tel:+6281234567890"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  081-234-567-890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <a
                  href="mailto:info@hscopycenter.site"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  info@hscopycenter.site
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Layanan Kami</h3>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="inline-block text-gray-300 transition-all hover:pl-2 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Operating Hours */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold">
              <Clock className="h-5 w-5 text-orange-400" />
              Jam Operasional
            </h3>
            <ul className="space-y-3">
              {operatingHours.map(item => (
                <li
                  key={item.day}
                  className="flex justify-between text-gray-300"
                >
                  <span>{item.day}</span>
                  <span className="font-medium text-white">{item.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg bg-green-500/20 p-3 text-sm text-green-400">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
              Buka Sekarang
            </div>
          </div>

          {/* Column 4: Social Media & Newsletter */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Ikuti Kami</h3>
            <div className="mb-8 flex gap-4">
              <a
                href="https://instagram.com/hscopycenter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-all hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/hscopycenter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-gray-300 transition-all hover:bg-blue-600 hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>

            {/* Newsletter */}
            <h4 className="mb-3 text-sm font-bold tracking-wider text-gray-400 uppercase">
              Newsletter
            </h4>
            <p className="mb-4 text-sm text-gray-400">
              Dapatkan info promo terbaru
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 rounded-lg bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white transition-all hover:bg-blue-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400">
            © 2026 HS Copy Center. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">Made with ❤️ in Purwokerto</p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed right-6 bottom-24 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-blue-700"
        aria-label="Back to top"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </footer>
  );
}
