'use client';

import { Camera, ImageIcon } from 'lucide-react';

export function GallerySection() {
  // Placeholder images - replace with real photos later
  const placeholders = [
    { id: 1, label: 'Hasil Cetak Skripsi' },
    { id: 2, label: 'Mesin Fotocopy' },
    { id: 3, label: 'Jilid Hard Cover' },
    { id: 4, label: 'Suasana Toko' },
  ];

  return (
    <section id="gallery" className="bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-sm font-semibold text-gray-700">
            Galeri
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Hasil Kerja Kami
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            Kualitas cetak rapi dan konsisten
          </p>
        </div>

        {/* Gallery Grid - Placeholder */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {placeholders.map(item => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
            >
              {/* Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <Camera className="mb-2 h-8 w-8" />
                <span className="px-2 text-center text-xs">{item.label}</span>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 opacity-0 transition-opacity group-hover:opacity-100">
                <ImageIcon className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-6 text-center text-sm text-gray-500">
          📸 Foto akan segera diupdate
        </p>
      </div>
    </section>
  );
}
