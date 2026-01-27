import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureBar from '../components/FeatureBar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Using the same hardcoded images for now as per copas source
const IMAGES = {
  printing: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/d2f00ca2278b478f8972ec741afa5327.jpg',
  banner: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/1eb92f1117f842e4b115ebd3e3725716.jpg',
  largeFormat: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/c9bef1a7ffb548459120a2b52c925ba9.jpg',
  idCard: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/9b7b584e72e446d59f722b77996d2fdd.jpg',
  photocopy: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/c6e26a1be55e4d5c952814b857600bbc.png',
  tumbler: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/feab4a8fff8f4609a821947ab3855445.jpg',
  bottle: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/5ff42faa56fe49b9a49970530fed65df.jpg',
  toteBag: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/a701343e528b4529980f35bd59f1c312.jpg',
  handbag: 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/56e85c2160ed48dc9fa13fbed675f676.png',
};

const popularProducts = [
  { image: IMAGES.printing, title: 'GoPrint - Cetak Online via Aplikasi', price: 'Mulai Rp. 5.000,-', views: 198007 },
  { image: IMAGES.idCard, title: 'Cetak Foto Berkualitas', price: 'Mulai Rp. 8.000,-', views: 196517 },
  { image: IMAGES.banner, title: 'Digital Printing Premium', price: 'Mulai Rp. 5.000,-' },
  { image: IMAGES.photocopy, title: 'Stempel Custom', price: 'Tersedia di HS Copy', views: 222338 },
  { image: IMAGES.largeFormat, title: 'X Banner', price: 'Mulai Rp. 160.000,-', views: 176402 },
  { image: IMAGES.toteBag, title: 'Cetak Stiker', price: 'Mulai Rp. 10.000', views: 134833 },
];

const newProducts = [
  { image: IMAGES.tumbler, title: 'Frame Neon Box LED Custom', price: 'Mulai Rp. 499.999,-', views: 5457 },
  { image: IMAGES.bottle, title: 'Tumbler Lucu', price: 'Mulai Rp. 59.999,-', views: 5568 },
  { image: IMAGES.banner, title: 'Print DTF UV Decal A3', price: 'Mulai Rp. 29.999,-', views: 18727 },
  { image: IMAGES.idCard, title: 'Cetak 3D Print', price: 'Mulai Rp. 1.199,-', views: 63214 },
  { image: IMAGES.toteBag, title: 'Karangan Bunga Mini', price: 'Mulai Rp. 49.999,-', views: 5893 },
  { image: IMAGES.printing, title: 'Botol Termos Led Prank Template', price: 'Mulai Rp. 59.999,-', views: 3524 },
  { image: IMAGES.largeFormat, title: 'Botol Dundee 1 Liter', price: 'Mulai Rp. 54.999,-', views: 6294 },
  { image: IMAGES.handbag, title: 'QR Stand | Standing Custom QR Code Meja', price: 'Mulai Rp. 59.999,-', views: 5262 },
];

const articles = [
  {
    image: IMAGES.printing,
    title: 'Plakat Sebagai Simbol Penghargaan dan Prestasi',
    excerpt: 'Memberikan penghargaan bukan hanya tentang memberi...',
  },
  {
    image: IMAGES.banner,
    title: 'Foto Copy Terdekat yang Cepat dan Terpercaya',
    excerpt: 'Dalam aktivitas sehari-hari, kebutuhan foto copy h...',
  },
  {
    image: IMAGES.toteBag,
    title: 'Pilihan Mug Estetik untuk Hadiah Istimewa',
    excerpt: 'Mug bukan hanya sekadar wadah untuk minum...',
  },
  {
    image: IMAGES.largeFormat,
    title: 'Optimasi Desain Neon Box untuk Menarik Pelanggan',
    excerpt: 'Dalam dunia bisnis yang semakin kompetitif, visibi...',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Hero />
      <FeatureBar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Popular Products */}
        <section className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 md:w-24 bg-gray-300"></div>
                <h2 className="text-xl md:text-2xl font-bold text-primary-500 uppercase tracking-wide">
                  PRODUK POPULER
                </h2>
                <div className="h-px w-16 md:w-24 bg-gray-300"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Categories Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                  <Sidebar />
                </div>

                {/* Products Grid */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
                  {popularProducts.map((product, idx) => (
                      <ProductCard key={idx} {...product} />
                  ))}
                </div>
            </div>
        </section>

        {/* New Products */}
        <section className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 md:w-24 bg-gray-300"></div>
                <h2 className="text-xl md:text-2xl font-bold text-primary-500 uppercase tracking-wide">
                  PRODUK TERBARU
                </h2>
                <div className="h-px w-16 md:w-24 bg-gray-300"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {newProducts.map((product, idx) => (
                <ProductCard key={idx} {...product} />
                ))}
            </div>
        </section>
      </main>

      {/* About Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
            <p className="text-gray-500 uppercase tracking-wider mb-2 text-sm font-bold">TENTANG HS COPY CENTER</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                SOLUSI TERBAIK UNTUK CETAK & PRINT
            </h2>
            </div>

            <div className="max-w-4xl mx-auto text-center text-gray-600 leading-relaxed text-sm">
            <p className="mb-4">
                HS Copy Center adalah layanan digital printing dan percetakan terpercaya dengan cabang yang tersebar di berbagai lokasi. Berbagai kebutuhan printing, jasa desain grafis, percetakan, fotocopy hingga coworking space bisa dilayani di tempat print kami.
            </p>
            <p className="mb-4">
                Mulai dari brosur, poster dengan berbagai jenis dan ukuran, cetak foto, ID Card, stempel, kop surat, nota, spanduk, banner, X banner, roll banner, buku yasin, photobook, buku agenda, kartu nama, kalender meja atau dinding, mug secara custom, berbagai macam botol minum termasuk tumbler starbuck, hingga plakat.
            </p>
            </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-12 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary-500 rounded"></span>
                ARTIKEL TERBARU
              </h2>
              <div className="h-px flex-1 bg-gray-300 mx-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {articles.map((article, idx) => (
                <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-500 text-sm">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <span className="text-primary-500 text-xs font-bold hover:underline">
                      Read More
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
}
