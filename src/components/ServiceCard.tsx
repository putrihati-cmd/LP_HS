import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id?: number;
  title: string;
  description?: string;
  image?: string;
  slug?: string;
}

const ServiceCard = ({ id, title, description, image, slug }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-square md:aspect-video bg-gray-100 overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/300?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Hover Overlay only on Desktop */}
        <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end p-4">
          <Link
            to={slug ? `/layanan/${slug}` : '/contact'}
            className="text-white font-bold text-sm flex items-center gap-2 hover:underline"
          >
            Lihat Detail <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 md:p-5 flex-1 flex flex-col">
        <Link to={slug ? `/layanan/${slug}` : '/contact'}>
            <h3 className="text-xs md:text-lg font-bold text-gray-800 group-hover:text-primary-500 mb-1 md:mb-2 cursor-pointer transition-colors line-clamp-2 md:line-clamp-none min-h-[2.5em] md:min-h-0">
            {title}
            </h3>
        </Link>

        {/* Description only visible on desktop */}
        <p className="hidden md:block text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
          {description || 'Layanan berkualitas dari HS Copy Center Purwokerto.'}
        </p>

        {/* Small Button on Mobile, Full on Desktop */}
        <Link
          to={slug ? `/layanan/${slug}` : '/contact'}
          className="mt-auto w-full py-1.5 md:py-2 border border-secondary-500 text-secondary-600 font-bold rounded md:rounded-lg text-center text-[10px] md:text-sm hover:bg-secondary-50 transition-colors"
        >
          <span className="md:hidden">Pesan</span>
          <span className="hidden md:inline">Lihat Detail</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
