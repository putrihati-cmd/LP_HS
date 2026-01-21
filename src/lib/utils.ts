import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `HS${year}${random}`;
}

export const SERVICES = {
  fotocopy: { name: 'Fotocopy B/W', price: 150, unit: 'lembar' },
  printBw: { name: 'Print B/W', price: 200, unit: 'lembar' },
  printColor: { name: 'Print Color', price: 2000, unit: 'lembar' },
  bindingSoft: { name: 'Binding Soft Cover', price: 5000, unit: 'buku' },
  bindingHard: { name: 'Binding Hard Cover', price: 15000, unit: 'buku' },
  laminatingA4: { name: 'Laminating A4', price: 5000, unit: 'lembar' },
  laminatingA3: { name: 'Laminating A3', price: 10000, unit: 'lembar' },
} as const;

export const PAPER_SIZES = ['A4', 'A3', 'F4', 'Letter'] as const;

export const ORDER_STATUS = {
  PENDING: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-800' },
  UPLOADED: { label: 'File Diterima', color: 'bg-blue-100 text-blue-800' },
  PROCESSING: { label: 'Diproses', color: 'bg-purple-100 text-purple-800' },
  READY: { label: 'Siap Diambil', color: 'bg-green-100 text-green-800' },
  COMPLETED: { label: 'Selesai', color: 'bg-gray-100 text-gray-800' },
  CANCELLED: { label: 'Dibatalkan', color: 'bg-red-100 text-red-800' },
} as const;

export function getWhatsAppLink(message: string): string {
  const phone = '6285643765889';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
