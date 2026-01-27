import { Hono } from "hono";
import type { Client } from "@sdk/server-types";
import { tables } from "@generated";
import { eq, desc } from "drizzle-orm";

export async function createApp(
  edgespark: Client<typeof tables>
): Promise<Hono> {
  const app = new Hono();

  // --- Products ---

  // Get all products
  app.get('/api/products', async (c) => {
    const products = await edgespark.db.select().from(tables.products).orderBy(desc(tables.products.createdAt));
    return c.json({ data: products });
  });

  // Get product by ID
  app.get('/api/products/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const product = await edgespark.db.select().from(tables.products).where(eq(tables.products.id, id)).get();
    if (!product) return c.json({ error: 'Product not found' }, 404);
    return c.json({ data: product });
  });

  // Create product (Admin)
  app.post('/api/products', async (c) => {
    // In a real app, check for admin role here
    const body = await c.req.json();
    const result = await edgespark.db.insert(tables.products).values({
      name: body.name,
      category: body.category,
      price: Number(body.price),
      stock: Number(body.stock),
      imageUrl: body.imageUrl,
      description: body.description
    }).returning();
    return c.json({ data: result[0] });
  });

  // Update product
  app.put('/api/products/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const result = await edgespark.db.update(tables.products).set({
      name: body.name,
      category: body.category,
      price: Number(body.price),
      stock: Number(body.stock),
      imageUrl: body.imageUrl,
      description: body.description
    }).where(eq(tables.products.id, id)).returning();
    return c.json({ data: result[0] });
  });

  // Delete product
  app.delete('/api/products/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await edgespark.db.delete(tables.products).where(eq(tables.products.id, id));
    return c.json({ success: true });
  });

  // --- Orders ---

  // Get all orders (Admin)
  app.get('/api/orders', async (c) => {
    const orders = await edgespark.db.select().from(tables.orders).orderBy(desc(tables.orders.createdAt));
    return c.json({ data: orders });
  });

  // Create order
  app.post('/api/orders', async (c) => {
    const body = await c.req.json();
    // body: { userId, items: [{ productId, quantity, price }] }

    // Calculate total
    let total = 0;
    for (const item of body.items) {
      total += item.price * item.quantity;
    }

    const order = await edgespark.db.insert(tables.orders).values({
      userId: body.userId,
      total: total,
      status: 'pending'
    }).returning();

    const orderId = order[0].id;

    // Insert items
    for (const item of body.items) {
      await edgespark.db.insert(tables.orderItems).values({
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
    const categories = await edgespark.db.select().from(tables.categories).orderBy(tables.categories.order);
    return c.json({ data: categories });
  });

  app.post('/api/categories', async (c) => {
    const body = await c.req.json();
    const result = await edgespark.db.insert(tables.categories).values({
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
    const result = await edgespark.db.update(tables.categories).set({
      name: body.name,
      slug: body.slug,
      icon: body.icon,
      active: body.active,
      order: body.order
    }).where(eq(tables.categories.id, id)).returning();
    return c.json({ data: result[0] });
  });

  app.delete('/api/categories/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await edgespark.db.delete(tables.categories).where(eq(tables.categories.id, id));
    return c.json({ success: true });
  });

  // --- Banners ---

  app.get('/api/banners', async (c) => {
    const banners = await edgespark.db.select().from(tables.banners);
    return c.json({ data: banners });
  });

  app.post('/api/banners', async (c) => {
    const body = await c.req.json();
    const result = await edgespark.db.insert(tables.banners).values({
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
    const result = await edgespark.db.update(tables.banners).set({
      title: body.title,
      subtitle: body.subtitle,
      imageUrl: body.imageUrl,
      link: body.link,
      buttonText: body.buttonText,
      active: body.active
    }).where(eq(tables.banners.id, id)).returning();
    return c.json({ data: result[0] });
  });

  app.delete('/api/banners/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await edgespark.db.delete(tables.banners).where(eq(tables.banners.id, id));
    return c.json({ success: true });
  });

  // --- Promos ---

  app.get('/api/promos', async (c) => {
    const promos = await edgespark.db.select().from(tables.promos);
    return c.json({ data: promos });
  });

  app.post('/api/promos', async (c) => {
    const body = await c.req.json();
    const result = await edgespark.db.insert(tables.promos).values({
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
    const result = await edgespark.db.update(tables.promos).set({
      title: body.title,
      description: body.description,
      badge: body.badge,
      validUntil: body.validUntil,
      active: body.active
    }).where(eq(tables.promos.id, id)).returning();
    return c.json({ data: result[0] });
  });

  app.delete('/api/promos/:id', async (c) => {
    const id = Number(c.req.param('id'));
    await edgespark.db.delete(tables.promos).where(eq(tables.promos.id, id));
    return c.json({ success: true });
  });

  return app;
}
