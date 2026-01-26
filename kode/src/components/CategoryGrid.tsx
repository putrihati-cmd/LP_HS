import React from 'react';
import { Printer, Image, PenTool, Box, Coffee, Shirt, Sticker, FileText } from 'lucide-react';

const categories = [
  { name: 'Digital Print', icon: Printer, color: 'bg-blue-100 text-blue-600' },
  { name: 'Print Kain', icon: Shirt, color: 'bg-pink-100 text-pink-600' },
  { name: 'Merchandise', icon: Coffee, color: 'bg-orange-100 text-orange-600' },
  { name: 'Stiker & Label', icon: Sticker, color: 'bg-green-100 text-green-600' },
  { name: 'Banner', icon: Image, color: 'bg-purple-100 text-purple-600' },
  { name: 'Packaging', icon: Box, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Desain', icon: PenTool, color: 'bg-red-100 text-red-600' },
  { name: 'Dokumen', icon: FileText, color: 'bg-cyan-100 text-cyan-600' },
];

const CategoryGrid = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Kategori Layanan</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110 group-hover:shadow-lg`}>
                <cat.icon size={28} />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
