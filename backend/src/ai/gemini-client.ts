/**
 * HS Copy Center - AI Content Generator (FREE VERSION)
 * Google AI (Gemini) Client
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
}

export class GeminiAIClient {
  private apiKey: string;
  private model = 'gemini-2.0-flash';
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(
    prompt: string,
    systemPrompt?: string,
    maxTokens: number = 2000
  ): Promise<string> {
    const url = `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`;

    const contents = [];

    if (systemPrompt) {
      contents.push({ role: 'user', parts: [{ text: `[System]: ${systemPrompt}` }] });
      contents.push({ role: 'model', parts: [{ text: 'Understood.' }] });
    }

    contents.push({ role: 'user', parts: [{ text: prompt }] });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
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
  }

  async generateServiceDescription(params: {
    serviceName: string;
    category: string;
    features: string[];
    tone: 'professional' | 'casual' | 'technical';
    targetAudience: string;
  }) {
    const prompt = `
Buatkan deskripsi layanan untuk bisnis fotocopy:
Nama: ${params.serviceName}
Kategori: ${params.category}
Fitur: ${params.features.join(', ')}
Tone: ${params.tone}
Target: ${params.targetAudience}

Response JSON only:
{"short": "...", "long": "...", "tagline": "...", "keywords": ["...", "..."]}
    `.trim();

    const response = await this.generateContent(prompt, 'Copywriter Indonesia. Response JSON only.', 1500);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON');
    return JSON.parse(jsonMatch[0]);
  }

  async generateBlogArticle(params: {
    topic: string;
    keywords: string[];
    tone: string;
    length: string;
  }) {
    const wordCount: Record<string, number> = { short: 500, medium: 1000, long: 1500 };
    const prompt = `
Tulis artikel blog:
Topik: ${params.topic}
Keywords: ${params.keywords.join(', ')}
Tone: ${params.tone}
Panjang: ~${wordCount[params.length] || 1000} kata

Response JSON only:
{"title": "...", "metaDescription": "...", "outline": ["..."], "content": "...", "tags": ["..."]}
    `.trim();

    const response = await this.generateContent(prompt, 'Content writer Indonesia. Response JSON only.', 3000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON');
    return JSON.parse(jsonMatch[0]);
  }

  async generateSocialMediaPost(params: {
    platform: string;
    topic: string;
    callToAction: string;
    includeEmojis: boolean;
  }) {
    const prompt = `
Buatkan post ${params.platform}:
Topik: ${params.topic}
CTA: ${params.callToAction}
Emoji: ${params.includeEmojis ? 'Ya' : 'Tidak'}

Response JSON only:
{"caption": "...", "hashtags": ["..."], "characterCount": 123}
    `.trim();

    const response = await this.generateContent(prompt, 'Social media expert. Response JSON only.', 1000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON');
    return JSON.parse(jsonMatch[0]);
  }

  async improveExistingContent(params: { content: string; improvements: string[] }) {
    const prompt = `
Perbaiki konten:
${params.content}

Improvements: ${params.improvements.join(', ')}

Response JSON only:
{"original": "...", "improved": "...", "changes": ["..."]}
    `.trim();

    const response = await this.generateContent(prompt, undefined, 2000);
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid JSON');
    return JSON.parse(jsonMatch[0]);
  }

  async generateVariations(params: { content: string; count: number; type: string }) {
    const prompt = `
Buatkan ${params.count} variasi ${params.type}:
${params.content}

Response JSON array only: ["Variasi 1", "Variasi 2"]
    `.trim();

    const response = await this.generateContent(prompt, undefined, 1000);
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Invalid JSON');
    return JSON.parse(jsonMatch[0]);
  }
}
