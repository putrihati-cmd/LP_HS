'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Download,
  Trash2,
  RefreshCw,
  LogIn,
  FileText,
  Phone,
  Clock,
  CheckCircle,
  Loader2,
  Package,
} from 'lucide-react';

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

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setOrders(data.orders);
    } catch {
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, fetchOrders]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Password salah');
      }
    } catch {
      setError('Gagal login');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ id, status }),
      });
      fetchOrders();
    } catch {
      setError('Gagal update status');
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm('Yakin hapus order ini?')) return;
    try {
      await fetch(`/api/orders?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${password}` },
      });
      fetchOrders();
    } catch {
      setError('Gagal hapus');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'done':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLayananLabel = (layanan: string) => {
    const labels: Record<string, string> = {
      fotocopy: 'Fotocopy B/W',
      print_bw: 'Print B/W',
      print_warna: 'Print Warna',
      print_full: 'Print Full',
      jilid: 'Jilid Skripsi',
    };
    return labels[layanan] || layanan;
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500">Masukkan password untuk melanjutkan</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="h-12 w-full rounded-lg border border-gray-300 px-4 text-center text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              autoFocus
            />
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !password}
              className="h-12 w-full rounded-lg bg-gray-900 font-bold text-white transition-all hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold text-gray-900">
            📋 Order Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{orders.length} order</span>
            <button
              onClick={fetchOrders}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {loading && orders.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">
            <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <p className="text-gray-500">Belum ada order masuk.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div
                key={order.id}
                className="overflow-hidden rounded-xl bg-white shadow transition-all hover:shadow-md"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  {/* Left - Order info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-gray-900">
                        {order.nama}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {order.whatsapp}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="rounded bg-gray-100 px-2 py-1 font-medium text-gray-700">
                        {getLayananLabel(order.layanan)}
                      </span>
                      <span className="text-gray-500">× {order.jumlah}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-gray-700">
                        {order.fileName}
                      </span>
                      <span className="text-gray-400">
                        ({formatSize(order.fileSize)})
                      </span>
                    </div>

                    {order.catatan && (
                      <p className="text-sm text-gray-500 italic">
                        💬 {order.catatan}
                      </p>
                    )}
                  </div>

                  {/* Right - Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status buttons */}
                    {order.status !== 'done' && (
                      <button
                        onClick={() =>
                          updateStatus(
                            order.id,
                            order.status === 'pending' ? 'processing' : 'done'
                          )
                        }
                        className="flex items-center gap-1 rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
                      >
                        <CheckCircle className="h-4 w-4" />
                        {order.status === 'pending' ? 'Proses' : 'Selesai'}
                      </button>
                    )}

                    {/* Download */}
                    <a
                      href={order.fileUrl}
                      download
                      className="flex items-center gap-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${order.whatsapp.replace(/^0/, '62')}?text=Halo ${order.nama}, order ${order.id} Anda sudah siap diambil.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-600"
                    >
                      📱 WA
                    </a>

                    {/* Delete */}
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
