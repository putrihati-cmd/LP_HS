import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id?: number | string;
  image: string;
  title: string;
  price: string;
  category?: string;
  views?: number;
}

const ProductCard = ({ id, image, title, price, category, views }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group border border-gray-100">
      <Link to={id ? `/product/${id}` : '#'}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={image || 'https://via.placeholder.com/300'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {views && (
            <span className="absolute top-2 right-2 bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              {views.toLocaleString()} Views
            </span>
          )}
          {category && (
             <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              {category}
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="text-sm font-bold text-gray-700 group-hover:text-primary-500 line-clamp-2 mb-1 min-h-[40px]">
            {title}
          </h3>
          <p className="text-primary-600 font-bold text-sm">{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
