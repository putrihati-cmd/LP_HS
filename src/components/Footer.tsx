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
              <li><a href="#" className="hover:text-primary-400 transition-colors">GoPrint</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Cara Pemesanan</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Cara Pembayaran</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Outlet */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Outlet HS Copy</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Bintaro 9</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Tanjung Duren</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Margasatwa</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Ciracas</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Bintaro 5</a></li>
              <li><a href="#" className="text-primary-400 hover:underline transition-colors">More...</a></li>
            </ul>
          </div>

          {/* Online Support */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Online Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Senin-Jumat : 08.00 - 21.00</li>
              <li>Sabtu : 08.00 - 19.00</li>
              <li>Minggu : 12.00 - 21.00</li>
              <li className="pt-2 flex items-center gap-2">
                <Phone size={14} className="text-primary-400" />
                <a href="tel:08538888123" className="hover:text-primary-400 transition-colors">0856-5905-5374</a>
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
