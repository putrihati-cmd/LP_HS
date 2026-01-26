import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  "Print Lembaran",
  "Stationery",
  "Print Kain",
  "Large Format",
  "Promo and Gift",
  "Foto",
  "Marketing Tools",
  "Printerior",
  "Coworking Space",
  "Signage",
  "Packaging",
  "UMKM"
];

const Sidebar = () => {
  return (
    <div className="w-full">
      <div className="bg-primary text-white font-bold py-3 px-4 uppercase text-sm tracking-wide">
        Categories
      </div>
      <div className="bg-white border border-gray-200 border-t-0">
        <ul className="divide-y divide-gray-100">
          {categories.map((cat, index) => (
            <li key={index}>
              <Link 
                to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`} 
                className="block px-4 py-3 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 flex items-center justify-between group transition-colors"
              >
                {cat}
                <ChevronRight size={14} className="text-gray-300 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
