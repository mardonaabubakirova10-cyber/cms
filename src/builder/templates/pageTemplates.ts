import { PageBlock } from '@/types/builder';
import { blockRegistry } from '@/builder/registry';

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'corporate' | 'services' | 'about' | 'contacts';
  createBlocks: () => PageBlock[];
}

export const pageTemplates: PageTemplate[] = [
  {
    id: 'landing_template',
    name: 'Landing Page Pro',
    description: 'Hero, Features, Statistics, Services, Pricing, Reviews, CTA, Footer',
    category: 'landing',
    createBlocks: () => [
      blockRegistry.createBlock('hero', 'centered')!,
      blockRegistry.createBlock('features', 'grid4')!,
      blockRegistry.createBlock('statistics', 'counters')!,
      blockRegistry.createBlock('services', 'cards')!,
      blockRegistry.createBlock('pricing', 'cards3')!,
      blockRegistry.createBlock('reviews', 'cards3')!,
      blockRegistry.createBlock('cta', 'banner')!,
      blockRegistry.createBlock('footer', 'simple')!,
    ].filter(Boolean),
  },
  {
    id: 'corporate_template',
    name: 'Corporate Showcase',
    description: 'Hero Split, Text+Image, Team, Gallery, Contacts, Footer',
    category: 'corporate',
    createBlocks: () => [
      blockRegistry.createBlock('hero', 'split')!,
      blockRegistry.createBlock('textImage', 'imageRight')!,
      blockRegistry.createBlock('team', 'grid4')!,
      blockRegistry.createBlock('gallery', 'grid4')!,
      blockRegistry.createBlock('contacts', 'split')!,
      blockRegistry.createBlock('footer', 'simple')!,
    ].filter(Boolean),
  },
  {
    id: 'services_template',
    name: 'Services & FAQ',
    description: 'Hero, Services, Features, FAQ, CTA, Footer',
    category: 'services',
    createBlocks: () => [
      blockRegistry.createBlock('hero', 'centered')!,
      blockRegistry.createBlock('services', 'cards')!,
      blockRegistry.createBlock('features', 'grid3')!,
      blockRegistry.createBlock('faq', 'list')!,
      blockRegistry.createBlock('cta', 'banner')!,
      blockRegistry.createBlock('footer', 'simple')!,
    ].filter(Boolean),
  },
  {
    id: 'about_template',
    name: 'About Company',
    description: 'Hero Split, Text+Image, Statistics, Team, Footer',
    category: 'about',
    createBlocks: () => [
      blockRegistry.createBlock('hero', 'split')!,
      blockRegistry.createBlock('textImage', 'imageLeft')!,
      blockRegistry.createBlock('statistics', 'counters')!,
      blockRegistry.createBlock('team', 'grid4')!,
      blockRegistry.createBlock('footer', 'simple')!,
    ].filter(Boolean),
  },
  {
    id: 'contacts_template',
    name: 'Contact & Support',
    description: 'Hero, Contacts, FAQ, Footer',
    category: 'contacts',
    createBlocks: () => [
      blockRegistry.createBlock('hero', 'centered')!,
      blockRegistry.createBlock('contacts', 'split')!,
      blockRegistry.createBlock('faq', 'list')!,
      blockRegistry.createBlock('footer', 'simple')!,
    ].filter(Boolean),
  },
];
