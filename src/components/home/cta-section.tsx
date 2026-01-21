'use client';

import Link from 'next/link';
import { Upload, MessageCircle, FileText, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui';
import { getWhatsAppLink } from '@/lib/utils';

const supportedFormats = [
  { ext: 'PDF', color: 'bg-red-100 text-red-600' },
  { ext: 'DOC', color: 'bg-blue-100 text-blue-600' },
  { ext: 'DOCX', color: 'bg-blue-100 text-blue-600' },
  { ext: 'JPG', color: 'bg-green-100 text-green-600' },
  { ext: 'PNG', color: 'bg-purple-100 text-purple-600' },
  { ext: 'PPT', color: 'bg-orange-100 text-orange-600' },
];

export function CTAFinalSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Headline */}
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Siap Untuk Cetak?
          </h2>

          {/* Subtext */}
          <p className="mb-10 text-xl text-blue-100 sm:text-2xl">
            Upload file sekarang, dapatkan estimasi harga instan!
          </p>

          {/* Upload Area Visual */}
          <div className="mb-10 cursor-pointer rounded-3xl border-2 border-dashed border-white/30 bg-white/10 p-8 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">
                  Drag & Drop file di sini
                </p>
                <p className="text-blue-200">atau klik untuk memilih file</p>
              </div>
            </div>
          </div>

          {/* Supported Formats */}
          <div className="mb-10">
            <p className="mb-4 text-sm tracking-wider text-blue-200 uppercase">
              Format yang didukung:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {supportedFormats.map(format => (
                <span
                  key={format.ext}
                  className={`rounded-full px-4 py-2 text-sm font-bold ${format.color}`}
                >
                  {format.ext}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              href={getWhatsAppLink('Halo, saya mau upload file untuk diprint')}
              target="_blank"
            >
              <Button
                size="lg"
                className="h-16 min-w-[220px] rounded-full bg-white px-10 text-xl font-bold text-blue-600 shadow-xl transition-all hover:scale-105 hover:bg-gray-100"
              >
                <Upload className="mr-3 h-6 w-6" />
                Upload File
              </Button>
            </Link>

            <Link
              href={getWhatsAppLink('Halo, saya mau order')}
              target="_blank"
            >
              <Button
                size="lg"
                className="h-16 min-w-[220px] rounded-full border-2 border-white bg-transparent px-10 text-xl font-bold text-white transition-all hover:scale-105 hover:bg-white/10"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Order via WA
              </Button>
            </Link>
          </div>

          {/* Security Badge */}
          <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="text-sm text-white">
              File akan dihapus setelah selesai dicetak
            </span>
          </div>

          {/* Quick Info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-blue-200">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Proses 30 menit</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>Max 100MB/file</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
