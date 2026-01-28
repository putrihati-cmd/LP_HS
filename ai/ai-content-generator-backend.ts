/**
 * HS Copy Center - AI Content Generator
 * Claude AI Integration for Admin Dashboard
 * 
 * FEATURES:
 * 1. Service Description Generator
 * 2. Blog Article Writer
 * 3. Social Media Post Creator
 * 4. Content Improver
 * 5. SEO Optimizer
 */

// =============================================================================
// FILE 1: src/ai/claude-client.ts (Backend)
// =============================================================================

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

  /**
   * Generate content menggunakan Claude API
   */
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
          system: systemPrompt || 'Anda adalah asisten pembuatan konten profesional untuk bisnis fotocopy dan percetakan.',
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

  /**
   * Generate deskripsi layanan profesional
   */
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
Buatkan deskripsi layanan untuk bisnis fotocopy dan percetakan:

Nama Layanan: ${params.serviceName}
Kategori: ${params.category}
Fitur Utama: ${params.features.join(', ')}
Tone: ${params.tone}
Target Audience: ${params.targetAudience}

Berikan hasil dalam format JSON dengan struktur berikut:
{
  "short": "Deskripsi singkat 1-2 kalimat (maksimal 100 kata)",
  "long": "Deskripsi panjang 3-4 paragraf (200-300 kata) yang menarik dan informatif",
  "tagline": "Tagline menarik maksimal 10 kata",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

PENTING: 
- Gunakan bahasa Indonesia yang baik dan profesional
- Fokus pada manfaat untuk pelanggan
- Sertakan harga atau range harga jika memungkinkan
- Optimalkan untuk SEO lokal Purwokerto
- Response HANYA JSON, tanpa teks tambahan
    `.trim();

    const systemPrompt = `Anda adalah copywriter expert untuk bisnis fotocopy dan percetakan di Indonesia.
Tugas Anda adalah membuat konten yang menarik, persuasif, dan SEO-friendly.
Selalu respons HANYA dengan JSON valid, tanpa markdown atau teks tambahan.`;

    const response = await this.generateContent(prompt, systemPrompt, 1500);
    
    // Extract JSON dari response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }

  /**
   * Generate artikel blog lengkap
   */
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
Tulis artikel blog untuk bisnis fotocopy dan percetakan:

Topik: ${params.topic}
Keywords: ${params.keywords.join(', ')}
Tone: ${params.tone}
Target Panjang: ~${wordCount[params.length]} kata

Berikan hasil dalam format JSON:
{
  "title": "Judul SEO-optimized yang menarik",
  "metaDescription": "Meta description maksimal 160 karakter",
  "outline": ["Poin outline 1", "Poin outline 2", "Poin outline 3", ...],
  "content": "Konten artikel lengkap dalam format markdown",
  "tags": ["tag1", "tag2", "tag3", ...]
}

PENTING:
- Gunakan bahasa Indonesia yang natural dan mudah dipahami
- Sertakan tips praktis dan actionable
- Tambahkan contoh nyata terkait fotocopy/percetakan
- Gunakan heading (##, ###) untuk struktur yang jelas
- Optimalkan untuk SEO lokal Purwokerto
- Response HANYA JSON valid
    `.trim();

    const systemPrompt = `Anda adalah content writer profesional untuk industri percetakan di Indonesia.
Buat artikel yang informatif, engaging, dan SEO-friendly.
Selalu respons HANYA dengan JSON valid.`;

    const response = await this.generateContent(prompt, systemPrompt, 3000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }

  /**
   * Generate konten social media
   */
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

    const platformTips = {
      whatsapp: 'Format untuk broadcast WhatsApp Business, ramah dan personal',
      instagram: 'Visual-first dengan caption menarik, maksimalkan hashtag',
      facebook: 'Engaging untuk komunitas, bisa lebih panjang dan detail',
    };

    const prompt = `
Buatkan konten ${params.platform} untuk bisnis fotocopy dan percetakan:

Topik: ${params.topic}
Call to Action: ${params.callToAction}
Gunakan Emoji: ${params.includeEmojis ? 'Ya' : 'Tidak'}
Platform: ${params.platform}
Character Limit: ${platformLimits[params.platform]}
Tips: ${platformTips[params.platform]}

Berikan hasil dalam format JSON:
{
  "caption": "Caption yang engaging dan optimized untuk ${params.platform}",
  "hashtags": ["hashtag1", "hashtag2", ...],
  "characterCount": 123
}

PENTING:
- Caption harus menarik perhatian di 3 detik pertama
- Sertakan value proposition yang jelas
- Call to action yang kuat dan spesifik
- Hashtag relevan untuk Purwokerto dan sekitarnya
- Bahasa yang sesuai dengan platform (lebih casual untuk Instagram)
- Response HANYA JSON valid
    `.trim();

    const systemPrompt = `Anda adalah social media expert untuk bisnis lokal di Indonesia.
Buat konten yang engaging, conversational, dan mendorong action.
Selalu respons HANYA dengan JSON valid.`;

    const response = await this.generateContent(prompt, systemPrompt, 1000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }

  /**
   * Improve konten yang sudah ada
   */
  async improveExistingContent(params: {
    content: string;
    improvements: string[];
  }): Promise<{
    original: string;
    improved: string;
    changes: string[];
  }> {
    const prompt = `
Perbaiki konten berikut:

KONTEN ASLI:
${params.content}

PERBAIKAN YANG DIMINTA:
${params.improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

Berikan hasil dalam format JSON:
{
  "original": "Konten asli",
  "improved": "Konten yang sudah diperbaiki",
  "changes": ["Perubahan 1", "Perubahan 2", ...]
}

PENTING:
- Pertahankan makna dan konteks original
- Pastikan grammar dan ejaan benar
- Tingkatkan readability
- Optimalkan untuk SEO jika diminta
- Response HANYA JSON valid
    `.trim();

    const response = await this.generateContent(prompt, undefined, 2000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }

  /**
   * Generate multiple variations
   */
  async generateVariations(params: {
    content: string;
    count: number;
    type: 'headline' | 'cta' | 'description';
  }): Promise<string[]> {
    const prompt = `
Buatkan ${params.count} variasi berbeda untuk ${params.type}:

KONTEN ASLI:
${params.content}

Berikan hasil dalam format JSON array:
["Variasi 1", "Variasi 2", "Variasi 3", ...]

PENTING:
- Setiap variasi harus unik dan berbeda approach
- Pertahankan pesan inti
- Variasi dalam tone dan struktur
- Response HANYA JSON array valid
    `.trim();

    const response = await this.generateContent(prompt, undefined, 1000);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }
    
    return JSON.parse(jsonMatch[0]);
  }
}

// =============================================================================
// FILE 2: Backend API Routes Update (src/index.ts)
// =============================================================================

/*
Add these routes to your existing src/index.ts:

import { ClaudeAIClient } from './ai/claude-client';

export interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
  ANTHROPIC_API_KEY: string;  // Add this
  ENVIRONMENT: string;
  CORS_ORIGIN: string;
}

// Add after existing routes:

// ========== AI CONTENT GENERATION ROUTES ==========

if (url.pathname === '/api/ai/service-description' && request.method === 'POST') {
  try {
    const claudeClient = new ClaudeAIClient(env.ANTHROPIC_API_KEY);
    const body = await request.json() as any;
    
    const result = await claudeClient.generateServiceDescription({
      serviceName: body.serviceName,
      category: body.category,
      features: body.features || [],
      tone: body.tone || 'professional',
      targetAudience: body.targetAudience || 'mahasiswa dan pelajar',
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('AI Service Description Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate service description' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

if (url.pathname === '/api/ai/blog-article' && request.method === 'POST') {
  try {
    const claudeClient = new ClaudeAIClient(env.ANTHROPIC_API_KEY);
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
    console.error('AI Blog Article Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate blog article' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

if (url.pathname === '/api/ai/social-post' && request.method === 'POST') {
  try {
    const claudeClient = new ClaudeAIClient(env.ANTHROPIC_API_KEY);
    const body = await request.json() as any;
    
    const result = await claudeClient.generateSocialMediaPost({
      platform: body.platform || 'whatsapp',
      topic: body.topic,
      callToAction: body.callToAction || 'Hubungi kami sekarang!',
      includeEmojis: body.includeEmojis !== false,
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('AI Social Post Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate social post' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

if (url.pathname === '/api/ai/improve-content' && request.method === 'POST') {
  try {
    const claudeClient = new ClaudeAIClient(env.ANTHROPIC_API_KEY);
    const body = await request.json() as any;
    
    const result = await claudeClient.improveExistingContent({
      content: body.content,
      improvements: body.improvements || ['Perbaiki grammar', 'Tingkatkan SEO'],
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('AI Improve Content Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to improve content' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

if (url.pathname === '/api/ai/variations' && request.method === 'POST') {
  try {
    const claudeClient = new ClaudeAIClient(env.ANTHROPIC_API_KEY);
    const body = await request.json() as any;
    
    const result = await claudeClient.generateVariations({
      content: body.content,
      count: body.count || 3,
      type: body.type || 'description',
    });

    return new Response(JSON.stringify({ variations: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('AI Variations Error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate variations' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
*/
