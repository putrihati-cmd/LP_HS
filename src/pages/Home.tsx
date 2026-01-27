import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import CategoryGrid from '../components/CategoryGrid';
import Footer from '../components/Footer';
import { Star, Truck, ThumbsUp, Clock } from 'lucide-react';
import { client } from '../api/client';

import { PromoSection } from '../components/PromoSection';
import { MemberSection } from '../components/MemberSection';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await client.api.fetch('/api/products');
        const data = await res.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const popularProducts = products.slice(0, 6);
  const newProducts = products.slice(6, 14);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-700">
      <Navbar />

      <main>
        {/* Snapy Style Layout: Sidebar + Hero Side-by-Side */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">

            {/* Sidebar (Left - Categories) */}
            <aside className="hidden md:block w-1/4 flex-shrink-0">
               <Sidebar />
               <div className="mt-4 bg-secondary/10 p-4 rounded border border-secondary/20">
                  <h4 className="font-bold text-primary mb-1">Butuh Bantuan?</h4>
                  <p className="text-sm text-gray-600">0856-5905-5374</p>
               </div>
            </aside>

            {/* Hero Slider (Right) */}
            <div className="w-full md:w-3/4">
               <Hero />
            </div>
          </div>
        </div>

        {/* Visual Category Grid (Icons) */}
        <CategoryGrid />

        {/* Promo Section */}
        <PromoSection />

        {/* Value Props Bar */}
        <div className="bg-gray-50 border-b border-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center text-xs md:text-sm font-bold text-primary uppercase tracking-wide gap-4">
              <span className="flex items-center gap-2"><Star size={16} className="text-secondary" /> Premium Quality</span>
              <span className="flex items-center gap-2"><Truck size={16} className="text-secondary" /> Express Shipping</span>
              <span className="flex items-center gap-2"><ThumbsUp size={16} className="text-secondary" /> Excellent Service</span>
              <span className="flex items-center gap-2"><Clock size={16} className="text-secondary" /> 24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Main Content Area (Products - Full Width) */}
        <div className="container mx-auto px-4 py-12">
            {/* Popular Products */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-primary uppercase tracking-wider border-b-2 border-secondary pb-1 pr-4">
                  Popular Products
                </h2>
                <div className="flex-grow border-b border-gray-200 h-full"></div>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {popularProducts.length > 0 ? popularProducts.map((product, index) => (
                    <ProductCard
                      key={index}
                      id={product.id}
                      title={product.name}
                      price={`Rp ${product.price.toLocaleString()}`}
                      category={product.category}
                      image={product.imageUrl}
                    />
                  )) : (
                    <div className="col-span-full text-center py-8 text-gray-500">No products available. Add some in Admin Panel.</div>
                  )}
                </div>
              )}
            </section>

            {/* New Products */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-primary uppercase tracking-wider border-b-2 border-secondary pb-1 pr-4">
                  New Products
                </h2>
                <div className="flex-grow border-b border-gray-200 h-full"></div>
              </div>

              {loading ? (
                <div className="text-center py-8">Loading products...</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {newProducts.length > 0 ? newProducts.map((product, index) => (
                    <ProductCard
                      key={index}
                      id={product.id}
                      title={product.name}
                      price={`Rp ${product.price.toLocaleString()}`}
                      category={product.category}
                      image={product.imageUrl}
                    />
                  )) : (
                    <div className="col-span-full text-center py-8 text-gray-500">No new products.</div>
                  )}
                </div>
              )}
            </section>
        </div>

        {/* About Section - Full Width */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 text-center max-w-5xl">
            <h2 className="text-2xl font-bold text-primary mb-2 uppercase">About HS Copy Center</h2>
            <h3 className="text-xl font-bold text-gray-800 mb-6 uppercase">Solusi Cetak Cepat & Berkualitas</h3>
            <p className="text-gray-500 leading-relaxed text-sm text-justify md:text-center">
              HS Copy Center adalah penyedia jasa digital printing dan fotocopy terbaik di Purwokerto.
              Kami siap melayani kebutuhan cetak dokumen, skripsi, brosur, banner, hingga merchandise dengan kualitas premium.
              Didukung dengan mesin terbaru dan tenaga profesional, kami menjamin hasil cetak yang tajam dan proses yang cepat.
              Kami juga menyediakan layanan "Kirim File via WA" untuk kemudahan anda dalam memesan tanpa harus antri lama.
              Percayakan kebutuhan cetak anda kepada HS Copy Center, Sang Pencetak Sukses Anda.
            </p>
          </div>
        </section>

        {/* Member Section */}
        <MemberSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
