import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '../api/client';

interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  link?: string;
  buttonText?: string;
  active: number;
}

// Fallback banners if API fails or no banners in DB
const fallbackBanners = [
  {
    id: 1,
    title: "Cetak Dokumen & Skripsi",
    subtitle: "Cepat, Rapi, & Berkualitas",
    buttonText: "Pesan Sekarang",
    bgClass: "bg-gradient-to-r from-primary to-primary-dark",
    textClass: "text-white"
  },
  {
    id: 2,
    title: "Cetak Banner Kilat",
    subtitle: "Bisa Ditunggu & Hasil Tajam",
    buttonText: "Order via WA",
    bgClass: "bg-gradient-to-r from-secondary-dark to-secondary",
    textClass: "text-primary-dark"
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await client.api.fetch('/api/banners');
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setBanners(data.data.filter((b: Banner) => b.active === 1));
        }
      } catch (error) {
        console.error('Failed to fetch banners', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // Use API banners if available, otherwise fallback
  const displayBanners = banners.length > 0 ? banners : fallbackBanners;

  useEffect(() => {
    if (displayBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayBanners.length]);

  const next = () => setCurrent((prev) => (prev + 1) % displayBanners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + displayBanners.length) % displayBanners.length);

  // Color palette for dynamic banners
  const colorPalettes = [
    { bgClass: "bg-gradient-to-r from-primary to-primary-dark", textClass: "text-white", buttonClass: "bg-secondary text-primary-dark hover:bg-white" },
    { bgClass: "bg-gradient-to-r from-secondary-dark to-secondary", textClass: "text-primary-dark", buttonClass: "bg-primary text-white hover:bg-primary-dark" },
    { bgClass: "bg-gradient-to-r from-purple-600 to-purple-800", textClass: "text-white", buttonClass: "bg-yellow-400 text-purple-900 hover:bg-yellow-300" },
    { bgClass: "bg-gradient-to-r from-green-500 to-green-700", textClass: "text-white", buttonClass: "bg-white text-green-700 hover:bg-gray-100" },
  ];

  const renderBanner = (banner: any, index: number) => {
    const isApiBanner = banners.length > 0;
    const palette = colorPalettes[index % colorPalettes.length];

    // For API banners
    if (isApiBanner) {
      const hasBgImage = banner.imageUrl && banner.imageUrl.length > 0;
      return (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          } ${hasBgImage ? '' : palette.bgClass}`}
          style={hasBgImage ? { backgroundImage: `url(${banner.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
          <div className={`text-center ${hasBgImage ? 'bg-black/50 p-8 rounded-lg' : ''} ${palette.textClass}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-2 uppercase tracking-wider">{banner.title}</h2>
            {banner.subtitle && <p className="text-xl md:text-2xl font-light">{banner.subtitle}</p>}
            {banner.link && (
              <a
                href={banner.link}
                className={`mt-6 inline-block px-8 py-2 rounded font-bold transition-colors uppercase text-sm ${palette.buttonClass}`}
              >
                {banner.buttonText || 'Order Now'}
              </a>
            )}
          </div>
        </div>
      );
    }

    // For fallback banners
    return (
      <div
        key={banner.id}
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${
          index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
        } ${banner.bgClass}`}
      >
        <div className={`text-center ${banner.textClass}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-2 uppercase tracking-wider">{banner.title}</h2>
          <p className="text-xl md:text-2xl font-light">{banner.subtitle}</p>
          <button className={`mt-6 px-8 py-2 rounded font-bold transition-colors uppercase text-sm ${
            index === 0 ? 'bg-secondary text-primary-dark hover:bg-white' : 'bg-primary text-white hover:bg-primary-dark'
          }`}>
            {banner.buttonText}
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="relative w-full h-[300px] md:h-[400px] bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Loading banners...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      <div className="relative w-full h-[300px] md:h-[400px]">
        {displayBanners.map((banner, index) => renderBanner(banner, index))}
      </div>

      {/* Controls - only show if more than 1 banner */}
      {displayBanners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {displayBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
