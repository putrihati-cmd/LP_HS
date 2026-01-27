import { useState } from 'react';

// CDN Images
const IMAGES = {
  // Products
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

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">HS</span>
            </div>
            <span className="text-xl font-bold text-gray-800">HS Copy Center</span>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Cari produk..." 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block border-t md:border-0`}>
          <ul className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 py-3">
            <li><a href="#" className="block px-3 py-2 text-primary-500 font-medium hover:bg-primary-50 rounded">Beranda</a></li>
            <li className="relative group">
              <a href="#" className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded">
                Kategori
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </li>
            <li><a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded">Cabang</a></li>
            <li><a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded">Portofolio</a></li>
            <li><a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded">Artikel</a></li>
            <li><a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-500 hover:bg-primary-50 rounded">Tentang Kami</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// Hero Slider Component
function HeroSlider() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-secondary-500 text-white text-sm font-medium rounded-full mb-4">
              HOT PRODUCT
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              CETAK CUSTOM<br />
              <span className="text-secondary-300">BERKUALITAS</span>
            </h1>
            <p className="text-white/80 mb-6 max-w-md">
              Solusi cetak terbaik untuk kebutuhan bisnis Anda. Dari dokumen hingga merchandise custom.
            </p>
            <button className="px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg transition-colors">
              PESAN SEKARANG
            </button>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10">
              <img 
                src={IMAGES.printing} 
                alt="Digital Printing" 
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary-500/30 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
      {/* Slider Dots */}
      <div className="flex justify-center gap-2 pb-6">
        <span className="w-3 h-3 bg-white rounded-full"></span>
        <span className="w-3 h-3 bg-white/50 rounded-full"></span>
        <span className="w-3 h-3 bg-white/50 rounded-full"></span>
      </div>
    </section>
  );
}

// Feature Bar Component
function FeatureBar() {
  const features = [
    { 
      icon: (
        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ), 
      title: 'Kualitas Premium', 
      desc: 'Hasil cetak terbaik' 
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ), 
      title: 'Pengiriman Cepat', 
      desc: 'Same day delivery' 
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ), 
      title: 'Layanan Terbaik', 
      desc: 'Kepuasan pelanggan' 
    },
    { 
      icon: (
        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ), 
      title: 'Support 24/7', 
      desc: 'Siap membantu' 
    },
  ];
  
  return (
    <section className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3">
              {feature.icon}
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Categories Sidebar Component
function CategoriesSidebar() {
  const categories = [
    'Print Dokumen',
    'Fotocopy',
    'Print Kain',
    'Large Format',
    'Promo & Gift',
    'Foto',
    'Marketing Tools',
    'Printeron',
    'Coworking Space',
    'Signage',
    'Packaging',
    'UMKM',
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-primary-500 text-white px-4 py-3 font-semibold">
        Kategori
      </div>
      <ul className="divide-y">
        {categories.map((cat, idx) => (
          <li key={idx}>
            <a href="#" className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors text-sm">
              {cat}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  views?: number;
}

function ProductCard({ image, title, price, views }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {views && (
          <span className="absolute top-2 right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded">
            {views.toLocaleString()}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-primary-500 hover:underline line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">{price}</p>
      </div>
    </div>
  );
}

// Popular Products Section
function PopularProducts() {
  const products = [
    { image: IMAGES.printing, title: 'GoPrint - Cetak Online via Aplikasi', price: 'Mulai Rp. 5.000,-', views: 198007 },
    { image: IMAGES.idCard, title: 'Cetak Foto Berkualitas', price: 'Mulai Rp. 8.000,-', views: 196517 },
    { image: IMAGES.banner, title: 'Digital Printing Premium', price: 'Mulai Rp. 5.000,-' },
    { image: IMAGES.photocopy, title: 'Stempel Custom', price: 'Tersedia di HS Copy', views: 222338 },
    { image: IMAGES.largeFormat, title: 'X Banner', price: 'Mulai Rp. 160.000,-', views: 176402 },
    { image: IMAGES.toteBag, title: 'Cetak Stiker', price: 'Mulai Rp. 10.000', views: 134833 },
  ];
  
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary-500 rounded"></span>
          PRODUK POPULER
        </h2>
        <div className="h-px flex-1 bg-gray-200 mx-4"></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="w-full md:w-56 flex-shrink-0">
          <CategoriesSidebar />
        </div>
        
        {/* Products Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// New Products Section
function NewProducts() {
  const products = [
    { image: IMAGES.tumbler, title: 'Frame Neon Box LED Custom', price: 'Mulai Rp. 499.999,-', views: 5457 },
    { image: IMAGES.bottle, title: 'Tumbler Lucu', price: 'Mulai Rp. 59.999,-', views: 5568 },
    { image: IMAGES.banner, title: 'Print DTF UV Decal A3', price: 'Mulai Rp. 29.999,-', views: 18727 },
    { image: IMAGES.idCard, title: 'Cetak 3D Print', price: 'Mulai Rp. 1.199,-', views: 63214 },
    { image: IMAGES.toteBag, title: 'Karangan Bunga Mini', price: 'Mulai Rp. 49.999,-', views: 5893 },
    { image: IMAGES.printing, title: 'Botol Termos Led Prank Template', price: 'Mulai Rp. 59.999,-', views: 3524 },
    { image: IMAGES.largeFormat, title: 'Botol Dundee 1 Liter', price: 'Mulai Rp. 54.999,-', views: 6294 },
    { image: IMAGES.handbag, title: 'QR Stand | Standing Custom QR Code Meja', price: 'Mulai Rp. 59.999,-', views: 5262 },
  ];
  
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary-500 rounded"></span>
          PRODUK TERBARU
        </h2>
        <div className="h-px flex-1 bg-gray-200 mx-4"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-gray-500 uppercase tracking-wider mb-2">TENTANG HS COPY CENTER</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            SOLUSI TERBAIK UNTUK CETAK & PRINT
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto text-center text-gray-600 leading-relaxed">
          <p className="mb-4">
            HS Copy Center adalah layanan digital printing dan percetakan terpercaya dengan cabang yang tersebar di berbagai lokasi. Berbagai kebutuhan printing, jasa desain grafis, percetakan, fotocopy hingga coworking space bisa dilayani di tempat print kami.
          </p>
          <p className="mb-4">
            Mulai dari brosur, poster dengan berbagai jenis dan ukuran, cetak foto, ID Card, stempel, kop surat, nota, spanduk, banner, X banner, roll banner, buku yasin, photobook, buku agenda, kartu nama, kalender meja atau dinding, mug secara custom, berbagai macam botol minum termasuk tumbler starbuck, hingga plakat.
          </p>
          <p>
            HS Copy Center juga bisa print custom interior dan eksterior, seperti wallpaper dinding custom, neon box, neon flex dengan berbagai pilihan harga. Selain itu, HS Copy Center pun bisa melayani print kain atau textile, pouch, totebag, bantal, kerudung segi empat dan jilbab terbaru dalam berbagai model.
          </p>
        </div>
      </div>
    </section>
  );
}

// Latest Articles Section
function LatestArticles() {
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
  
  return (
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
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-primary-500">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <a href="#" className="text-primary-500 text-sm font-medium hover:underline">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Popular Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Hubungi Kami</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">GoPrint</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Cara Pemesanan</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Cara Pembayaran</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Syarat & Ketentuan</a></li>
            </ul>
          </div>
          
          {/* Outlet */}
          <div>
            <h3 className="text-white font-semibold mb-4">Outlet HS Copy</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Bintaro 9</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Tanjung Duren</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Margasatwa</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Ciracas sebrang Anandina</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">HS Copy Bintaro 5</a></li>
              <li><a href="#" className="text-primary-400 hover:underline transition-colors">More...</a></li>
            </ul>
          </div>
          
          {/* Online Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Online Support</h3>
            <ul className="space-y-2 text-sm">
              <li>Senin-Jumat : 08.00 - 21.00</li>
              <li>Sabtu : 08.00 - 19.00</li>
              <li>Minggu : 12.00 - 21.00</li>
              <li className="pt-2">
                <a href="tel:08538888123" className="hover:text-primary-400 transition-colors">0853 8888 1234</a>
              </li>
              <li>
                <a href="mailto:hscopyorder@gmail.com" className="hover:text-primary-400 transition-colors">hscopyorder@gmail.com</a>
              </li>
            </ul>
          </div>
          
          {/* Follow Us */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>📷</span> @hscopyofficial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>🐦</span> @hscopyofficial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>📘</span> @HSCopyOfficial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors flex items-center gap-2">
                  <span>▶️</span> HS Copy Print & Design
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-sm text-center text-gray-500">
            © <a href="#" className="text-primary-400 hover:underline">HSCopy.co.id</a>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <HeroSlider />
      <FeatureBar />
      
      <main className="max-w-7xl mx-auto px-4">
        <PopularProducts />
        <NewProducts />
      </main>
      
      <AboutSection />
      <LatestArticles />
      <Footer />
    </div>
  );
}

export default App;
