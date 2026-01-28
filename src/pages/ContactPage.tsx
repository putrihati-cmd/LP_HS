import React from 'react';
import { MapPin, Clock, Phone, Smartphone, Instagram, Mail, Navigation } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            HS Copy Center siap membantu kebutuhan cetak Anda.
            Silakan hubungi kami atau kunjungi outlet kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Description */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">HS Copy Center</h2>
              <p className="text-gray-600 leading-relaxed">
                HS Copy Center melayani kebutuhan fotocopy, percetakan, dan penjilidan untuk mahasiswa,
                pelajar, serta masyarakat umum di Purwokerto dan sekitarnya. Kami siap membantu dengan
                pelayanan yang cepat, rapi, dan terpercaya.
              </p>
            </div>

            {/* Address & Hours */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-primary-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Alamat Outlet Utama</h3>
                  <p className="text-gray-600 mb-2">
                    Gg. 2 No. 7, Tegalmulya, Ledug,<br />
                    Kecamatan Kembaran, Kabupaten Banyumas,<br />
                    Jawa Tengah 53182
                  </p>
                  <a
                    href="https://maps.app.goo.gl/6kcHMX3vB6cAYPct7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 hover:underline"
                  >
                    <Navigation size={16} />
                    Petunjuk Arah Google Maps
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Jam Operasional</h3>
                  <p className="text-gray-600">
                    Setiap Hari<br />
                    06.30 – 21.30 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 text-xl">Kontak Customer Service</h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/6285659055374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                >
                  <Smartphone size={24} />
                  <div>
                    <div className="font-bold">WhatsApp / Telepon</div>
                    <div>0856-5905-5374</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/hscopycenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                >
                  <Instagram size={24} />
                  <div>
                    <div className="font-bold">Instagram</div>
                    <div>@hscopycenter</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="h-full min-h-[400px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
             <iframe
               src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3956.3537233779836!2d109.263889!3d-7.4260383!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655716df731dbb%3A0xe9f007b8979db6b3!2sHS%20Copy%20Center!5e0!3m2!1sid!2sid!4v1706424578912!5m2!1sid!2sid"
               width="100%"
               height="100%"
               style={{ border: 0, minHeight: '500px' }}
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               title="HS Copy Center Location"
             ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
