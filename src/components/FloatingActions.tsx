
import React from 'react';
import { Phone, MessageCircle, ChevronUp } from 'lucide-react';

export default function FloatingActions() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-20 right-4 flex flex-col gap-3 z-40 md:bottom-8 md:right-8">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="bg-orange-400 hover:bg-orange-500 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center w-12 h-12"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>

      {/* WhatsApp */}
      <a
        href="https://wa.me/6285659055374"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center w-12 h-12"
        aria-label="Chat WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

       {/* Phone Call (Hidden on mobile usually if WA is main, but Snapy has it) */}
       <a
        href="tel:085659055374"
        className="hidden md:flex bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-105 items-center justify-center w-12 h-12"
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
