/**
 * HS Copy Center - AI Content Generator (FREE VERSION)
 * Google AI (Gemini) Integration for Admin Dashboard
 *
 * FEATURES:
 * 1. Service Description Generator
 * 2. Blog Article Writer
 * 3. Social Media Post Creator
 * 4. Content Improver
 * 5. Variations Generator
 *
 * FREE TIER: 15 req/min, 1 million tokens/month
 */

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

export class GeminiAIClient {
  private apiKey: string;
  private model = 'gemini-2.0-flash';
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generate content menggunakan Google AI (Gemini) API
   */
  async generateContent(
    prompt: string,
    systemPrompt?: string,
    maxTokens: number = 2000
  ): Promise<string> {
    try {
      const url = `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`;

      const contents = [];

      // Add system instruction as first user message if provided
      if (systemPrompt) {
        contents.push({
          role: 'user',
          parts: [{ text: `[System Instruction]: ${systemPrompt}` }]
        });
        contents.push({
          role: 'model',
          parts: [{ text: 'Understood. I will follow these instructions.' }]
        });
      }

      // Add actual user prompt
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Gemini API Error: ${response.status} - ${error}`);
      }

      const data: GeminiResponse = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Gemini');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini AI Error:', error);
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
- Optimalkan untuk SEO lokal Purwokerto
- Response HANYA JSON, tanpa teks tambahan atau markdown
    `.trim();

    const systemPrompt = `Anda adalah copywriter expert untuk bisnis fotocopy dan percetakan di Indonesia.
Tugas Anda adalah membuat konten yang menarik, persuasif, dan SEO-friendly.
Selalu respons HANYA dengan JSON valid, tanpa markdown code block atau teks tambahan.`;

    const response = await this.generateContent(prompt, systemPrompt, 1500);

    // Extract JSON dari response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Gemini');
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
  "outline": ["Poin outline 1", "Poin outline 2", "Poin outline 3"],
  "content": "Konten artikel lengkap dalam format markdown",
  "tags": ["tag1", "tag2", "tag3"]
}

PENTING:
- Gunakan bahasa Indonesia yang natural dan mudah dipahami
- Sertakan tips praktis dan actionable
- Gunakan heading (##, ###) untuk struktur yang jelas
- Optimalkan untuk SEO lokal Purwokerto
- Response HANYA JSON valid, tanpa markdown code block
    `.trim();

    const systemPrompt = `Anda adalah content writer profesional untuk industri percetakan di Indonesia.
Buat artikel yang informatif, engaging, dan SEO-friendly.
Selalu respons HANYA dengan JSON valid.`;

    const response = await this.generateContent(prompt, systemPrompt, 3000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Gemini');
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
  "hashtags": ["hashtag1", "hashtag2"],
  "characterCount": 123
}

PENTING:
- Caption harus menarik perhatian di 3 detik pertama
- Sertakan value proposition yang jelas
- Call to action yang kuat dan spesifik
- Hashtag relevan untuk Purwokerto dan sekitarnya
- Response HANYA JSON valid, tanpa markdown code block
    `.trim();

    const systemPrompt = `Anda adalah social media expert untuk bisnis lokal di Indonesia.
Buat konten yang engaging, conversational, dan mendorong action.
Selalu respons HANYA dengan JSON valid.`;

    const response = await this.generateContent(prompt, systemPrompt, 1000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Gemini');
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
  "changes": ["Perubahan 1", "Perubahan 2"]
}

PENTING:
- Pertahankan makna dan konteks original
- Pastikan grammar dan ejaan benar
- Tingkatkan readability
- Response HANYA JSON valid, tanpa markdown code block
    `.trim();

    const response = await this.generateContent(prompt, undefined, 2000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Gemini');
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
["Variasi 1", "Variasi 2", "Variasi 3"]

PENTING:
- Setiap variasi harus unik dan berbeda approach
- Pertahankan pesan inti
- Variasi dalam tone dan struktur
- Response HANYA JSON array valid, tanpa markdown code block
    `.trim();

    const response = await this.generateContent(prompt, undefined, 1000);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Gemini');
    }

    return JSON.parse(jsonMatch[0]);
  }
}

// =============================================================================
// API ROUTES - Add to backend/src/index.ts
// =============================================================================

/*
// Import at top of file:
import { GeminiAIClient } from './ai/gemini-client';

// Add to Env interface:
export interface Env {
  DB: D1Database;
  STORAGE: R2Bucket;
  GOOGLE_AI_API_KEY: string;  // FREE Google AI key
  ENVIRONMENT: string;
  CORS_ORIGIN: string;
}

// Add these routes:

if (url.pathname === '/api/ai/service-description' && request.method === 'POST') {
  try {
    const aiClient = new GeminiAIClient(env.GOOGLE_AI_API_KEY);
    const body = await request.json() as any;

    const result = await aiClient.generateServiceDescription({
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

if (url.pathname === '/api/ai/blog-article' && request.method === 'POST') {
  try {
    const aiClient = new GeminiAIClient(env.GOOGLE_AI_API_KEY);
    const body = await request.json() as any;

    const result = await aiClient.generateBlogArticle({
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
    const aiClient = new GeminiAIClient(env.GOOGLE_AI_API_KEY);
    const body = await request.json() as any;

    const result = await aiClient.generateSocialMediaPost({
      platform: body.platform || 'whatsapp',
      topic: body.topic,
      callToAction: body.callToAction || 'Hubungi kami sekarang!',
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
    const aiClient = new GeminiAIClient(env.GOOGLE_AI_API_KEY);
    const body = await request.json() as any;

    const result = await aiClient.improveExistingContent({
      content: body.content,
      improvements: body.improvements || ['Perbaiki grammar', 'Tingkatkan SEO'],
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

if (url.pathname === '/api/ai/variations' && request.method === 'POST') {
  try {
    const aiClient = new GeminiAIClient(env.GOOGLE_AI_API_KEY);
    const body = await request.json() as any;

    const result = await aiClient.generateVariations({
      content: body.content,
      count: body.count || 3,
      type: body.type || 'description',
    });

    return new Response(JSON.stringify({ variations: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
*/
