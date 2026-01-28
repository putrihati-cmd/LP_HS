# 🤖 AI CONTENT GENERATOR - Admin Dashboard Feature

## 📋 OVERVIEW

Fitur ini menambahkan AI-powered content generation ke admin dashboard menggunakan **Anthropic Claude API** untuk membantu membuat:
- Deskripsi layanan
- Artikel blog
- Social media posts
- Product descriptions
- Marketing copy
- SEO-optimized content

---

## 🎯 FEATURES

### 1. **Service Description Generator**
- Generate deskripsi layanan profesional
- Multiple tone options (formal, casual, technical)
- SEO keywords integration
- Multiple variations

### 2. **Blog Article Generator**
- Create full blog posts
- Auto-generate outline
- SEO-optimized titles
- Meta descriptions
- Related keywords

### 3. **Social Media Content**
- WhatsApp broadcast messages
- Instagram captions
- Facebook posts
- Platform-specific optimization

### 4. **Marketing Copy**
- Promo announcements
- Email newsletters
- Banner text
- CTA copy

---

## 🔧 IMPLEMENTATION

### Step 1: Update Backend - Add Claude API Integration

Create `src/ai/claude-client.ts`:

```typescript
/**
 * Claude AI Client for Content Generation
 */

interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{
    type: string;
    text: string;
  }>;
  model: string;
  stop_reason: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export class ClaudeAIClient {
  private apiKey: string;
  private apiUrl = 'https://api.anthropic.com/v1/messages';
  private model = 'claude-sonnet-4-20250514';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(
    prompt: string,
    systemPrompt?: string,
    maxTokens: number = 2000
  ): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: maxTokens,
          system: systemPrompt || 'You are a helpful content creation assistant for a printing and copy shop business.',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Claude API Error: ${response.status} - ${error}`);
      }

      const data: ClaudeResponse = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Claude AI Error:', error);
      throw error;
    }
  }

  async generateServiceDescription(params: {
    serviceName: string;
    category: string;
    features: string[];
    tone: 'professional' | 'casual' | 'technical';
    targetAudience: string;
  }): Promise<{
    short: string;
    long: string;
    tagline: string;
    keywords: string[];
  }> {
    const prompt = `
Generate a compelling service description for a copy shop/printing business:

Service Name: ${params.serviceName}
Category: ${params.category}
Key Features: ${params.features.join(', ')}
Tone: ${params.tone}
Target Audience: ${params.targetAudience}

Please provide:
1. Short description (1-2 sentences, max 100 words)
2. Long description (3-4 paragraphs, 200-300 words)
3. Catchy tagline (max 10 words)
4. 5 SEO keywords

Format your response as JSON:
{
  "short": "...",
  "long": "...",
  "tagline": "...",
  "keywords": ["...", "...", "...", "...", "..."]
}
    `.trim();

    const systemPrompt = `You are an expert copywriter specializing in printing and copy shop services. 
Create engaging, SEO-optimized content that highlights benefits and converts readers into customers.
Always respond with valid JSON only, no additional text.`;

    const response = await this.generateContent(prompt, systemPrompt, 1500);
    
    // Parse JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }

  async generateBlogArticle(params: {
    topic: string;
    keywords: string[];
    tone: 'informative' | 'conversational' | 'expert';
    length: 'short' | 'medium' | 'long';
  }): Promise<{
    title: string;
    metaDescription: string;
    outline: string[];
    content: string;
    tags: string[];
  }> {
    const wordCount = {
      short: 500,
      medium: 1000,
      long: 1500,
    };

    const prompt = `
Write a blog article for a printing/copy shop business:

Topic: ${params.topic}
Keywords: ${params.keywords.join(', ')}
Tone: ${params.tone}
Target Length: ~${wordCount[params.length]} words

Please provide:
1. SEO-optimized title
2. Meta description (max 160 characters)
3. Article outline (5-7 main points)
4. Full article content in markdown format
5. 5-8 relevant tags

Format as JSON:
{
  "title": "...",
  "metaDescription": "...",
  "outline": ["...", "...", "..."],
  "content": "...",
  "tags": ["...", "...", "..."]
}
    `.trim();

    const systemPrompt = `You are an expert content writer for the printing and copy shop industry.
Write engaging, informative articles that provide value to readers while naturally incorporating keywords.
Always respond with valid JSON only.`;

    const response = await this.generateContent(prompt, systemPrompt, 3000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }

  async generateSocialMediaPost(params: {
    platform: 'whatsapp' | 'instagram' | 'facebook';
    topic: string;
    callToAction: string;
    includeEmojis: boolean;
  }): Promise<{
    caption: string;
    hashtags: string[];
    characterCount: number;
  }> {
    const platformLimits = {
      whatsapp: 4096,
      instagram: 2200,
      facebook: 63206,
    };

    const prompt = `
Create a ${params.platform} post for a printing/copy shop:

Topic: ${params.topic}
Call to Action: ${params.callToAction}
Include Emojis: ${params.includeEmojis ? 'Yes' : 'No'}
Platform: ${params.platform}
Character Limit: ${platformLimits[params.platform]}

Provide:
1. Engaging caption optimized for ${params.platform}
2. Relevant hashtags (5-10)
3. Character count

Format as JSON:
{
  "caption": "...",
  "hashtags": ["hashtag1", "hashtag2", ...],
  "characterCount": 123
}
    `.trim();

    const systemPrompt = `You are a social media expert for small businesses.
Create engaging posts that drive engagement and conversions.
Always respond with valid JSON only.`;

    const response = await this.generateContent(prompt, systemPrompt, 1000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }

  async improveExistingContent(params: {
    content: string;
    improvements: string[];
  }): Promise<{
    original: string;
    improved: string;
    changes: string[];
  }> {
    const prompt = `
Improve the following content:

ORIGINAL CONTENT:
${params.content}

REQUESTED IMPROVEMENTS:
${params.improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

Provide:
1. The improved version
2. List of specific changes made

Format as JSON:
{
  "original": "...",
  "improved": "...",
  "changes": ["...", "...", "..."]
}
    `.trim();

    const response = await this.generateContent(prompt, undefined, 2000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }
}
```

---

### Step 2: Update Backend - Add AI Endpoints

Update `src/index.ts` to add AI routes:

```typescript
import { ClaudeAIClient } from './ai/claude-client';

export interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
  ANTHROPIC_API_KEY: string;  // Add this
  ENVIRONMENT: string;
  CORS_ORIGIN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const claudeClient = new ClaudeAIClient(env.ANTHROPIC_API_KEY);

    // ... existing routes ...

    // AI Content Generation Routes
    if (url.pathname === '/api/ai/service-description' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const result = await claudeClient.generateServiceDescription({
          serviceName: body.serviceName,
          category: body.category,
          features: body.features,
          tone: body.tone || 'professional',
          targetAudience: body.targetAudience || 'general public',
        });

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (url.pathname === '/api/ai/blog-article' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const result = await claudeClient.generateBlogArticle({
          topic: body.topic,
          keywords: body.keywords || [],
          tone: body.tone || 'informative',
          length: body.length || 'medium',
        });

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (url.pathname === '/api/ai/social-post' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const result = await claudeClient.generateSocialMediaPost({
          platform: body.platform,
          topic: body.topic,
          callToAction: body.callToAction,
          includeEmojis: body.includeEmojis !== false,
        });

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (url.pathname === '/api/ai/improve-content' && request.method === 'POST') {
      try {
        const body = await request.json() as any;
        const result = await claudeClient.improveExistingContent({
          content: body.content,
          improvements: body.improvements || [],
        });

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // ... rest of routes ...
  }
};
```

---

### Step 3: Update wrangler.toml - Add API Key

```toml
[vars]
ENVIRONMENT = "production"
CORS_ORIGIN = "https://hscopycenter.site"
# Don't put API key here! Use secrets instead
```

Set API key as secret:
```bash
wrangler secret put ANTHROPIC_API_KEY
# Paste your Anthropic API key when prompted
```

---

### Step 4: Admin Panel - AI Content Generator UI

Create `src/components/AIContentGenerator.tsx`:

```tsx
import React, { useState } from 'react';

const API_URL = 'https://hscopycenter-backend.your-subdomain.workers.dev/api';

interface GeneratedContent {
  short?: string;
  long?: string;
  tagline?: string;
  keywords?: string[];
  title?: string;
  metaDescription?: string;
  content?: string;
  outline?: string[];
  tags?: string[];
  caption?: string;
  hashtags?: string[];
}

export function AIContentGenerator() {
  const [activeTab, setActiveTab] = useState<'service' | 'blog' | 'social'>('service');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);

  // Service Description Form
  const [serviceForm, setServiceForm] = useState({
    serviceName: '',
    category: '',
    features: '',
    tone: 'professional',
    targetAudience: 'mahasiswa dan pelajar',
  });

  // Blog Article Form
  const [blogForm, setBlogForm] = useState({
    topic: '',
    keywords: '',
    tone: 'informative',
    length: 'medium',
  });

  // Social Media Form
  const [socialForm, setSocialForm] = useState({
    platform: 'whatsapp',
    topic: '',
    callToAction: 'Hubungi kami via WhatsApp',
    includeEmojis: true,
  });

  const generateServiceDescription = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/ai/service-description`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName: serviceForm.serviceName,
          category: serviceForm.category,
          features: serviceForm.features.split(',').map(f => f.trim()),
          tone: serviceForm.tone,
          targetAudience: serviceForm.targetAudience,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal generate konten. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const generateBlogArticle = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/ai/blog-article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: blogForm.topic,
          keywords: blogForm.keywords.split(',').map(k => k.trim()),
          tone: blogForm.tone,
          length: blogForm.length,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal generate artikel. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const generateSocialPost = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/ai/social-post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socialForm),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal generate post. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">🤖 AI Content Generator</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('service')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'service'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          📋 Service Description
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'blog'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          ✍️ Blog Article
        </button>
        <button
          onClick={() => setActiveTab('social')}
          className={`px-6 py-3 font-medium ${
            activeTab === 'social'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          📱 Social Media
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'service' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Generate Service Description</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Service Name</label>
                <input
                  type="text"
                  value={serviceForm.serviceName}
                  onChange={(e) => setServiceForm({ ...serviceForm, serviceName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., Jilid Hardcover Premium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., Jilid & Binding"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Key Features (comma separated)</label>
                <textarea
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  placeholder="e.g., Cover berkualitas tinggi, Hot stamping emas, Tahan lama"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tone</label>
                <select
                  value={serviceForm.tone}
                  onChange={(e) => setServiceForm({ ...serviceForm, tone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Target Audience</label>
                <input
                  type="text"
                  value={serviceForm.targetAudience}
                  onChange={(e) => setServiceForm({ ...serviceForm, targetAudience: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., Mahasiswa, pelajar, profesional"
                />
              </div>

              <button
                onClick={generateServiceDescription}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : '✨ Generate Description'}
              </button>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Generate Blog Article</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input
                  type="text"
                  value={blogForm.topic}
                  onChange={(e) => setBlogForm({ ...blogForm, topic: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., Tips Memilih Jilid Skripsi yang Berkualitas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Keywords (comma separated)</label>
                <input
                  type="text"
                  value={blogForm.keywords}
                  onChange={(e) => setBlogForm({ ...blogForm, keywords: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., jilid skripsi, hardcover, tips mahasiswa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tone</label>
                <select
                  value={blogForm.tone}
                  onChange={(e) => setBlogForm({ ...blogForm, tone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="informative">Informative</option>
                  <option value="conversational">Conversational</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Length</label>
                <select
                  value={blogForm.length}
                  onChange={(e) => setBlogForm({ ...blogForm, length: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="short">Short (~500 words)</option>
                  <option value="medium">Medium (~1000 words)</option>
                  <option value="long">Long (~1500 words)</option>
                </select>
              </div>

              <button
                onClick={generateBlogArticle}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : '✨ Generate Article'}
              </button>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Generate Social Media Post</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Platform</label>
                <select
                  value={socialForm.platform}
                  onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input
                  type="text"
                  value={socialForm.topic}
                  onChange={(e) => setSocialForm({ ...socialForm, topic: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., Promo Jilid Skripsi Bulan Ini"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Call to Action</label>
                <input
                  type="text"
                  value={socialForm.callToAction}
                  onChange={(e) => setSocialForm({ ...socialForm, callToAction: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., Order sekarang via WhatsApp!"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={socialForm.includeEmojis}
                  onChange={(e) => setSocialForm({ ...socialForm, includeEmojis: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Include Emojis</label>
              </div>

              <button
                onClick={generateSocialPost}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : '✨ Generate Post'}
              </button>
            </div>
          )}
        </div>

        {/* Output Display */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Content</h2>
          
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">AI sedang membuat konten...</p>
            </div>
          )}

          {!loading && !result && (
            <div className="text-center py-12 text-gray-400">
              <p>Konten akan muncul di sini setelah di-generate</p>
            </div>
          )}

          {result && activeTab === 'service' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Tagline:</h3>
                <p className="text-lg italic text-blue-600">{result.tagline}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Short Description:</h3>
                <p className="text-gray-700">{result.short}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Long Description:</h3>
                <p className="text-gray-700 whitespace-pre-line">{result.long}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">SEO Keywords:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.keywords?.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.long || '');
                  alert('Copied to clipboard!');
                }}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              >
                📋 Copy to Clipboard
              </button>
            </div>
          )}

          {result && activeTab === 'blog' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Title:</h3>
                <p className="text-xl font-bold text-blue-600">{result.title}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Meta Description:</h3>
                <p className="text-gray-600 italic">{result.metaDescription}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Outline:</h3>
                <ol className="list-decimal list-inside space-y-1">
                  {result.outline?.map((point, i) => (
                    <li key={i} className="text-gray-700">{point}</li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Article Content:</h3>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {result.content}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.tags?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.content || '');
                  alert('Article copied to clipboard!');
                }}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              >
                📋 Copy Article
              </button>
            </div>
          )}

          {result && activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Caption:</h3>
                <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                  {result.caption}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Hashtags:</h3>
                <div className="flex flex-wrap gap-2">
                  {result.hashtags?.map((tag, i) => (
                    <span key={i} className="text-blue-600">#{tag}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Character Count:</h3>
                <p className="text-gray-600">{result.caption?.length || 0} characters</p>
              </div>

              <button
                onClick={() => {
                  const fullPost = `${result.caption}\n\n${result.hashtags?.map(h => `#${h}`).join(' ')}`;
                  navigator.clipboard.writeText(fullPost);
                  alert('Post copied to clipboard!');
                }}
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
              >
                📋 Copy Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

### Step 5: Add to Admin Panel Router

Update `src/App.tsx`:

```tsx
import { AIContentGenerator } from './components/AIContentGenerator';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div>
      <nav>
        {/* ... existing nav items ... */}
        <button onClick={() => setCurrentPage('ai-content')}>
          🤖 AI Content
        </button>
      </nav>

      {currentPage === 'ai-content' && <AIContentGenerator />}
      {/* ... other pages ... */}
    </div>
  );
}
```

---

## 📊 USAGE EXAMPLES

### Example 1: Generate Service Description
```
Input:
- Service Name: Jilid Hardcover Premium
- Category: Jilid & Binding
- Features: Cover kulit sintetis, Hot stamping emas, Tahan puluhan tahun
- Tone: Professional
- Target: Mahasiswa tingkat akhir

Output:
- Tagline: "Jilid Premium untuk Karya Terbaik Anda"
- Short: Professional hardcover binding service...
- Long: 3-paragraph detailed description
- Keywords: jilid skripsi, hardcover premium, jilid berkualitas, dll
```

### Example 2: Generate Blog Article
```
Input:
- Topic: Tips Memilih Jilid Skripsi yang Tepat
- Keywords: jilid skripsi, hardcover, tips mahasiswa
- Tone: Informative
- Length: Medium

Output:
- Full 1000-word article with SEO-optimized title
- Structured outline
- Meta description
- Relevant tags
```

### Example 3: Social Media Post
```
Input:
- Platform: WhatsApp
- Topic: Promo Jilid Skripsi Februari
- CTA: Order sekarang dan dapat diskon 20%!

Output:
- Engaging caption with emojis
- Relevant hashtags
- Character count
```

---

## 💰 COST ESTIMATE

Anthropic Claude API Pricing (as of 2024):
- Claude Sonnet: $3 per million input tokens, $15 per million output tokens

Estimated costs per generation:
- Service Description: ~2000 tokens = $0.03
- Blog Article: ~3000 tokens = $0.045
- Social Post: ~1000 tokens = $0.015

Monthly estimate (100 generations): ~$3-5/month

---

## 🔐 SECURITY NOTES

1. **API Key Protection**:
   - Store in Cloudflare secrets (not in code)
   - Never expose to frontend
   - Rotate regularly

2. **Rate Limiting**:
   - Implement per-user limits
   - Add request throttling
   - Monitor usage

3. **Input Validation**:
   - Sanitize all user inputs
   - Limit input lengths
   - Prevent prompt injection

---

## 🚀 DEPLOYMENT

```bash
# Add AI client code
cd /var/www/hscopycenter-backend
mkdir -p src/ai
# Copy claude-client.ts to src/ai/

# Update dependencies
npm install

# Set API key
wrangler secret put ANTHROPIC_API_KEY
# Enter your Anthropic API key

# Deploy backend
npm run deploy

# Deploy admin panel
cd /var/www/hscopycenter-admin
# Add AIContentGenerator component
npm run build
wrangler pages deploy dist
```

---

## ✅ TESTING

Test AI endpoints:

```bash
# Test service description
curl -X POST https://your-backend.workers.dev/api/ai/service-description \
  -H "Content-Type: application/json" \
  -d '{
    "serviceName": "Jilid Hardcover Premium",
    "category": "Jilid",
    "features": ["Cover berkualitas", "Hot stamping"],
    "tone": "professional",
    "targetAudience": "mahasiswa"
  }'

# Test blog article
curl -X POST https://your-backend.workers.dev/api/ai/blog-article \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Tips Jilid Skripsi",
    "keywords": ["jilid", "skripsi", "hardcover"],
    "tone": "informative",
    "length": "medium"
  }'
```

---

## 📈 NEXT ENHANCEMENTS

1. **Content History**: Save generated content to D1
2. **Bulk Generation**: Generate multiple variations
3. **Content Calendar**: Schedule social posts
4. **A/B Testing**: Test different versions
5. **Image Generation**: Add DALL-E integration
6. **Translation**: Multi-language support
7. **SEO Scoring**: Analyze SEO quality
8. **Plagiarism Check**: Ensure uniqueness

---

🎉 **AI Content Generator is ready to use!**
