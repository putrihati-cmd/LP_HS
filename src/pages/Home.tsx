import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureBar from '../components/FeatureBar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { servicesApi } from '../api/services';

const IMAGES = {
  printing: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60', // Digital Printing
  banner: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60', // Banner hanging
  largeFormat: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60', // Large printer
  idCard: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=60', // ID Card
  photocopy: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60', // Papers/Work
  tumbler: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60', // Tumbler
  bottle: 'https://images.unsplash.com/photo-1602143407151-0111419500be?w=800&auto=format&fit=crop&q=60', // Bottle
  toteBag: 'https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?w=800&auto=format&fit=crop&q=60', // Tote Bag
  handbag: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=60', // Handbag app
};

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
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await servicesApi.getAll();
        setServices(res.data || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Hero />
      <FeatureBar />

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Services Section */}
        <section className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-16 md:w-24 bg-gray-300"></div>
                <h2 className="text-xl md:text-2xl font-bold text-primary-500 uppercase tracking-wide">
                  LAYANAN KAMI
                </h2>
                <div className="h-px w-16 md:w-24 bg-gray-300"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Categories Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0 hidden md:block">
                  <Sidebar />
                </div>

                {/* Services Grid */}
                <div className="flex-1">
                   {loading ? (
                     <div className="flex justify-center py-12">
                       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                     </div>
                   ) : services.length === 0 ? (
                     <div className="text-center py-12 bg-white rounded-lg border border-gray-100 p-8">
                        <p className="text-gray-500 mb-4">Belum ada layanan yang ditampilkan.</p>
                        <p className="text-sm text-gray-400">Silakan tambahkan layanan di Admin Panel.</p>
                     </div>
                   ) : (
                     <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, idx) => (
                          <ServiceCard
                            key={idx}
                            id={service.id}
                            title={service.title}
                            description={service.description}
                            image={service.imageUrl}
                            slug={service.slug}
                          />
                        ))}
                     </div>
                   )}
                </div>
            </div>
        </section>

      </main>

      {/* About Section - Updated Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
            <p className="text-gray-500 uppercase tracking-wider mb-2 text-sm font-bold">TENTANG KAMI</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                HS COPY CENTER PURWOKERTO
            </h2>
            </div>

            <div className="max-w-4xl mx-auto text-center text-gray-600 leading-relaxed text-sm">
            <p className="mb-4">
                HS Copy Center hadir untuk membantu mahasiswa dan masyarakat Purwokerto dalam urusan cetak dan jilid dokumen. Kami mengutamakan kerapian, ketepatan, dan pelayanan yang jelas agar setiap dokumen selesai sesuai kebutuhan.
            </p>
            <p className="mb-4">
                Sebagai spesialis Skripsi & Tesis, kami memahami pentingnya deadline dan kualitas. Dengan tim yang berpengalaman, kami siap menjadi partner cetak terpercaya Anda, mulai dari print dokumen harian hingga penjilidan skripsi hard cover eksklusif.
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
