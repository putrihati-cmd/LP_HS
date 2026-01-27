import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">HS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800 leading-none">HS Copy Center</span>
              <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Digital Printing</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari layanan..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-gray-50"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500">
                <Search size={20} />
              </button>
            </div>
          </div>

           {/* Icons - Hidden as requested */}
          <div className="hidden md:flex items-center gap-6">
             {/* Cart and Login hidden for now */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t border-gray-100`}>
          <ul className="flex flex-col md:flex-row md:items-center gap-1 md:gap-8 py-3 text-sm font-medium">
            <li><Link to="/" className="block px-3 py-2 text-primary-500 font-bold hover:bg-primary-50 rounded">Beranda</Link></li>
            <li className="relative group">
              <Link to="/layanan" className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded">
                Layanan
                <ChevronDown size={14} />
              </Link>
            </li>
            <li><Link to="/artikel" className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded">Artikel</Link></li>
            <li>
                <a href="https://cetakfoto.hscopycenter.site" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded">
                    Cetak Foto
                </a>
            </li>
            <li>
                <a href="https://dokumen.hscopycenter.site" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded">
                    Cetak Dokumen
                </a>
            </li>
            <li><Link to="/member" className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded">Member</Link></li>
            <li><Link to="/promo" className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded">Promo</Link></li>
            <li><Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-primary-500 hover:bg-primary-50 rounded">Tentang Kami</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
