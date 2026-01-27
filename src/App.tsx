
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ServicesPage from './pages/ServicesPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Branch from './pages/Branch';
import Article from './pages/Article';
import Promo from './pages/Promo';
import GoPrint from './pages/GoPrint';
import SkripsiPage from './pages/SkripsiPage';
import ServiceDetail from './pages/ServiceDetail';
import PlaceholderPage from './pages/PlaceholderPage';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Services from './pages/admin/Services';
import AddService from './pages/admin/AddService';
import Categories from './pages/admin/Categories';
import Banners from './pages/admin/Banners';
import Promos from './pages/admin/Promos';
import Orders from './pages/admin/Orders';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/layanan" element={<ServicesPage />} />
        <Route path="/category/:slug" element={<ServicesPage />} />
        <Route path="/category" element={<ServicesPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/branch" element={<Branch />} />
        <Route path="/artikel" element={<Article />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/goprint" element={<GoPrint />} />
        <Route path="/skripsi" element={<SkripsiPage />} />
        <Route path="/layanan/:slug" element={<ServiceDetail />} />

        {/* Placeholders for Snapy menu items */}
        <Route path="/photobook" element={<PlaceholderPage title="Photobook" />} />
        <Route path="/franchise" element={<PlaceholderPage title="Franchise" />} />
        <Route path="/snapy-kain" element={<PlaceholderPage title="Snapy Kain" />} />
        <Route path="/print-shop" element={<PlaceholderPage title="Print Shop" />} />
        <Route path="/contact" element={<PlaceholderPage title="Hubungi Kami" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="services/new" element={<AddService />} />
          <Route path="categories" element={<Categories />} />
          <Route path="banners" element={<Banners />} />
          <Route path="promos" element={<Promos />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
