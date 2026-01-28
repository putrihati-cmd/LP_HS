
import { Hono } from "hono";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { eq, desc } from "drizzle-orm";
import * as schema from "./__generated__/db_schema";
import { GeminiAIClient } from "./ai/gemini-client";

type Bindings = {
  DB: D1Database;
  STORAGE: R2Bucket;
  ENVIRONMENT: string;
  CORS_ORIGIN: string;
  GOOGLE_AI_API_KEY: string;
};

export const createApp = (config?: { db?: any }) => {
  const app = new Hono<{ Bindings: Bindings }>();

  // Middleware
  app.use('*', async (c, next) => {
    const corsMiddleware = cors({
      origin: (origin) => {
        if (!origin) return c.env.CORS_ORIGIN || 'https://hscopycenter.site';
        // Allow localhost and specific production domains
        if (
          origin.startsWith('http://localhost') ||
          origin.endsWith('.pages.dev') ||
          origin === 'https://hscopycenter.site'
        ) {
          return origin;
        }
        return c.env.CORS_ORIGIN || 'https://hscopycenter.site';
      },
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    });
    return corsMiddleware(c, next);
  });

  // Helper to get DB
  // If config.db is provided (Node env), use it. Otherwise use c.env.DB (Cloudflare env)
  const getDb = (c: any) => {
    if (config?.db) return config.db;
    return drizzle(c.env.DB, { schema });
  };

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


  // --- Services ---

  app.get('/api/services', async (c) => {
    const db = getDb(c);
    // @ts-ignore
    const services = await db.select().from(schema.services).orderBy(schema.services.order);
    return c.json({ data: services });
  });

  app.post('/api/services', async (c) => {
    const body = await c.req.json();
    const db = getDb(c);
    // @ts-ignore
    const result = await db.insert(schema.services).values({
      title: body.title,
      slug: body.slug,
      description: body.description,
      price: Number(body.price || 0),
      category: body.category || 'General',
      icon: body.icon,
      imageUrl: body.imageUrl,
      active: body.active ?? 1,
      order: body.order ?? 0
    }).returning();
    return c.json({ data: result[0] });
  });

  app.put('/api/services/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const body = await c.req.json();
    const db = getDb(c);
    // @ts-ignore
    const result = await db.update(schema.services).set({
      title: body.title,
      slug: body.slug,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      icon: body.icon,
      imageUrl: body.imageUrl,
      active: body.active,
      order: body.order
    }).where(eq(schema.services.id, id)).returning();
    return c.json({ data: result[0] });
  });

  app.delete('/api/services/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const db = getDb(c);
    // @ts-ignore
    await db.delete(schema.services).where(eq(schema.services.id, id));
    return c.json({ success: true });
  });

  // ========== AI CONTENT GENERATION ROUTES ==========

  app.post('/api/ai/service-description', async (c) => {
    try {
      const aiClient = new GeminiAIClient(c.env.GOOGLE_AI_API_KEY);
      const body = await c.req.json();
      const result = await aiClient.generateServiceDescription({
        serviceName: body.serviceName,
        category: body.category,
        features: body.features || [],
        tone: body.tone || 'professional',
        targetAudience: body.targetAudience || 'mahasiswa dan pelajar',
      });
      return c.json(result);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.post('/api/ai/blog-article', async (c) => {
    try {
      const aiClient = new GeminiAIClient(c.env.GOOGLE_AI_API_KEY);
      const body = await c.req.json();
      const result = await aiClient.generateBlogArticle({
        topic: body.topic,
        keywords: body.keywords || [],
        tone: body.tone || 'informative',
        length: body.length || 'medium',
      });
      return c.json(result);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.post('/api/ai/social-post', async (c) => {
    try {
      const aiClient = new GeminiAIClient(c.env.GOOGLE_AI_API_KEY);
      const body = await c.req.json();
      const result = await aiClient.generateSocialMediaPost({
        platform: body.platform || 'whatsapp',
        topic: body.topic,
        callToAction: body.callToAction || 'Hubungi kami sekarang!',
        includeEmojis: body.includeEmojis !== false,
      });
      return c.json(result);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.post('/api/ai/improve-content', async (c) => {
    try {
      const aiClient = new GeminiAIClient(c.env.GOOGLE_AI_API_KEY);
      const body = await c.req.json();
      const result = await aiClient.improveExistingContent({
        content: body.content,
        improvements: body.improvements || ['Perbaiki grammar', 'Tingkatkan SEO'],
      });
      return c.json(result);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  app.post('/api/ai/variations', async (c) => {
    try {
      const aiClient = new GeminiAIClient(c.env.GOOGLE_AI_API_KEY);
      const body = await c.req.json();
      const result = await aiClient.generateVariations({
        content: body.content,
        count: body.count || 3,
        type: body.type || 'description',
      });
      return c.json({ variations: result });
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });

  // ========== ARTICLES ROUTES ==========

  app.post('/api/articles', async (c) => {
    try {
      const db = getDb(c);
      const body = await c.req.json();

      // Simple slug generation if not provided
      const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      const newArticle = {
        title: body.title,
        content: body.content,
        slug: slug,
        excerpt: body.metaDescription || body.content.substring(0, 150) + '...',
        tags: JSON.stringify(body.tags || []),
        category: body.category || 'General',
        author: 'Admin',
        status: 'published', // Direct publish for efficiency as requested
        imageUrl: 'https://images.unsplash.com/photo-1499750310159-525446b095ef?w=800&auto=format&fit=crop&q=60', // Default image
        createdAt: new Date(),
      };

      // @ts-ignore
      await db.insert(schema.articles).values(newArticle);

      return c.json({ success: true, slug: slug });
    } catch (error: any) {
      console.error('Save article error:', error);
      return c.json({ error: error.message }, 500);
    }
  });

  // Health check
  app.get('/api/health', (c) => c.json({ status: 'ok', environment: c.env.ENVIRONMENT }));

  return app;
};

export default createApp();
