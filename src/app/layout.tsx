import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer, WhatsAppFloat } from '@/components/layout';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'HS Copy Center Purwokerto - Fotocopy & Print Murah Dekat UNSOED',
    template: '%s | HS Copy Center',
  },
  description:
    'Jasa fotocopy & print terdekat dari kampus UNSOED. Harga mulai Rp 300/lembar. Proses cepat 5 menit. Buka 06:30-21:00 setiap hari. Kirim file via WhatsApp!',
  keywords: [
    'fotocopy purwokerto',
    'print murah purwokerto',
    'cetak dokumen purwokerto',
    'fotocopy dekat unsoed',
    'print dekat ump',
    'cetak skripsi purwokerto',
    'fotocopy dukuhwaluh',
  ],
  authors: [{ name: 'HS Copy Center' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://hscopycenter.site',
    title: 'HS Copy Center Purwokerto - Fotocopy & Print Murah',
    description:
      'Jasa fotocopy & print cepat 5 menit. Harga mulai Rp 300/lembar. Dekat kampus UNSOED.',
    siteName: 'HS Copy Center',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HS Copy Center Purwokerto - Fotocopy & Print Murah',
    description:
      'Jasa fotocopy & print cepat 5 menit. Harga mulai Rp 300/lembar.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
