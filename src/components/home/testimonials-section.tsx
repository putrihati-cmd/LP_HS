'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Orienta Erza Prasetya',
    rating: 5,
    text: 'HS Copy Center. Salah satu fotokopian di Purwokerto, lokasinya tepat ada di belakang kampus utama UMP. Disini menyediakan jasa print dan foto copy, bahkan untuk print sudah bisa kirim file melalui whatsapp. Fotokopian buka setiap hari, dan sudah bisa bayar menggunakan qris.',
  },
  {
    name: 'Tholib Adil Maruf',
    rating: 5,
    text: 'Pelayanan sat-set, yang enak bisa kirim tugas via WA, datang tinggal ambil.',
  },
  {
    name: 'Azhriel Nur Rofi Ramadhani',
    rating: 5,
    text: 'Tempat bersih, pelayanan ramah dan fast respon.',
  },
  {
    name: 'Valentinalaura Belasalfana',
    rating: 5,
    text: 'pelayanan nyaaa ramah, harga nyaa murah, bisa di anterrr (do) cepettttt ga lamaaaa, mas mas nya baikkkkk, lengkappp jugaaa fotokopiannya.',
  },
  {
    name: 'Ratna Wulandari',
    rating: 5,
    text: 'Layanan cepat & ATK Lengkap. Timur pintu belakang UMP.',
  },
  {
    name: 'askara oriented',
    rating: 5,
    text: 'mantap pelayanannya, fast respon, gercep mantap jos gandos, jan ragu woi kalian klo mau fotocopy print dll kesini aja murah lagi.',
  },
  {
    name: 'Aflaharaa',
    rating: 5,
    text: 'hasil nya bagus dan rapi, sesuai ekspetasi lah ya. cepet jugaaa. bahkan kemaren kita salah print terus minta di print in sama mas nya lagi malah gada tambahan bayar🫰🫰🫰 love bgt pokoknyaaa.',
  },
  {
    name: 'Rihma Audiasyuri azzahra',
    rating: 5,
    text: 'saya berlangganan disini karna hasil nya entah itu print, jilid dll sangat rapih bahkan sat menjilid menggunakan ukuran supaya rapih jadi di jamin hasil nya sangat memuaskan.',
  },
  {
    name: 'Adika Kumara',
    rating: 5,
    text: 'Pelayanan cepat, harganya juga murah meriah dan penjual ramah top markotop deh 😉👍🏼👍🏼.',
  },
  {
    name: 'Halwa Chumayda',
    rating: 5,
    text: 'Tempat fotokopi yang lengkap dan terpercaya. Kualitas hasilnya memuaskan, prosesnya cepat, dan pelayanannya profesional👍🏻.',
  },
  {
    name: 'Najla',
    rating: 5,
    text: 'mas nya baik banget, asik juga pelayannannya muantep banget fast juga worth banget disini!',
  },
  {
    name: 'Rafi Fadly',
    rating: 5,
    text: 'pengalaman saya fotocopy di tempat ini cukup baik, rapih, cepat dan ramah.',
  },
  {
    name: 'Tasya Pesik',
    rating: 5,
    text: 'Tempat ini sangat murah dan rekomendasi untuk mahasiswa terkhusus untuk mahasiswa akhir, pelayanan juga sangat ramah ❤️, jangan sungkan untuk disini. Ini real.',
  },
  {
    name: 'Nur Hanifatus S',
    rating: 5,
    text: 'Gokill, fc paling murah ini, pelayanannya ramah dan sabar menghadapi customer. Bintang 5 ples.',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages);
  };

  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section id="testimonials" className="bg-gray-50 py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-semibold text-yellow-700">
            ⭐ Rating 5.0 di Google Maps
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Review asli dari Google Maps - bukan testimoni palsu!
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentTestimonials.map((testimonial, idx) => (
              <div
                key={`${currentIndex}-${idx}`}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                {/* Quote Icon */}
                <Quote className="mb-4 h-8 w-8 text-gray-200" />

                {/* Stars */}
                <div className="mb-3 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="mb-4 line-clamp-4 text-sm text-gray-600">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">via Google Maps</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prevSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === currentIndex ? 'w-6 bg-gray-900' : 'bg-gray-300'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all hover:bg-gray-50"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
