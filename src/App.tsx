import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Promo from './pages/Promo';
import GoPrint from './pages/GoPrint';
import Branch from './pages/Branch';
import Article from './pages/Article';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import PlaceholderPage from './pages/PlaceholderPage';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
import Orders from './pages/admin/Orders';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/goprint" element={<GoPrint />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/artikel" element={<Article />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/product/:slug" element={<ProductDetail />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<PlaceholderPage title="Admin Settings" description="Konfigurasi sistem admin." />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
