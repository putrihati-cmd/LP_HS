import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureBar from '../components/FeatureBar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { servicesApi } from '../api/services';

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
