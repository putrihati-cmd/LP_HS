import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: {
    label: string;
    path?: string;
  }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-primary-600 transition-colors">
            <Home size={14} className="mr-2" />
            Beranda
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRight size={14} className="text-gray-400 mx-1" />
              {item.path ? (
                <Link to={item.path} className="hover:text-primary-600 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 font-medium" aria-current="page">
                  {item.label}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
