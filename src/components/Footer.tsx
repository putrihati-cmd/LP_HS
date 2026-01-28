import React from 'react';
import { Phone, Mail, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Popular Links */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Popular Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Cara Pemesanan</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Cara Pembayaran</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Layanan Unggulan */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Layanan Unggulan</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/skripsi" className="hover:text-primary-400 transition-colors">Cetak Skripsi</a></li>
              <li><a href="/layanan" className="hover:text-primary-400 transition-colors">Print Dokumen</a></li>
              <li><a href="/layanan" className="hover:text-primary-400 transition-colors">Cetak Foto</a></li>
              <li><a href="/layanan" className="hover:text-primary-400 transition-colors">Jilid Hardcover</a></li>
              <li><a href="/layanan" className="hover:text-primary-400 transition-colors">Print A3+</a></li>
            </ul>
          </div>

          {/* Online Support */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Kontak & Lokasi</h3>
            <ul className="space-y-2 text-sm">
              <li className="font-bold text-primary-400">HS Copy Center</li>
              <li>Gg. 2 No. 7, Tegalmulya, Ledug,</li>
              <li>Kec. Kembaran, Banyumas 53182</li>

              <li className="pt-4 font-bold text-gray-400 text-xs">JAM BUKA:</li>
              <li>Setiap Hari : 06.30 - 21.30 WIB</li>

              <li className="pt-4 flex items-center gap-2">
                <Phone size={14} className="text-primary-400" />
                <a href="https://wa.me/6285659055374" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">0856-5905-5374 (WA)</a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={14} className="text-primary-400" />
                <a href="https://instagram.com/hscopycenter" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">@hscopycenter</a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://instagram.com/hscopycenter" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <Instagram size={16} /> @hscopycenter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} <a href="#" className="text-primary-400 hover:underline">HSCopy.co.id</a>. All Rights Reserved. Used for Demo Purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
