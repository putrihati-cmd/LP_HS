
import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { eq, desc } from "drizzle-orm";
import * as schema from "./__generated__/db_schema";

type Bindings = {
  DB: D1Database;
  STORAGE: R2Bucket;
  ENVIRONMENT: string;
  CORS_ORIGIN: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Middleware
app.use('*', async (c, next) => {
  const corsMiddleware = cors({
    origin: c.env.CORS_ORIGIN || '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  });
  return corsMiddleware(c, next);
});

// Helper to get DB
const getDb = (c: any) => drizzle(c.env.DB, { schema });

// --- Products ---

app.get('/api/products', async (c) => {
  const db = getDb(c);
  const products = await db.select().from(schema.products).orderBy(desc(schema.products.createdAt));
  return c.json({ data: products });
});

app.get('/api/products/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const db = getDb(c);
  const product = await db.select().from(schema.products).where(eq(schema.products.id, id)).get();
  if (!product) return c.json({ error: 'Product not found' }, 404);
  return c.json({ data: product });
});

app.post('/api/products', async (c) => {
  const body = await c.req.json();
  const db = getDb(c);
  const result = await db.insert(schema.products).values({
    name: body.name,
    category: body.category,
    price: Number(body.price),
    stock: Number(body.stock),
    imageUrl: body.imageUrl,
    description: body.description
  }).returning();
  return c.json({ data: result[0] });
});

app.put('/api/products/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const db = getDb(c);
  const result = await db.update(schema.products).set({
    name: body.name,
    category: body.category,
    price: Number(body.price),
    stock: Number(body.stock),
    imageUrl: body.imageUrl,
    description: body.description
  }).where(eq(schema.products.id, id)).returning();
  return c.json({ data: result[0] });
});

app.delete('/api/products/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const db = getDb(c);
  await db.delete(schema.products).where(eq(schema.products.id, id));
  return c.json({ success: true });
});

// --- Orders ---

app.get('/api/orders', async (c) => {
  const db = getDb(c);
  const orders = await db.select().from(schema.orders).orderBy(desc(schema.orders.createdAt));
  return c.json({ data: orders });
});

app.post('/api/orders', async (c) => {
  const body = await c.req.json();
  // body: { userId, items: [{ productId, quantity, price }] }
  const db = getDb(c);

  let total = 0;
  for (const item of body.items) {
    total += item.price * item.quantity;
  }

  const order = await db.insert(schema.orders).values({
    userId: body.userId,
    total: total,
    status: 'pending'
  }).returning();

  const orderId = order[0].id;

  for (const item of body.items) {
    await db.insert(schema.orderItems).values({
      orderId: orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    });
  }

  return c.json({ data: order[0] });
});

// --- Categories ---

app.get('/api/categories', async (c) => {
  const db = getDb(c);
  const categories = await db.select().from(schema.categories).orderBy(schema.categories.order);
  return c.json({ data: categories });
});

app.post('/api/categories', async (c) => {
  const body = await c.req.json();
  const db = getDb(c);
  const result = await db.insert(schema.categories).values({
    name: body.name,
    slug: body.slug,
    icon: body.icon,
    active: body.active ?? 1,
    order: body.order ?? 0
  }).returning();
  return c.json({ data: result[0] });
});

app.put('/api/categories/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const db = getDb(c);
  const result = await db.update(schema.categories).set({
    name: body.name,
    slug: body.slug,
    icon: body.icon,
    active: body.active,
    order: body.order
  }).where(eq(schema.categories.id, id)).returning();
  return c.json({ data: result[0] });
});

app.delete('/api/categories/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const db = getDb(c);
  await db.delete(schema.categories).where(eq(schema.categories.id, id));
  return c.json({ success: true });
});

// --- Banners ---

app.get('/api/banners', async (c) => {
  const db = getDb(c);
  const banners = await db.select().from(schema.banners);
  return c.json({ data: banners });
});

app.post('/api/banners', async (c) => {
  const body = await c.req.json();
  const db = getDb(c);
  const result = await db.insert(schema.banners).values({
    title: body.title,
    subtitle: body.subtitle,
    imageUrl: body.imageUrl,
    link: body.link,
    buttonText: body.buttonText,
    active: body.active ?? 1
  }).returning();
  return c.json({ data: result[0] });
});

app.put('/api/banners/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const db = getDb(c);
  const result = await db.update(schema.banners).set({
    title: body.title,
    subtitle: body.subtitle,
    imageUrl: body.imageUrl,
    link: body.link,
    buttonText: body.buttonText,
    active: body.active
  }).where(eq(schema.banners.id, id)).returning();
  return c.json({ data: result[0] });
});

app.delete('/api/banners/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const db = getDb(c);
  await db.delete(schema.banners).where(eq(schema.banners.id, id));
  return c.json({ success: true });
});

// --- Promos ---

app.get('/api/promos', async (c) => {
  const db = getDb(c);
  const promos = await db.select().from(schema.promos);
  return c.json({ data: promos });
});

app.post('/api/promos', async (c) => {
  const body = await c.req.json();
  const db = getDb(c);
  const result = await db.insert(schema.promos).values({
    title: body.title,
    description: body.description,
    badge: body.badge,
    validUntil: body.validUntil,
    active: body.active ?? 1
  }).returning();
  return c.json({ data: result[0] });
});

app.put('/api/promos/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const db = getDb(c);
  const result = await db.update(schema.promos).set({
    title: body.title,
    description: body.description,
    badge: body.badge,
    validUntil: body.validUntil,
    active: body.active
  }).where(eq(schema.promos.id, id)).returning();
  return c.json({ data: result[0] });
});

app.delete('/api/promos/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const db = getDb(c);
  await db.delete(schema.promos).where(eq(schema.promos.id, id));
  return c.json({ success: true });
});

// Health check
app.get('/api/health', (c) => c.json({ status: 'ok', environment: c.env.ENVIRONMENT }));

export default app;
