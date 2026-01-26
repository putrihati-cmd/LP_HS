import React, { useEffect, useState, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, User } from 'lucide-react';
import { client } from '../api/client';

const AdminLayout = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const authContainerRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await client.auth.getSession();
      setUser(data?.user);
      setLoading(false);
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (!loading && !user && authContainerRef.current) {
      client.auth.renderAuthUI(authContainerRef.current, {
        onLogin: (u) => setUser(u),
      });
    }
  }, [loading, user]);

  const handleLogout = async () => {
    await client.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
          <div ref={authContainerRef}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-bold text-white">
            A
          </div>
          <span className="font-bold text-lg tracking-wide">Admin Panel</span>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          <Link 
            to="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin') ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/products') ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link 
            to="/admin/orders" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/orders') ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <ShoppingCart size={20} />
            <span>Orders</span>
          </Link>
          <Link 
            to="/admin/settings" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/admin/settings') ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8">
          <h2 className="font-bold text-gray-700 text-xl capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span>{user.email}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
