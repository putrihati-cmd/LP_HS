import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/images/logo.png"
                  alt="HS Copy Center"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">Copy Center</span>
            </Link>
            <p className="text-sm text-gray-400">
              Layanan fotocopy, print, dan jilid profesional di Purwokerto.
              Dekat kampus UMP dan UNSOED.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="#calculator"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Cek Harga
                </Link>
              </li>
              <li>
                <Link
                  href="#why-us"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Keunggulan
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Layanan Kami</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Fotocopy B/W & Color</li>
              <li>Print Dokumen</li>
              <li>Jilid Soft & Hard Cover</li>
              <li>Laminating</li>
              <li>Cetak Skripsi & Tesis</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <span>
                  Jl. Raya Dukuhwaluh No. 123, Purwokerto, Jawa Tengah 53182
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>0856-4376-5889</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>hscopycenter@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <span>06:30 - 21:30 WIB (Setiap Hari)</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-4 flex gap-4">
              <Link
                href="https://instagram.com/hscopycenter"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://facebook.com/hscopycenter"
                target="_blank"
                className="text-gray-400 transition-colors hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} HS Copy Center. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
