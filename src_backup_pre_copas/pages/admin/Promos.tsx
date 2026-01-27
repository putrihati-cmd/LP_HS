import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, X, ToggleLeft, ToggleRight, Calendar } from 'lucide-react';
import { client } from '../../api/client';

interface Promo {
  id: number;
  title: string;
  description: string;
  badge: string;
  validUntil: number;
  active: number;
}

const Promos = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    badge: 'HOT SALE',
    validUntil: new Date().toISOString().split('T')[0],
    active: 1
  });

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const res = await client.api.fetch('/api/promos');
      const data = await res.json();
      if (data.data) {
        setPromos(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch promos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      badge: 'HOT SALE',
      validUntil: new Date().toISOString().split('T')[0],
      active: 1
    });
    setEditingId(null);
  };

  const handleEdit = (promo: Promo) => {
    setEditingId(promo.id);
    setFormData({
      title: promo.title,
      description: promo.description,
      badge: promo.badge,
      validUntil: new Date(promo.validUntil).toISOString().split('T')[0],
      active: promo.active
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        validUntil: new Date(formData.validUntil).getTime()
      };

      if (editingId) {
        await client.api.fetch(`/api/promos/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await client.api.fetch('/api/promos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      resetForm();
      fetchPromos();
    } catch (error) {
      console.error('Failed to save promo', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this promo?')) return;
    try {
      await client.api.fetch(`/api/promos/${id}`, { method: 'DELETE' });
      fetchPromos();
    } catch (error) {
      console.error('Failed to delete promo', error);
    }
  };

  const toggleActive = async (promo: Promo) => {
    try {
      await client.api.fetch(`/api/promos/${promo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...promo, active: promo.active ? 0 : 1 })
      });
      fetchPromos();
    } catch (error) {
      console.error('Failed to toggle status', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Promos</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="bg-gray-800 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            {editingId ? <Edit size={20} /> : <Plus size={20} />}
            {editingId ? 'Edit Promo' : 'Add New Promo'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
                placeholder="e.g. Diskon Akhir Tahun"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Badge</label>
              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
                placeholder="e.g. HOT SALE"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
                placeholder="Promo description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Valid Until</label>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-primary hover:bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-2 transition-colors"
              >
                <Save size={18} />
                {editingId ? 'Update Promo' : 'Save Promo'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-gray-400 text-center py-8">Loading promos...</div>
          ) : promos.length === 0 ? (
            <div className="text-gray-500 text-center py-8 bg-gray-800 rounded-lg">No promos found. Add one on the left.</div>
          ) : (
            <div className="grid gap-4">
              {promos.map((promo) => (
                <div key={promo.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between group hover:bg-gray-750 transition-colors border border-transparent hover:border-gray-700">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-white text-lg">{promo.title}</h3>
                      <span className="bg-primary/20 text-blue-300 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">
                        {promo.badge}
                      </span>
                      {promo.active ? (
                        <span className="text-green-400 text-xs px-2 py-0.5 bg-green-900/30 rounded border border-green-800">Active</span>
                      ) : (
                        <span className="text-gray-500 text-xs px-2 py-0.5 bg-gray-700 rounded">Inactive</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{promo.description}</p>
                    <div className="flex items-center text-xs text-gray-500 gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Valid until: {new Date(promo.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-4 border-l border-gray-700 ml-4">
                    <button
                      onClick={() => toggleActive(promo)}
                      className={`p-2 rounded hover:bg-gray-700 transition-colors ${promo.active ? 'text-green-400' : 'text-gray-500'}`}
                      title="Toggle Active"
                    >
                      {promo.active ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                    </button>
                    <button
                      onClick={() => handleEdit(promo)}
                      className="p-2 text-blue-400 hover:bg-gray-700 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(promo.id)}
                      className="p-2 text-red-400 hover:bg-gray-700 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promos;
