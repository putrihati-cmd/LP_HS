import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartTotal = useCartStore((state) => state.total());

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 font-sans">
      {/* Top Info Bar (Snapy Style) */}
      <div className="bg-primary text-white text-xs py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Buka Setiap Hari 06:30 - 21:00 WIB</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">0856-5905-5374</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/how-to-order" className="hover:underline">Cara Order</Link>
            <Link to="/login" className="hover:underline">Login / Register</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              HS
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary leading-none">HS Copy</span>
              <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Center</span>
            </div>
          </Link>

          {/* Search Bar - Wide and Central */}
          <div className="hidden md:flex flex-1 max-w-3xl relative">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full border border-gray-200 py-2 px-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-gray-50"
              />
              <button className="bg-white border border-l-0 border-gray-200 text-gray-400 px-4 hover:text-primary transition-colors flex items-center">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            <Link to="/cart" className="relative group">
              <div className="flex items-center gap-2 text-gray-700 group-hover:text-primary transition-colors">
                <div className="relative">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-secondary text-primary-dark text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                    {cartItems.length}
                  </span>
                </div>
                <div className="hidden lg:flex flex-col text-xs">
                  <span className="text-gray-500">Keranjang</span>
                  <span className="font-bold">Rp {cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </Link>

            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4 relative">
           <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:border-primary"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </button>
        </div>
      </div>

      {/* Navigation Bar - Snapy Style (Black/Dark Background or Simple Border) */}
      <nav className="bg-gray-50 border-t border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-8 py-3 text-sm font-bold text-gray-700 uppercase tracking-wide">
            <li><Link to="/" className="text-primary hover:text-secondary transition-colors">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Print Shop</Link></li>
            <li><Link to="/products" className="hover:text-primary transition-colors">Produk</Link></li>
            <li><Link to="/promo" className="hover:text-primary transition-colors text-red-500">Promo</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Hubungi Kami</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col text-sm font-medium text-gray-700">
            <li><Link to="/" className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50">Home</Link></li>
            <li><Link to="/category" className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50">Category</Link></li>
            <li><Link to="/branch" className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50">Branch</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
