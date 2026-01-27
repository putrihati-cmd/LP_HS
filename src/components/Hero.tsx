import React from 'react';

// Using Hardcoded Image from copas for now (matching the clone request)
const BANNER_IMG = 'https://public.youware.com/users-website-assets/prod/9807b15c-f88c-4ee9-a2d5-04d7d8001cdf/d2f00ca2278b478f8972ec741afa5327.jpg';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-secondary-500 text-white text-sm font-medium rounded-full mb-4 shadow-sm">
              HOT PRODUCT
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              CETAK CUSTOM<br />
              <span className="text-secondary-300">BERKUALITAS</span>
            </h1>
            <p className="text-white/90 mb-6 max-w-md mx-auto md:mx-0 text-lg">
              Solusi cetak terbaik untuk kebutuhan bisnis Anda. Dari dokumen hingga merchandise custom dengan hasil tajam.
            </p>
            <button className="px-8 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-bold rounded-lg transition-colors shadow-lg transform hover:-translate-y-1">
              PESAN SEKARANG
            </button>
          </div>
          <div className="flex-1 relative">
            <div className="relative z-10">
              <img
                src={BANNER_IMG}
                alt="Digital Printing"
                className="w-full max-w-md mx-auto rounded-xl shadow-2xl border-4 border-white/20"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-secondary-500/30 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>
      </div>
      {/* Slider Dots */}
      <div className="flex justify-center gap-2 pb-6">
        <span className="w-3 h-3 bg-white rounded-full cursor-pointer"></span>
        <span className="w-3 h-3 bg-white/50 rounded-full cursor-pointer hover:bg-white/80 transition-colors"></span>
        <span className="w-3 h-3 bg-white/50 rounded-full cursor-pointer hover:bg-white/80 transition-colors"></span>
      </div>
    </section>
  );
}
