import { LocalizedText, PageSEO } from './builder';

export interface Category {
  id: string;
  name: LocalizedText;
  slug: string;
}

export interface ArticleBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'quote' | 'list' | 'code';
  content: Record<string, unknown>;
}

export interface Post {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  cover?: string;
  categoryIds: string[];
  blocks: ArticleBlock[];
  status: 'draft' | 'published';
  publishedAt?: string;
  seo: PageSEO;
}

export interface MediaAsset {
  id: string;
  url: string;
  alt: LocalizedText;
  name: string;
  sizeBytes?: number;
  mimeType?: string;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  label: LocalizedText;
  type: 'page' | 'external';
  target: string; // pageId or URL
}

export interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
}
