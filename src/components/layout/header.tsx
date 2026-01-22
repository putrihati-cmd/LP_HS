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
  { name: 'FAQ', href: '#faq' },
  { name: 'Lokasi', href: '#location' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
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
            <div className="relative h-10 w-10 transition-transform group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="HS Copy Center"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg leading-none font-bold text-gray-900">
                HS Copy
              </span>
              <span className="text-xs font-semibold tracking-wider text-gray-500">
                CENTER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                onClick={e => handleNavClick(e, item.href)}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href={getWhatsAppLink(
                'Halo, saya ingin konsultasi tentang layanan cetak'
              )}
              target="_blank"
            >
              <Button
                size="lg"
                className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:from-blue-600 hover:to-blue-700"
              >
                <Phone className="mr-2 h-4 w-4" />
                Hubungi Kami
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
              <Menu className="h-6 w-6" aria-hidden="true" />
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

          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8">
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
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8">
              <div className="space-y-1">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={e => handleNavClick(e, item.href)}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-gray-900 transition-colors hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <Link
                  href={getWhatsAppLink(
                    'Halo, saya ingin konsultasi tentang layanan cetak'
                  )}
                  target="_blank"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    size="lg"
                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 font-bold text-white"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Hubungi Kami
                  </Button>
                </Link>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Buka 06:30 - 21:00 WIB
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
