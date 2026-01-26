'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Apa saja format file yang bisa dicetak?',
    answer:
      'Kami menerima semua format umum: PDF, Word (DOC/DOCX), PowerPoint (PPT/PPTX), Excel, JPG, dan PNG. Untuk hasil terbaik, kami sarankan kirim dalam format PDF.',
  },
  {
    question: 'Bagaimana cara pesan? Apakah bisa online?',
    answer:
      'Sangat mudah! Kirim file Anda via WhatsApp ke 0856-5905-5374, beritahu jumlah & spesifikasi (hitam-putih/warna, 1 atau 2 sisi). Kami konfirmasi harga dan waktu selesai. Anda tinggal datang ambil!',
  },
  {
    question: 'Berapa lama waktu pengerjaan?',
    answer:
      'Fotocopy/print biasa: 5-15 menit (tergantung antrian). Jilid skripsi: 30-60 menit. Print banner/brosur: 1-2 jam. Untuk order besar (500+ lembar), mohon order H-1 hari sebelumnya.',
  },
  {
    question: 'Apakah bisa ambil di hari yang sama?',
    answer:
      'Bisa! Untuk order di bawah 200 lembar, bisa diambil hari yang sama. Order skripsi sebelum jam 10 pagi, siap sore harinya. Butuh super express? Hubungi kami untuk prioritas cetak.',
  },
  {
    question: 'Bagaimana jika hasil cetakan tidak sesuai?',
    answer:
      'Kami berikan garansi 100%! Jika hasil cetakan buram, salah warna, atau ada kesalahan dari pihak kami, akan kami cetak ulang GRATIS. Kepuasan Anda adalah komitmen kami.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gray-50 py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-200 px-4 py-1.5 text-sm font-semibold text-gray-700">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Belum menemukan jawaban? Chat kami via WhatsApp!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50"
              >
                <span className="pr-4 font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
