import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesApi } from '../api/services';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { MessageCircle, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';

// Hardcoded fallback data just in case API fails or is empty during dev
const FALLBACK_SERVICES = [
  {
    id: 999,
    title: 'Jilid Skripsi Hardcover',
    slug: 'jilid-skripsi-hardcover',
    description: 'Layanan jilid skripsi terbaik dengan hasil rapi, kuat, dan tahan lama. Menggunakan bahan cover berkualitas premium dengan pilihan warna lengkap sesuai fakultas. Pengerjaan cepat bisa ditunggu untuk deadline mendesak. Sudah termasuk pembatas buku pita dan siku pengaman emas/perak.',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=60'
  }
];

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        // Fetch all and filter (Robust client-side approach)
        const res = await servicesApi.getAll();
        const found = res.data?.find((s: any) => s.slug === slug);

        if (found) {
          setService(found);
        } else {
            // Check fallback
            const fallback = FALLBACK_SERVICES.find(s => s.slug === slug);
            if (fallback) setService(fallback);
            else setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchService();
  }, [slug]);

  // SEO: Update Page Title
  useEffect(() => {
    if (service) {
      document.title = `${service.title} - HS Copy Center Purwokerto`;
    }
  }, [service]);

  if (loading) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
            <Footer />
        </div>
    );
  }

  if (error || !service) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Layanan Tidak Ditemukan</h1>
                <p className="text-gray-500 mb-6">Maaf, layanan yang Anda cari tidak tersedia atau URL salah.</p>
                <Link to="/" className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                    Kembali ke Beranda
                </Link>
            </div>
            <Footer />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Navbar />

      <main>
          {/* SEO Hero Section */}
          <div className="bg-white border-b border-gray-100">
             <div className="max-w-7xl mx-auto px-4 py-8">
                 <Breadcrumbs items={[{ label: 'Layanan', path: '/' }, { label: service.title }]} />

                 <div className="flex flex-col md:flex-row gap-8 items-start">
                     {/* Image Column */}
                     <div className="w-full md:w-1/2">
                        <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100 relative group">
                            <img
                                src={service.imageUrl || 'https://via.placeholder.com/600x400?text=Layanan+HS'}
                                alt={`Layanan ${service.title} di Purwokerto`}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                     </div>

                     {/* Content Column */}
                     <div className="w-full md:w-1/2">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {service.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center gap-1">
                                <Clock size={16} className="text-primary-500" />
                                <span>Pengerjaan Cepat</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPin size={16} className="text-primary-500" />
                                <span>Purwokerto Utara</span>
                            </div>
                        </div>

                        {/* Friendly Description box */}
                        <div className="prose prose-sm md:prose-base text-gray-600 mb-8 leading-relaxed bg-white rounded-lg p-1">
                            {service.description ? (
                                <p>{service.description}</p>
                            ) : (
                                <p>
                                    Butuh layanan {service.title} berkualitas di Purwokerto?
                                    HS Copy Center siap membantu kebutuhan Anda. Kami menggunakan peralatan modern
                                    agar hasil cetakan tajam, rapi, dan memuaskan.
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                             <a
                                href={`https://wa.me/6285659055374?text=Halo%20HS%20Copy%20Center,%20saya%20mau%20tanya%20layanan%20${encodeURIComponent(service.title)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-1 shadow-lg shadow-green-200"
                             >
                                <MessageCircle size={20} />
                                Chat WhatsApp
                             </a>
                             <Link
                                to="/contact"
                                className="px-6 py-3 border-2 border-primary-500 text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center"
                             >
                                Lokasi Toko
                             </Link>
                        </div>
                     </div>
                 </div>
             </div>
          </div>

          {/* "Why Choose Us" / Value Proposition */}
          <section className="py-12 max-w-7xl mx-auto px-4">
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mengapa Memilih Layanan Ini?</h2>
                        <ul className="space-y-4">
                            {[
                                'Hasil rapi & berkualitas premium',
                                'Harga mahasiswa & bersahabat',
                                'Bisa konsultasi file sebelum cetak',
                                'Garansi revisi jika hasil tidak sesuai'
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <CheckCircle size={20} className="text-secondary-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1 bg-primary-50 p-6 rounded-xl border border-primary-100">
                        <h3 className="font-bold text-primary-800 mb-2">Butuh Penawaran Khusus?</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Untuk pemesanan dalam jumlah banyak (partai besar), kantor, atau instansi, kami menyediakan harga spesial.
                        </p>
                        <a href="https://wa.me/6285659055374" className="text-primary-600 font-bold text-sm hover:underline flex items-center gap-1">
                            Hubungi Admin Grosir <ArrowRight size={14} />
                        </a>
                    </div>
               </div>
          </section>

      </main>

      <Footer />
    </div>
  );
}
