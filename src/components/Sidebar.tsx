import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CategoriesSidebar() {
  const categories = [
    'Print Dokumen',
    'Fotocopy',
    'Print Kain',
    'Large Format',
    'Promo & Gift',
    'Foto',
    'Marketing Tools',
    'Printeron',
    'Coworking Space',
    'Signage',
    'Packaging',
    'UMKM',
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="bg-primary-500 text-white px-4 py-3 font-bold text-sm tracking-wide uppercase">
        Kategori
      </div>
      <ul className="divide-y divide-gray-100">
        {categories.map((cat, idx) => (
          <li key={idx}>
            <Link
              to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center justify-between px-4 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-500 transition-colors text-sm font-medium group"
            >
              {cat}
              <ChevronRight size={14} className="text-gray-300 group-hover:text-primary-500" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
