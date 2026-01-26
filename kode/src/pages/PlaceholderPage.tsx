import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-lg w-full">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold">
            🚧
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-500 mb-8">
            {description || "Halaman ini sedang dalam tahap pengembangan. Silakan kembali lagi nanti."}
          </p>
          <Link to="/" className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors inline-block">
            Kembali ke Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
