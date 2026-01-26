import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id?: number;
  title: string;
  price: string;
  image?: string;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image, category }) => {
  // If ID is provided, link to detail page. Otherwise (for static/mock), link to # or slug
  const linkTarget = id ? `/product/${id}` : '#';
  
  return (
    <Link to={linkTarget} className="group bg-white flex flex-col items-center text-center h-full hover:shadow-lg transition-shadow duration-300 p-4 border border-transparent hover:border-gray-100 rounded-lg">
      <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-md bg-gray-50">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
            <span className="text-xs">No Image</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center w-full">
        <h3 className="text-primary font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary-dark transition-colors">
          {title}
        </h3>
        <div className="mt-auto">
          <p className="text-xs text-gray-500 mb-1">FROM {price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
