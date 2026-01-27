
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Tag, User, MapPin } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <Link to="/" className={`flex flex-1 flex-col items-center gap-1 p-1 ${isActive('/') ? 'text-primary-500' : 'text-gray-400'}`}>
          <Home size={20} />
          <span className="text-[10px] font-medium">Beranda</span>
        </Link>
        <Link to="/layanan" className={`flex flex-1 flex-col items-center gap-1 p-1 ${isActive('/layanan') ? 'text-primary-500' : 'text-gray-400'}`}>
          <Grid size={20} />
          <span className="text-[10px] font-medium">Layanan</span>
        </Link>

        <Link to="/promo" className={`flex flex-1 flex-col items-center gap-1 p-1 ${isActive('/promo') ? 'text-primary-500' : 'text-gray-400'}`}>
          <Tag size={20} />
          <span className="text-[10px] font-medium">Promo</span>
        </Link>
        <Link to="/member" className={`flex flex-1 flex-col items-center gap-1 p-1 ${isActive('/member') ? 'text-primary-500' : 'text-gray-400'}`}>
          <User size={20} />
          <span className="text-[10px] font-medium">Member</span>
        </Link>
      </div>
    </div>
  );
}
