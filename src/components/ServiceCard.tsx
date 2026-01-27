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
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={image || 'https://via.placeholder.com/300?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Link
            to={`/contact`}
            className="text-white font-bold text-sm flex items-center gap-2 hover:underline"
          >
            Tanya CS <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-500 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">
          {description || 'Layanan berkualitas dari HS Copy Center Purwokerto.'}
        </p>
        <Link
          to="/contact"
          className="w-full py-2 border border-secondary-500 text-secondary-600 font-bold rounded-lg text-center text-sm hover:bg-secondary-50 transition-colors"
        >
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
