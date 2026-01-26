import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { Star, Truck, ThumbsUp, Clock } from 'lucide-react';
import { client } from '../api/client';

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
        {/* Hero Banner - Full Width */}
        <Hero />

        {/* Value Props Bar */}
        <div className="bg-gray-50 border-b border-gray-100 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center text-xs md:text-sm font-bold text-primary uppercase tracking-wide gap-4">
              <span className="flex items-center gap-2"><Star size={16} className="text-secondary" /> Premium Quality Product</span>
              <span className="flex items-center gap-2"><Truck size={16} className="text-secondary" /> Express Shipping</span>
              <span className="flex items-center gap-2"><ThumbsUp size={16} className="text-secondary" /> Excellent Services</span>
              <span className="flex items-center gap-2"><Clock size={16} className="text-secondary" /> 24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <aside className="hidden md:block w-1/4 flex-shrink-0">
              <Sidebar />

              {/* Additional Sidebar Banners/Info could go here */}
              <div className="mt-6 bg-gray-100 p-4 rounded text-center">
                <h4 className="font-bold text-primary mb-2">Butuh Bantuan?</h4>
                <p className="text-sm text-gray-600">Hubungi 0856-5905-5374</p>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="w-full md:w-3/4">

              {/* Popular Products */}
              <section className="mb-12">
                <div className="flex items-center mb-6">
                  <h2 className="text-xl font-bold text-primary uppercase tracking-wider border-b-2 border-secondary pb-1 pr-4">
                    Popular Products
                  </h2>
                  <div className="flex-grow border-b border-gray-200 h-full"></div>
                </div>

                {loading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                      <div className="col-span-3 text-center py-8 text-gray-500">No products available. Add some in Admin Panel.</div>
                    )}
                  </div>
                )}
              </section>

              {/* New Products */}
              <section className="mb-12">
                <div className="flex items-center mb-6">
                  <h2 className="text-xl font-bold text-primary uppercase tracking-wider border-b-2 border-secondary pb-1 pr-4">
                    New Products
                  </h2>
                  <div className="flex-grow border-b border-gray-200 h-full"></div>
                </div>

                {loading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                      <div className="col-span-4 text-center py-8 text-gray-500">No new products.</div>
                    )}
                  </div>
                )}
              </section>

            </div>
          </div>
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
      </main>
      <Footer />
    </div>
  );
};

export default Home;
