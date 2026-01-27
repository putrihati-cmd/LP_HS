import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceCard from '../components/ServiceCard';
import { servicesApi } from '../api/services';

import { FALLBACK_SERVICES } from '../data/fallbackServices';

export default function ServicesPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await servicesApi.getAll();
        const allServices = (res.data && res.data.length > 0) ? res.data : FALLBACK_SERVICES;
        setServices(allServices);
      } catch (error) {
        console.error("Failed to fetch services, using fallback", error);
        setServices(FALLBACK_SERVICES);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = services;

    // Filter by Category Slug (Simple text match for now)
    if (slug) {
        const categoryName = slug.replace(/-/g, ' ').toLowerCase();
        result = result.filter(s =>
            s.title.toLowerCase().includes(categoryName) ||
            (s.description && s.description.toLowerCase().includes(categoryName))
        );
        document.title = `Layanan ${categoryName.replace(/\b\w/g, l => l.toUpperCase())} - HS Copy Center`;
    } else {
        document.title = 'Semua Layanan - HS Copy Center Purwokerto';
    }

    // Filter by Search Query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(s =>
            s.title.toLowerCase().includes(query) ||
            (s.description && s.description.toLowerCase().includes(query))
        );
    }

    setFilteredServices(result);
  }, [services, slug, searchQuery]);

  const categoryTitle = slug ? slug.replace(/-/g, ' ') : 'Semua Layanan';

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[
            { label: 'Layanan', path: '/layanan' },
            ...(slug ? [{ label: categoryTitle }] : [])
        ]} />

        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
                <Sidebar />
            </div>

            {/* Content */}
            <div className="flex-1">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 capitalize mb-2">
                        {categoryTitle}
                    </h1>
                    <p className="text-gray-500">
                        {slug
                            ? `Menampilkan layanan terkait "${categoryTitle}".`
                            : "Temukan berbagai solusi cetak dan jilid untuk kebutuhan Anda."}
                    </p>
                </header>

                {loading ? (
                     <div className="flex justify-center py-12">
                       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                     </div>
                ) : filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service, idx) => (
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
                ) : (
                    <div className="bg-white rounded-xl p-8 text-center border border-gray-100 shadow-sm">
                        <div className="mb-4 text-gray-300">
                            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Layanan Tidak Ditemukan</h3>
                        <p className="text-gray-500 mb-6">
                            Maaf, kami belum memiliki layanan untuk kategori ini atau pencarian Anda tidak cocok.
                        </p>
                        <a
                            href="https://wa.me/6285659055374"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-bold transition-colors"
                        >
                            Tanyakan ke Admin
                        </a>
                    </div>
                )}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
