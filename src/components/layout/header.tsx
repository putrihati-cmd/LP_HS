'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

const navigation = [
  { name: 'Beranda', href: '#' },
  { name: 'Layanan', href: '#services' },
  { name: 'Harga', href: '#calculator' },
  { name: 'Testimoni', href: '#why-us' },
  { name: 'Kontak', href: '#footer' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="glass fixed top-0 right-0 left-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-12 w-12 transition-transform group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="HS Copy Center"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl leading-none font-bold text-gray-900">
                HS Copy
              </span>
              <span className="text-sm font-semibold tracking-wider text-blue-600">
                CENTER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                onClick={e => handleNavClick(e, item.href)}
                className="text-sm font-semibold tracking-wide text-gray-600 uppercase transition-colors hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href={getWhatsAppLink('Halo, saya ingin order')}
              target="_blank"
            >
              <Button
                variant="primary"
                size="lg"
                className="rounded-full px-8 shadow-lg transition-all hover:scale-105 hover:shadow-blue-500/30"
              >
                <Phone className="mr-2 h-5 w-5" />
                Order Sekarang
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 transition-colors hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Panel - Slide from right */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-10 w-10">
                  <Image
                    src="/images/logo.png"
                    alt="HS Copy Center"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  HS Copy Center
                </span>
              </Link>
              <button
                type="button"
                className="rounded-lg p-2.5 text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8">
              <div className="space-y-2">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={e => handleNavClick(e, item.href)}
                    className="block rounded-xl px-4 py-4 text-lg font-semibold text-gray-900 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <Link
                  href={getWhatsAppLink('Halo, saya ingin order')}
                  target="_blank"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full rounded-full"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Order Sekarang
                  </Button>
                </Link>

                <p className="mt-6 text-center text-sm text-gray-500">
                  Buka Setiap Hari 06:30 - 21:30 WIB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
