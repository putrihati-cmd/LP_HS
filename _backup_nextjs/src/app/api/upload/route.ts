import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Simple file-based database
const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

async function ensureDirectories() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  if (!existsSync(UPLOADS_DIR)) {
    await mkdir(UPLOADS_DIR, { recursive: true });
  }
}

async function getOrders(): Promise<Order[]> {
  try {
    const { readFile } = await import('fs/promises');
    const data = await readFile(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveOrders(orders: Order[]) {
  await ensureDirectories();
  await writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

interface Order {
  id: string;
  nama: string;
  whatsapp: string;
  layanan: string;
  jumlah: number;
  catatan: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  status: 'pending' | 'processing' | 'done';
  createdAt: string;
}

export async function POST(request: NextRequest) {
  try {
    await ensureDirectories();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const nama = formData.get('nama') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const layanan = formData.get('layanan') as string;
    const jumlah = parseInt(formData.get('jumlah') as string) || 1;
    const catatan = (formData.get('catatan') as string) || '';

    if (!file || !nama || !whatsapp || !layanan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check file size (max 50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Max 50MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const ext = path.extname(file.name);
    const uniqueName = `${timestamp}-${randomStr}${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Create order
    const order: Order = {
      id: `ORD-${timestamp}`,
      nama,
      whatsapp,
      layanan,
      jumlah,
      catatan,
      fileName: file.name,
      fileUrl: `/uploads/${uniqueName}`,
      fileSize: file.size,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save to database
    const orders = await getOrders();
    orders.unshift(order);
    await saveOrders(orders);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      order,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
