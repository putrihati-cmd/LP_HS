import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { client } from '../api/client';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  active: number;
  order: number;
}

// Fallback categories if API fails
const fallbackCategories = [
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await client.api.fetch('/api/categories');
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setCategories(data.data.filter((c: Category) => c.active === 1));
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Use API categories if available, otherwise fallback
  const displayCategories = categories.length > 0
    ? categories.map(c => ({ name: c.name, slug: c.slug }))
    : fallbackCategories.map(cat => ({ name: cat, slug: cat.toLowerCase().replace(/\s+/g, '-') }));

  return (
    <div className="w-full">
      <div className="bg-primary text-white font-bold py-3 px-4 uppercase text-sm tracking-wide">
        Categories
      </div>
      <div className="bg-white border border-gray-200 border-t-0">
        {loading ? (
          <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {displayCategories.map((cat, index) => (
              <li key={index}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 group transition-colors"
                >
                  {cat.name}
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
