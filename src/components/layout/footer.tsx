'use client';

import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ArrowUp,
  Instagram,
  Facebook,
} from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-xl font-bold">HS Copy Center</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Jasa fotocopy & print cepat di Purwokerto. Kirim file via
              WhatsApp, siap 5 menit!
            </p>
            <Link
              href={getWhatsAppLink('Halo, saya mau kirim file untuk dicetak')}
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4" />
              Kirim File via WA
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">Kontak</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Gg. 2 No.7, Tegalmulya, Ledug, Kembaran</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <a href="tel:+6285659055374" className="hover:text-white">
                  0856-5905-5374
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4" />
                <span>06:30 - 21:00 WIB (Setiap Hari)</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="#services"
                  className="transition-colors hover:text-white"
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="#calculator"
                  className="transition-colors hover:text-white"
                >
                  Hitung Harga
                </Link>
              </li>
              <li>
                <Link
                  href="#member"
                  className="transition-colors hover:text-white"
                >
                  Member
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="transition-colors hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#location"
                  className="transition-colors hover:text-white"
                >
                  Lokasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4 font-semibold">Ikuti Kami</h4>
            <div className="flex gap-3">
              <Link
                href="https://www.instagram.com/hscopycenter"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white transition-all hover:scale-110"
                aria-label="Instagram HS Copy Center"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.facebook.com/hscopycenterr"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-all hover:scale-110"
                aria-label="Facebook HS Copy Center"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Follow untuk info promo & tips!
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 HS Copy Center. Purwokerto.</p>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className="fixed right-6 bottom-24 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white shadow-lg transition-all hover:bg-gray-600"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
