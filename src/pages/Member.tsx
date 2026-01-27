
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import BottomNav from '../components/BottomNav';
import { CheckCircle, Star, CreditCard, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Member() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <CreditCard size={400} />
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center md:text-left">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Gabung Member <span className="text-secondary-400">HS Copy Center</span>
                <br />
                Makin Hemat, Makin Untung!
              </h1>
              <p className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed">
                Nikmati harga spesial khusus mahasiswa, prioritas antrian, dan promo eksklusif setiap bulannya hanya dengan menjadi member. Gratis pendaftaran!
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Daftar Member Sekarang <ChevronRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-full backdrop-blur-sm transition-colors inline-flex items-center justify-center"
                >
                  Tanya CS via WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Kenapa Harus Jadi Member?
              </h2>
              <p className="text-gray-500">
                Keuntungan eksklusif yang tidak didapatkan pelanggan biasa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Harga Mahasiswa</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dapatkan potongan harga khusus untuk print & fotocopy dokumen. Sangat cocok untuk tugas kuliah dan skripsi.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Prioritas Antrian</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dokumen mepet deadline? Member mendapatkan prioritas pengerjaan lebih cepat dibandingkan reguler.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Promo Bulanan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Akses ke promo flash sale dan voucher diskon khusus yang hanya dibagikan kepada member aktif.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between shadow-2xl">
              <div className="mb-8 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Siap Bergabung?
                </h2>
                <p className="text-gray-300 text-lg">
                  Pendaftaran gratis hanya butuh waktu 1 menit!
                </p>
              </div>
              <Link
                to="/register"
                className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 inline-block"
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
      <BottomNav />
    </div>
  );
}
