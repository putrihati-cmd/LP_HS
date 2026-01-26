import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm pt-12 pb-6 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Popular Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 uppercase border-b border-gray-700 pb-2 inline-block">Menu</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/category" className="hover:text-primary transition-colors">Layanan</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cara Order</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>

          {/* Outlet HS Copy */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 uppercase border-b border-gray-700 pb-2 inline-block">Alamat</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-primary flex-shrink-0" />
                <span>Gg. 2 No.7, Tegalmulya, Ledug, Kembaran, Banyumas</span>
              </li>
              <li><span className="text-xs text-gray-500 italic block mt-2">Melayani area Purwokerto & sekitarnya</span></li>
            </ul>
          </div>

          {/* Online Support */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 uppercase border-b border-gray-700 pb-2 inline-block">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 text-primary" />
                <div>
                  <p>Buka Setiap Hari</p>
                  <p>06:30 - 21:00 WIB</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>0856-5905-5374</span>
              </li>
               <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>admin@hscopycenter.site</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 uppercase border-b border-gray-700 pb-2 inline-block">Ikuti Kami</h3>
            <div className="flex space-x-3 mb-4">
              <a href="https://www.instagram.com/hscopycenter" target="_blank" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/hscopycenterr" target="_blank" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
            <p className="text-xs text-gray-500">
              Dapatkan info promo terbaru di sosial media kami.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} HS Copy Center. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
