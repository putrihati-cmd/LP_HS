
INSERT INTO categories (name, slug, "order", active) VALUES
('Print A3+', 'print-a3-plus', 1, 1),
('Sticker A3+', 'sticker-a3-plus', 2, 1),
('Banner', 'banner', 3, 1),
('X-Banner', 'x-banner', 4, 1),
('Y-Banner', 'y-banner', 5, 1),
('Photo', 'photo', 6, 1),
('Document', 'document', 7, 1),
('Merchandise', 'merchandise', 8, 1),
('Name Card', 'name-card', 9, 1),
('Poster', 'poster', 10, 1),
('Brochure', 'brochure', 11, 1),
('Flyer', 'flyer', 12, 1);

INSERT INTO banners (title, subtitle, image_url, link, button_text, active) VALUES
('Cetak Cepat Bisa Ditunggu', 'Layanan Prioritas untuk dokumen mendesak Anda.', '/images/banner-hero-1.jpg', '/services', 'Pesan Sekarang', 1),
('Promo Grand Opening', 'Diskon spesial untuk pelanggan baru.', '/images/banner-hero-2.jpg', '/promos', 'Lihat Promo', 1);

INSERT INTO promos (title, description, badge, valid_until, active) VALUES
('Diskon 50%', 'Diskon setengah harga untuk cetak kalender 2026.', 'HOT SALE', 1798675200000, 1),
('Gratis Ongkir', 'Gratis ongkir khusus area Purwokerto.', 'FREE SHIPPING', 1782777600000, 1);
