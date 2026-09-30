import { Page, PageBlock } from '@/types/builder';
import { blockRegistry } from '@/builder/registry';
import { aiPageResponseSchema, AIPageResponse } from '@/schemas/aiPage.schema';

export interface AIService {
  generatePageFromPrompt(prompt: string, locale?: string): Promise<Page>;
}

export class MockAIService implements AIService {
  async generatePageFromPrompt(prompt: string, locale: string = 'ru'): Promise<Page> {
    // Simulate AI generation network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const p = prompt.toLowerCase();
    let topicName = 'Лендинг';
    let blockTypes: string[] = ['header', 'hero', 'features', 'services', 'reviews', 'cta', 'footer'];

    if (p.includes('стоматолог') || p.includes('клиник') || p.includes('врач') || p.includes('dental')) {
      topicName = 'Стоматологическая клиника "ДентаЛюкс"';
      blockTypes = ['header', 'hero', 'features', 'services', 'team', 'pricing', 'reviews', 'faq', 'contacts', 'footer'];
    } else if (p.includes('ресторан') || p.includes('кафе') || p.includes('еда') || p.includes('кофе')) {
      topicName = 'Ресторан авторской кухни "Gourmet"';
      blockTypes = ['header', 'hero', 'features', 'gallery', 'pricing', 'reviews', 'contacts', 'footer'];
    } else if (p.includes('it') || p.includes('саас') || p.includes('saas') || p.includes('приложен') || p.includes('app')) {
      topicName = 'TechFlow — Инновационная облачная платформа';
      blockTypes = ['header', 'hero', 'statistics', 'features', 'services', 'pricing', 'faq', 'cta', 'footer'];
    } else {
      topicName = `Проект: ${prompt.slice(0, 30)}`;
    }

    // Build blocks from registry
    const blocks: PageBlock[] = [];
    for (const type of blockTypes) {
      const block = blockRegistry.createBlock(type);
      if (block) {
        // Customise content title if available
        if (type === 'hero' && block.content?.title) {
          (block.content.title as Record<string, string>)[locale] = topicName;
          (block.content.subtitle as Record<string, string>)[locale] = `Современные решения и профессиональный сервис по теме "${prompt}"`;
        }
        blocks.push(block);
      }
    }

    const newPage: Page = {
      id: `page_ai_${Date.now()}`,
      title: topicName,
      slug: `page-${Date.now().toString().slice(-4)}`,
      status: 'published',
      blocks,
      seo: {
        title: { [locale]: topicName },
        description: { [locale]: `Страница создана с помощью ИИ генератора по запросу: ${prompt}` },
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return newPage;
  }
}

export const aiService = new MockAIService();
