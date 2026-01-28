/**
 * AI Content Generator Component
 * Admin Dashboard - React + TypeScript
 * File: src/components/AIContentGenerator.tsx
 */

import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://hscopycenter-backend.workers.dev/api';

interface ServiceDescriptionResult {
  short: string;
  long: string;
  tagline: string;
  keywords: string[];
}

interface BlogArticleResult {
  title: string;
  metaDescription: string;
  outline: string[];
  content: string;
  tags: string[];
}

interface SocialPostResult {
  caption: string;
  hashtags: string[];
  characterCount: number;
}

type GeneratedContent = ServiceDescriptionResult | BlogArticleResult | SocialPostResult | null;

export function AIContentGenerator() {
  const [activeTab, setActiveTab] = useState<'service' | 'blog' | 'social' | 'improve'>('service');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  // Service Description Form State
  const [serviceForm, setServiceForm] = useState({
    serviceName: '',
    category: '',
    features: '',
    tone: 'professional' as 'professional' | 'casual' | 'technical',
    targetAudience: 'mahasiswa dan pelajar',
  });

  // Blog Article Form State
  const [blogForm, setBlogForm] = useState({
    topic: '',
    keywords: '',
    tone: 'informative' as 'informative' | 'conversational' | 'expert',
    length: 'medium' as 'short' | 'medium' | 'long',
  });

  // Social Media Form State
  const [socialForm, setSocialForm] = useState({
    platform: 'whatsapp' as 'whatsapp' | 'instagram' | 'facebook',
    topic: '',
    callToAction: 'Hubungi kami via WhatsApp!',
    includeEmojis: true,
  });

  // Improve Content Form State
  const [improveForm, setImproveForm] = useState({
    content: '',
    improvements: 'Perbaiki grammar\nTingkatkan SEO\nBuat lebih menarik',
  });

  const generateServiceDescription = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/ai/service-description`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName: serviceForm.serviceName,
          category: serviceForm.category,
          features: serviceForm.features.split(',').map(f => f.trim()).filter(Boolean),
          tone: serviceForm.tone,
          targetAudience: serviceForm.targetAudience,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Gagal generate konten. Silakan coba lagi.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateBlogArticle = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/ai/blog-article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: blogForm.topic,
          keywords: blogForm.keywords.split(',').map(k => k.trim()).filter(Boolean),
          tone: blogForm.tone,
          length: blogForm.length,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Gagal generate artikel. Silakan coba lagi.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateSocialPost = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/ai/social-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialForm),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Gagal generate post. Silakan coba lagi.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const improveContent = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/ai/improve-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: improveForm.content,
          improvements: improveForm.improvements.split('\n').filter(Boolean),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Gagal improve konten. Silakan coba lagi.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('✅ Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🤖 AI Content Generator
          </h1>
          <p className="text-gray-600">
            Buat konten profesional dengan bantuan Claude AI
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('service')}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'service'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📋 Deskripsi Layanan
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'blog'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ✍️ Artikel Blog
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'social'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📱 Social Media
            </button>
            <button
              onClick={() => setActiveTab('improve')}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeTab === 'improve'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ✨ Improve Content
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">Input</h2>

            {/* Service Description Form */}
            {activeTab === 'service' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Layanan *
                  </label>
                  <input
                    type="text"
                    value={serviceForm.serviceName}
                    onChange={(e) => setServiceForm({ ...serviceForm, serviceName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contoh: Jilid Hardcover Premium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <input
                    type="text"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contoh: Jilid & Binding"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fitur Utama (pisahkan dengan koma) *
                  </label>
                  <textarea
                    value={serviceForm.features}
                    onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="contoh: Cover berkualitas tinggi, Hot stamping emas, Tahan lama"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <select
                    value={serviceForm.tone}
                    onChange={(e) => setServiceForm({ ...serviceForm, tone: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={serviceForm.targetAudience}
                    onChange={(e) => setServiceForm({ ...serviceForm, targetAudience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contoh: Mahasiswa, pelajar, profesional"
                  />
                </div>

                <button
                  onClick={generateServiceDescription}
                  disabled={loading || !serviceForm.serviceName || !serviceForm.category || !serviceForm.features}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    '✨ Generate Deskripsi'
                  )}
                </button>
              </div>
            )}

            {/* Blog Article Form */}
            {activeTab === 'blog' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topik Artikel *
                  </label>
                  <input
                    type="text"
                    value={blogForm.topic}
                    onChange={(e) => setBlogForm({ ...blogForm, topic: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contoh: Tips Memilih Jilid Skripsi yang Berkualitas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={blogForm.keywords}
                    onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contoh: jilid skripsi, hardcover, tips mahasiswa"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tone
                    </label>
                    <select
                      value={blogForm.tone}
                      onChange={(e) => setBlogForm({ ...blogForm, tone: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="informative">Informative</option>
                      <option value="conversational">Conversational</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Panjang
                    </label>
                    <select
                      value={blogForm.length}
                      onChange={(e) => setBlogForm({ ...blogForm, length: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="short">Pendek (~500 kata)</option>
                      <option value="medium">Sedang (~1000 kata)</option>
                      <option value="long">Panjang (~1500 kata)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={generateBlogArticle}
                  disabled={loading || !blogForm.topic}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    '✨ Generate Artikel'
                  )}
                </button>
              </div>
            )}

            {/* Social Media Form */}
            {activeTab === 'social' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform
                  </label>
                  <select
                    value={socialForm.platform}
                    onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="whatsapp">WhatsApp</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topik *
                  </label>
                  <input
                    type="text"
                    value={socialForm.topic}
                    onChange={(e) => setSocialForm({ ...socialForm, topic: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contoh: Promo Jilid Skripsi Bulan Ini"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Call to Action
                  </label>
                  <input
                    type="text"
                    value={socialForm.callToAction}
                    onChange={(e) => setSocialForm({ ...socialForm, callToAction: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contoh: Order sekarang via WhatsApp!"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={socialForm.includeEmojis}
                    onChange={(e) => setSocialForm({ ...socialForm, includeEmojis: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Gunakan Emoji
                  </label>
                </div>

                <button
                  onClick={generateSocialPost}
                  disabled={loading || !socialForm.topic}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    '✨ Generate Post'
                  )}
                </button>
              </div>
            )}

            {/* Improve Content Form */}
            {activeTab === 'improve' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konten yang ingin diperbaiki *
                  </label>
                  <textarea
                    value={improveForm.content}
                    onChange={(e) => setImproveForm({ ...improveForm, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={6}
                    placeholder="Paste konten yang ingin diperbaiki di sini..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Perbaikan yang diminta (satu per baris)
                  </label>
                  <textarea
                    value={improveForm.improvements}
                    onChange={(e) => setImproveForm({ ...improveForm, improvements: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Perbaiki grammar&#10;Tingkatkan SEO&#10;Buat lebih menarik"
                  />
                </div>

                <button
                  onClick={improveContent}
                  disabled={loading || !improveForm.content}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Improving...
                    </span>
                  ) : (
                    '✨ Improve Content'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Output Display */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6">Output</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800">❌ {error}</p>
              </div>
            )}

            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">AI sedang membuat konten...</p>
                <p className="text-sm text-gray-500 mt-2">Ini mungkin memakan waktu 10-30 detik</p>
              </div>
            )}

            {!loading && !result && !error && (
              <div className="text-center py-12 text-gray-400">
                <svg className="h-24 w-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-lg">Konten akan muncul di sini</p>
                <p className="text-sm mt-2">Isi form dan klik tombol generate</p>
              </div>
            )}

            {/* Service Description Result */}
            {result && activeTab === 'service' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-gray-700 mb-2">💡 Tagline:</h3>
                  <p className="text-xl font-bold text-blue-700 italic">"{result.tagline}"</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">📝 Deskripsi Singkat:</h3>
                    <button
                      onClick={() => copyToClipboard(result.short)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 leading-relaxed">{result.short}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">📄 Deskripsi Lengkap:</h3>
                    <button
                      onClick={() => copyToClipboard(result.long)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">{result.long}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">🏷️ SEO Keywords:</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords?.map((kw: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Blog Article Result */}
            {result && activeTab === 'blog' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold text-gray-700 mb-2">📰 Title:</h3>
                  <p className="text-2xl font-bold text-purple-700">{result.title}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">🔍 Meta Description:</h3>
                  <p className="text-gray-600 italic bg-gray-50 p-3 rounded-lg">{result.metaDescription}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">📋 Outline:</h3>
                  <ol className="list-decimal list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
                    {result.outline?.map((point: string, i: number) => (
                      <li key={i} className="text-gray-700">{point}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">✍️ Konten Artikel:</h3>
                    <button
                      onClick={() => copyToClipboard(result.content)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap text-gray-800 font-sans">{result.content}</pre>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">🏷️ Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.tags?.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Result */}
            {result && activeTab === 'social' && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">📱 Caption:</h3>
                    <button
                      onClick={() => copyToClipboard(`${result.caption}\n\n${result.hashtags?.map((h: string) => `#${h}`).join(' ')}`)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      📋 Copy All
                    </button>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">{result.caption}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">#️⃣ Hashtags:</h3>
                  <div className="flex flex-wrap gap-2 bg-gray-50 p-4 rounded-lg">
                    {result.hashtags?.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-blue-600 font-medium cursor-pointer hover:text-blue-800"
                        onClick={() => copyToClipboard(`#${tag}`)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">📊 Stats:</h3>
                  <p className="text-gray-600">
                    Total karakter: <span className="font-bold">{result.caption?.length || 0}</span>
                  </p>
                  <p className="text-gray-600">
                    Total hashtags: <span className="font-bold">{result.hashtags?.length || 0}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Improve Content Result */}
            {result && activeTab === 'improve' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">📝 Konten Original:</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
                    <p className="text-gray-700 whitespace-pre-line">{result.original}</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">✨ Konten Improved:</h3>
                    <button
                      onClick={() => copyToClipboard(result.improved)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      📋 Copy
                    </button>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">{result.improved}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">📋 Perubahan yang Dilakukan:</h3>
                  <ul className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    {result.changes?.map((change: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span className="text-gray-700">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIContentGenerator;
