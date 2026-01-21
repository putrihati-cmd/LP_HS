'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    occupation: 'Mahasiswa UMP',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    text: 'Pelayanan super cepat! Skripsi saya selesai dijilid dalam 1 jam. Harga juga bersahabat untuk kantong mahasiswa.',
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    occupation: 'Guru SD',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    text: 'Kualitas print warna sangat bagus untuk bahan ajar. Sudah jadi langganan tetap lebih dari 2 tahun.',
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    occupation: 'Karyawan Swasta',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    text: 'Upload file via WhatsApp, tinggal ambil. Praktis banget untuk yang sibuk kerja. Recommended!',
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    occupation: 'Mahasiswa UNSOED',
    avatar: '/images/avatar-4.jpg',
    rating: 5,
    text: 'Jilid hard cover skripsi hasilnya keren banget. Dosen pembimbing juga memuji kualitasnya.',
  },
  {
    id: 5,
    name: 'Rudi Hermawan',
    occupation: 'Pengusaha UMKM',
    avatar: '/images/avatar-5.jpg',
    rating: 5,
    text: 'Cetak brosur dan kartu nama untuk usaha saya di sini. Hasilnya profesional, harga kompetitif.',
  },
];

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  const colors = [
    'bg-blue-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
  ];
  const colorIndex = name.length % colors.length;

  return (
    <div
      className={`flex h-16 w-16 items-center justify-center rounded-full ${colors[colorIndex]} text-xl font-bold text-white`}
    >
      {initials}
    </div>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-sm font-bold tracking-wider text-blue-600 uppercase">
            Testimoni
          </span>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Ratusan pelanggan puas dengan layanan kami. Berikut beberapa
            testimoni dari mereka.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative mx-auto max-w-4xl">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 z-10 -translate-x-1/2">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
              <Quote className="h-8 w-8" />
            </div>
          </div>

          {/* Main Card */}
          <div className="rounded-3xl bg-gray-50 p-8 pt-16 text-center shadow-lg sm:p-12 sm:pt-16">
            {/* Avatar */}
            <div className="mb-6 flex justify-center">
              <AvatarPlaceholder name={currentTestimonial.name} />
            </div>

            {/* Stars */}
            <div className="mb-6 flex justify-center gap-1">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-6 text-xl leading-relaxed text-gray-700 sm:text-2xl">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Name & Occupation */}
            <div>
              <p className="text-lg font-bold text-gray-900">
                {currentTestimonial.name}
              </p>
              <p className="text-sm text-gray-500">
                {currentTestimonial.occupation}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 flex h-12 w-12 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all hover:bg-blue-600 hover:text-white sm:-translate-x-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 flex h-12 w-12 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all hover:bg-blue-600 hover:text-white sm:translate-x-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Navigation Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
