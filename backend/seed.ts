import Database from 'better-sqlite3';

const db = new Database('local.db');

// Seed default categories
const categories = [
  { name: "Print Lembaran", slug: "print-lembaran", order: 1 },
  { name: "Stationery", slug: "stationery", order: 2 },
  { name: "Print Kain", slug: "print-kain", order: 3 },
  { name: "Large Format", slug: "large-format", order: 4 },
  { name: "Promo and Gift", slug: "promo-and-gift", order: 5 },
  { name: "Foto", slug: "foto", order: 6 },
  { name: "Marketing Tools", slug: "marketing-tools", order: 7 },
  { name: "Printerior", slug: "printerior", order: 8 },
  { name: "Coworking Space", slug: "coworking-space", order: 9 },
  { name: "Signage", slug: "signage", order: 10 },
  { name: "Packaging", slug: "packaging", order: 11 },
  { name: "UMKM", slug: "umkm", order: 12 }
];

// Seed default banners
const banners = [
  {
    title: "Cetak Dokumen & Skripsi",
    subtitle: "Cepat, Rapi, & Berkualitas",
    buttonText: "Pesan Sekarang",
    link: "https://wa.me/6285659055374",
    active: 1
  },
  {
    title: "Cetak Banner Kilat",
    subtitle: "Bisa Ditunggu & Hasil Tajam",
    buttonText: "Order via WA",
    link: "https://wa.me/6285659055374",
    active: 1
  }
];

// Seed sample products
const products = [
  { name: "Cetak A4 HVS 70g", category: "Print Lembaran", price: 500, stock: 999, description: "Cetak dokumen A4 kertas HVS 70 gram" },
  { name: "Cetak A4 HVS 80g", category: "Print Lembaran", price: 600, stock: 999, description: "Cetak dokumen A4 kertas HVS 80 gram" },
  { name: "Print Foto 4R", category: "Foto", price: 5000, stock: 100, description: "Cetak foto ukuran 4R kertas glossy" },
  { name: "Print Foto 3R", category: "Foto", price: 3000, stock: 100, description: "Cetak foto ukuran 3R kertas glossy" },
  { name: "Cetak Banner A3", category: "Large Format", price: 25000, stock: 50, description: "Cetak banner ukuran A3" },
  { name: "Cetak Banner A2", category: "Large Format", price: 45000, stock: 50, description: "Cetak banner ukuran A2" },
  { name: "Pulpen Custom", category: "Stationery", price: 8000, stock: 200, description: "Pulpen dengan logo custom" },
  { name: "Kaos Sablon DTF", category: "Print Kain", price: 75000, stock: 30, description: "Kaos dengan sablon DTF full color" }
];

console.log("Seeding database...");

// Clear existing data (optional - comment out if you want to keep existing data)
db.exec("DELETE FROM categories");
db.exec("DELETE FROM banners");
db.exec("DELETE FROM products");

// Insert categories
const insertCategory = db.prepare(
  "INSERT INTO categories (name, slug, [order], active) VALUES (?, ?, ?, 1)"
);
for (const cat of categories) {
  insertCategory.run(cat.name, cat.slug, cat.order);
}
console.log(`Inserted ${categories.length} categories`);

// Insert banners
const insertBanner = db.prepare(
  "INSERT INTO banners (title, subtitle, button_text, link, active) VALUES (?, ?, ?, ?, ?)"
);
for (const banner of banners) {
  insertBanner.run(banner.title, banner.subtitle, banner.buttonText, banner.link, banner.active);
}
console.log(`Inserted ${banners.length} banners`);

// Insert products
const insertProduct = db.prepare(
  "INSERT INTO products (name, category, price, stock, description) VALUES (?, ?, ?, ?, ?)"
);
for (const product of products) {
  insertProduct.run(product.name, product.category, product.price, product.stock, product.description);
}
console.log(`Inserted ${products.length} products`);

console.log("Database seeding complete!");
