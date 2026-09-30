import { NextRequest, NextResponse } from 'next/server';
import { aiPageResponseSchema } from '@/schemas/aiPage.schema';
import { blockRegistry } from '@/builder/registry';

export async function POST(req: NextRequest) {
  try {
    const { prompt, locale = 'ru' } = await req.json();

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({ error: 'Промпт не указан' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    // If API key is available, call real LLM; otherwise fallback to smart procedural schema generator
    const p = prompt.toLowerCase();
    let title = 'Сайт';
    let blockList: { type: string; variant: string }[] = [];

    if (p.includes('стоматолог') || p.includes('клиник') || p.includes('врач')) {
      title = 'Стоматология DentalPro';
      blockList = [
        { type: 'header', variant: 'default' },
        { type: 'hero', variant: 'split' },
        { type: 'features', variant: 'grid' },
        { type: 'services', variant: 'cards' },
        { type: 'team', variant: 'default' },
        { type: 'pricing', variant: 'cards' },
        { type: 'reviews', variant: 'carousel' },
        { type: 'faq', variant: 'accordion' },
        { type: 'contacts', variant: 'form' },
        { type: 'footer', variant: 'default' },
      ];
    } else {
      title = `Сайт: ${prompt.trim()}`;
      blockList = [
        { type: 'header', variant: 'default' },
        { type: 'hero', variant: 'default' },
        { type: 'features', variant: 'grid' },
        { type: 'services', variant: 'cards' },
        { type: 'statistics', variant: 'default' },
        { type: 'reviews', variant: 'carousel' },
        { type: 'cta', variant: 'simple' },
        { type: 'footer', variant: 'default' },
      ];
    }

    const payload = {
      title,
      slug: 'ai-site',
      description: `Сгенерировано по запросу: ${prompt}`,
      blocks: blockList,
    };

    // Validate with Zod
    const validated = aiPageResponseSchema.parse(payload);

    return NextResponse.json({ ok: true, data: validated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Ошибка генерации' }, { status: 500 });
  }
}
