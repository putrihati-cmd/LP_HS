'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

const navigation = [
  { name: 'Beranda', href: '#' },
  { name: 'Layanan', href: '#services' },
  { name: 'Harga', href: '#calculator' },
  { name: 'Keunggulan', href: '#why-us' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo.png"
                alt="HS Copy Center"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900">Copy Center</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-gray-600 transition-colors hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href={getWhatsAppLink('Halo, saya ingin order')}
              target="_blank"
            >
              <Button variant="primary" size="sm">
                <Phone className="h-4 w-4" />
                Order Sekarang
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="p-2 text-gray-700 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-2 font-medium text-gray-600 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={getWhatsAppLink('Halo, saya ingin order')}
                target="_blank"
              >
                <Button variant="primary" className="mt-2 w-full">
                  <Phone className="h-4 w-4" />
                  Order Sekarang
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
