import React from 'react';
import PlaceholderPage from './PlaceholderPage';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { slug } = useParams();
  return <PlaceholderPage title={slug ? `Kategori: ${slug}` : "Semua Kategori"} description="Temukan berbagai produk dalam kategori ini." />;
};

export default Category;
