'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';

const testimonials = [
  {
    name: 'Rina Permata',
    role: 'Mahasiswa UNSOED',
    content:
      'Print skripsi di sini cepat banget! Pagi order, siang sudah ready. Kualitas bagus dan harganya terjangkau untuk mahasiswa.',
    rating: 5,
    avatar: 'RP',
  },
  {
    name: 'Budi Santoso',
    role: 'Pemilik Toko',
    content:
      'Langganan print nota dan brosur di HS Copy Center. Pelayanan ramah, hasil memuaskan, dan bisa COD ke toko saya.',
    rating: 5,
    avatar: 'BS',
  },
  {
    name: 'Dewi Anggita',
    role: 'Event Organizer',
    content:
      'Untuk event besar selalu pesan di sini. Banner, poster, undangan semua bisa. Tim-nya profesional dan on-time.',
    rating: 5,
    avatar: 'DA',
  },
  {
    name: 'Dr. Hendra Wijaya',
    role: 'Dosen UMP',
    content:
      'Jilid hardcover untuk jurnal dan buku ajar selalu di sini. Hasil rapi, binding kuat, dan harga kompetitif.',
    rating: 5,
    avatar: 'HW',
  },
  {
    name: 'Sari Mulyani',
    role: 'Wedding Planner',
    content:
      'Cetak undangan pernikahan clients saya di sini. Pilihan kertas lengkap, bisa custom design, hasilnya premium.',
    rating: 5,
    avatar: 'SM',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex(i => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    setCurrentIndex(i => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
            Testimoni
          </span>
          <h2 className="mt-2 mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Ribuan pelanggan puas dengan layanan kami. Ini adalah beberapa
            cerita mereka.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto w-full max-w-4xl">
          <Card className="shadow-lg">
            <CardContent className="p-8 sm:p-12">
              {/* Quote Icon */}
              <Quote className="mb-8 h-12 w-12 text-blue-100" />

              {/* Content */}
              <p className="mb-8 text-xl leading-relaxed text-gray-700">
                &ldquo;{testimonials[currentIndex].content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {testimonials[currentIndex].avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-gray-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === currentIndex ? 'w-6 bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="rounded-full bg-gray-100 p-3 transition-colors hover:bg-gray-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
