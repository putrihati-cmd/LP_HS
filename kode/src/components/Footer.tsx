import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm pt-12 pb-6 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Popular Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 uppercase border-b border-gray-700 pb-2 inline-block">Popular Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">GoPrint</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How to Order</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How to Payment</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Outlet Snapy */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 uppercase border-b border-gray-700 pb-2 inline-block">Outlet HS Copy</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">HS Sunter 2</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">HS Pasar Minggu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">HS Bintaro 7</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">HS Sunter 1</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">HS Pantai Indah Kapuk</a></li>
              <li><a href="#" className="hover:text-primary transition-colors italic">More...</a></li>
            </ul>
          </div>

          {/* Online Support */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 uppercase border-b border-gray-700 pb-2 inline-block">Online Support</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 text-primary" />
                <div>
                  <p>Senin-Jumat : 08.00 - 21.00</p>
                  <p>Sabtu : 08.00 - 19.00</p>
                  <p>Minggu : 12.00 - 21.00</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>0853 8888 1234</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>order@hscopycenter.site</span>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 uppercase border-b border-gray-700 pb-2 inline-block">Follow Us</h3>
            <div className="flex space-x-3 mb-4">
              <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
            <p className="text-xs text-gray-500">
              Subscribe to our newsletter for latest updates and offers.
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
