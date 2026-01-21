import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Simple admin password (change in production!)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

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

async function getOrders(): Promise<Order[]> {
  try {
    if (!existsSync(ORDERS_FILE)) return [];
    const data = await readFile(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveOrders(orders: Order[]) {
  await writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  return token === ADMIN_PASSWORD;
}

// GET - List all orders
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const orders = await getOrders();
  return NextResponse.json({ orders });
}

// PATCH - Update order status
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    const orders = await getOrders();
    const orderIndex = orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    orders[orderIndex].status = status;
    await saveOrders(orders);

    return NextResponse.json({ success: true, order: orders[orderIndex] });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

// DELETE - Delete order and file
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing order ID' }, { status: 400 });
    }

    const orders = await getOrders();
    const orderIndex = orders.findIndex(o => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Delete file
    const order = orders[orderIndex];
    const fileName = order.fileUrl.replace('/uploads/', '');
    const filePath = path.join(UPLOADS_DIR, fileName);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    // Remove from database
    orders.splice(orderIndex, 1);
    await saveOrders(orders);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
