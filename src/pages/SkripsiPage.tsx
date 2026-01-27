import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingPackages from '../components/PricingPackages';
import FeatureBar from '../components/FeatureBar';

export default function SkripsiPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      {/* Mini Hero */}
      <div className="bg-primary-600 py-12 text-center text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">PAKET SKRIPSI & TESIS</h1>
        <p className="text-primary-100 max-w-2xl mx-auto px-4">
          Solusi cetak cepat, rapi, dan terpercaya untuk kelulusan Anda. Pilih paket sesuai kebutuhan deadline.
        </p>
      </div>

      <FeatureBar />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <PricingPackages />

        {/* Additional Info Section */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">F.A.Q (Tanya Jawab)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-2 text-primary-600">Berapa lama proses pengerjaan?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Untuk paket Reguler, estimasi 2-3 hari kerja. Paket Express bisa selesai dalam waktu kurang dari 24 jam tergantung antrian. Kami sarankan booking slot terlebih dahulu via WhatsApp.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-primary-600">File apa yang harus disiapkan?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kami menerima file dalam format PDF Siap Cetak untuk hasil terbaik. Pastikan margin dan nomor halaman sudah sesuai. Jika belum yakin, ambil Paket Express untuk mendapatkan bantuan pengecekan format (Free Konsultasi).
              </p>
            </div>
             <div>
              <h3 className="font-bold text-lg mb-2 text-primary-600">Apakah ada garansi?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ya! Kami memberikan garansi revisi jilid jika terjadi kesalahan dari pihak kami (misal: lem kurang kuat atau cover miring). Kepuasan Anda adalah prioritas kami.
              </p>
            </div>
             <div>
              <h3 className="font-bold text-lg mb-2 text-primary-600">Lokasi tokonya dimana?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kami berlokasi di Jl. HR. Bunyamin No. P2, Purwokerto Utara (Deretan kampus UNSOED).
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
