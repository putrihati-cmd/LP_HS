'use client';

import { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  CheckCircle,
  Loader2,
  X,
  AlertCircle,
} from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';

const SERVICES = [
  { value: 'fotocopy', label: 'Fotocopy B/W - Rp 300/lembar' },
  { value: 'print_bw', label: 'Print B/W - Rp 500/lembar' },
  { value: 'print_warna', label: 'Print Warna - Rp 1.000/lembar' },
  { value: 'print_full', label: 'Print Full Warna - Rp 2.000/lembar' },
  { value: 'jilid', label: 'Jilid Skripsi - Rp 15.000' },
];

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [layanan, setLayanan] = useState('print_bw');
  const [jumlah, setJumlah] = useState(1);
  const [catatan, setCatatan] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File terlalu besar. Maksimal 50MB.');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > 50 * 1024 * 1024) {
        setError('File terlalu besar. Maksimal 50MB.');
        return;
      }
      setFile(droppedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !nama || !whatsapp) {
      setError('Mohon lengkapi semua field yang wajib.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('nama', nama);
      formData.append('whatsapp', whatsapp);
      formData.append('layanan', layanan);
      formData.append('jumlah', jumlah.toString());
      formData.append('catatan', catatan);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload gagal');
      }

      setSuccess(true);
      setFile(null);
      setNama('');
      setWhatsapp('');
      setCatatan('');
      setJumlah(1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload gagal');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (success) {
    return (
      <section id="upload" className="bg-green-50 py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-xl border-green-200 bg-white">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                File Berhasil Diupload! 🎉
              </h3>
              <p className="mb-6 text-gray-600">
                Kami akan segera menghubungi Anda via WhatsApp untuk konfirmasi.
              </p>
              <Button
                onClick={() => setSuccess(false)}
                className="bg-green-500 hover:bg-green-600"
              >
                Upload File Lagi
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section
      id="upload"
      className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-semibold text-blue-700">
            📤 Upload File
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Kirim File Langsung
          </h2>
          <p className="mx-auto max-w-xl text-gray-600">
            File besar? Tidak bisa via WA? Upload di sini, kami yang download.
          </p>
        </div>

        <Card className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Drop Zone */}
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all ${
                  file
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ppt,.pptx,.xls,.xlsx"
                />
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-8 w-8 text-green-600" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="ml-2 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto mb-3 h-10 w-10 text-gray-400" />
                    <p className="font-medium text-gray-700">
                      Drag & drop file, atau{' '}
                      <span className="text-blue-600">klik untuk pilih</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      PDF, Word, JPG, PNG, PPT, Excel (max 50MB)
                    </p>
                  </>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={e => setNama(e.target.value)}
                    placeholder="Masukkan nama"
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    No. WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Jenis Layanan
                  </label>
                  <select
                    value={layanan}
                    onChange={e => setLayanan(e.target.value)}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    {SERVICES.map(s => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Jumlah Copy
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={jumlah}
                    onChange={e => setJumlah(parseInt(e.target.value) || 1)}
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  Catatan (opsional)
                </label>
                <textarea
                  value={catatan}
                  onChange={e => setCatatan(e.target.value)}
                  placeholder="Contoh: Print bolak-balik, jilid soft cover warna biru"
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || !file}
                className="h-14 w-full rounded-full bg-green-500 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-5 w-5" />
                    Kirim File Sekarang
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-gray-500">
                🔒 File dihapus setelah selesai cetak. Privasi Anda terjaga.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
