import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    bg: "bg-gradient-to-r from-primary to-primary-dark",
    content: (
      <div className="text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-2 uppercase tracking-wider">Decal Custom</h2>
        <p className="text-xl md:text-2xl font-light">Premium Quality UV Print</p>
        <button className="mt-6 bg-secondary text-primary-dark px-8 py-2 rounded font-bold hover:bg-white transition-colors uppercase text-sm">
          Shop Now
        </button>
      </div>
    )
  },
  {
    id: 2,
    bg: "bg-gradient-to-r from-secondary-dark to-secondary",
    content: (
      <div className="text-center text-primary-dark">
        <h2 className="text-3xl md:text-5xl font-bold mb-2 uppercase tracking-wider">Sameday Service</h2>
        <p className="text-xl md:text-2xl font-light">Order Now, Receive Today</p>
        <button className="mt-6 bg-primary text-white px-8 py-2 rounded font-bold hover:bg-primary-dark transition-colors uppercase text-sm">
          Order Now
        </button>
      </div>
    )
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* Aspect Ratio Container - Snapy uses approx 1920x400 or 500 */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out flex items-center justify-center ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            } ${banner.bg}`}
          >
            {banner.content}
          </div>
        ))}
      </div>

      {/* Controls */}
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
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === current ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
