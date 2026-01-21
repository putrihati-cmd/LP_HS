import Link from 'next/link';
import { Upload, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-orange-400 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Siap Cetak Dokumen Anda?
          </h2>
          <p className="mb-10 text-xl text-blue-100">
            Upload file sekarang dan ambil di toko saat sudah siap. Tanpa antre,
            tanpa ribet.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={getWhatsAppLink(
                'Halo, saya ingin upload file untuk diprint.'
              )}
              target="_blank"
            >
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Upload className="h-5 w-5" />
                Upload File Sekarang
              </Button>
            </Link>
            <Link href="tel:+6285643765889">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white text-white hover:bg-white/10 sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                Hubungi Kami
              </Button>
            </Link>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-blue-100">
            <MapPin className="h-5 w-5" />
            <span>
              Jl. Raya Dukuhwaluh No. 123, Purwokerto • Dekat UMP & UNSOED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
