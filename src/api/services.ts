import { client } from './client';

// Since the client might be auto-generated, we can use a raw fetch wrapper or extensions
// But let's assume we can use the baseUrl from the client to make requests

const API_URL = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
  ? 'https://hscopycenter-backend.tholibadilmaruf-campus.workers.dev/api'
  : 'http://localhost:3000/api';

export const servicesApi = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/services`);
    return res.json();
  },
  create: async (data: any) => {
    const res = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: number, data: any) => {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }
};
