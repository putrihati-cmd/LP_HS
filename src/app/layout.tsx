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
    default:
      'HS Copy Center | Fotocopy & Print Purwokerto ⚡ Dekat UMP & UNSOED',
    template: '%s | HS Copy Center',
  },
  description:
    'Layanan fotocopy, print, jilid, dan laminating profesional di Purwokerto. Harga mulai Rp 150/lembar. Buka 06:30-21:30. Dekat kampus UMP dan UNSOED.',
  keywords: [
    'fotocopy purwokerto',
    'print murah purwokerto',
    'jilid skripsi purwokerto',
    'cetak dokumen purwokerto',
    'fotocopy dekat ump',
    'print dekat unsoed',
  ],
  authors: [{ name: 'HS Copy Center' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://hscopycenter.site',
    title: 'HS Copy Center | Fotocopy & Print Purwokerto',
    description:
      'Layanan fotocopy, print, jilid, dan laminating profesional di Purwokerto. Harga mulai Rp 150/lembar.',
    siteName: 'HS Copy Center',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HS Copy Center | Fotocopy & Print Purwokerto',
    description:
      'Layanan fotocopy, print, jilid, dan laminating profesional di Purwokerto.',
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
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
