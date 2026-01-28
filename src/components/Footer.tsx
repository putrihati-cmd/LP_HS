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
              <li className="font-bold text-primary-400">HS Copy Center - Purwokerto</li>
              <li>Jl. HR. Bunyamin No. P2</li>
              <li>Purwokerto Utara</li>

              <li className="pt-4 font-bold text-gray-400 text-xs">JAM BUKA:</li>
              <li>Senin-Jumat : 08.00 - 21.00</li>
              <li>Sabtu : 08.00 - 19.00</li>

              <li className="pt-4 flex items-center gap-2">
                <Phone size={14} className="text-primary-400" />
                <a href="tel:085659055374" className="hover:text-primary-400 transition-colors">0856-5905-5374 (WA)</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary-400" />
                <a href="mailto:hscopyorder@gmail.com" className="hover:text-primary-400 transition-colors">hscopyorder@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <Instagram size={16} /> @hscopyofficial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <Twitter size={16} /> @hscopyofficial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <Facebook size={16} /> @HSCopyOfficial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <Youtube size={16} /> HS Copy Print & Design
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
