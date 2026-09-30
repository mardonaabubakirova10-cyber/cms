import { BlockDefinition } from '@/builder/registry/types';
import { GalleryBlock } from '@/builder/blocks/GalleryBlock';
import { StatisticsBlock } from '@/builder/blocks/StatisticsBlock';
import { PricingBlock } from '@/builder/blocks/PricingBlock';
import { TeamBlock } from '@/builder/blocks/TeamBlock';
import { ReviewsBlock } from '@/builder/blocks/ReviewsBlock';
import { FAQBlock } from '@/builder/blocks/FAQBlock';
import { ContactsBlock } from '@/builder/blocks/ContactsBlock';
import { FooterBlock } from '@/builder/blocks/FooterBlock';

export const galleryDefinition: BlockDefinition = {
  type: 'gallery',
  label: 'Gallery',
  category: 'content',
  description: 'Visual showcase grid for portfolios and products',
  variants: [{ id: 'grid4', label: '4 Columns Grid' }],
  createDefault: () => ({
    id: `blk_gallery_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'gallery',
    variant: 'grid4',
    content: {},
    styles: {},
  }),
  renderer: GalleryBlock,
};

export const statisticsDefinition: BlockDefinition = {
  type: 'statistics',
  label: 'Statistics',
  category: 'marketing',
  description: 'Key numerical metrics and credibility counters',
  variants: [{ id: 'counters', label: 'Counters' }],
  createDefault: () => ({
    id: `blk_statistics_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'statistics',
    variant: 'counters',
    content: {},
    styles: {},
  }),
  renderer: StatisticsBlock,
};

export const pricingDefinition: BlockDefinition = {
  type: 'pricing',
  label: 'Pricing Tables',
  category: 'marketing',
  description: 'Tiered subscription pricing plans table',
  variants: [{ id: 'cards3', label: '3 Tier Cards' }],
  createDefault: () => ({
    id: `blk_pricing_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'pricing',
    variant: 'cards3',
    content: {},
    styles: {},
  }),
  renderer: PricingBlock,
};

export const teamDefinition: BlockDefinition = {
  type: 'team',
  label: 'Team Members',
  category: 'content',
  description: 'Team and contributor profile cards',
  variants: [{ id: 'grid4', label: '4 Columns' }],
  createDefault: () => ({
    id: `blk_team_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'team',
    variant: 'grid4',
    content: {},
    styles: {},
  }),
  renderer: TeamBlock,
};

export const reviewsDefinition: BlockDefinition = {
  type: 'reviews',
  label: 'Client Reviews',
  category: 'marketing',
  description: 'Testimonials and social proof reviews',
  variants: [{ id: 'cards3', label: '3 Cards' }],
  createDefault: () => ({
    id: `blk_reviews_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'reviews',
    variant: 'cards3',
    content: {},
    styles: {},
  }),
  renderer: ReviewsBlock,
};

export const faqDefinition: BlockDefinition = {
  type: 'faq',
  label: 'FAQ Accordion',
  category: 'content',
  description: 'Frequently asked questions section',
  variants: [{ id: 'list', label: 'List' }],
  createDefault: () => ({
    id: `blk_faq_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'faq',
    variant: 'list',
    content: {},
    styles: {},
  }),
  renderer: FAQBlock,
};

export const contactsDefinition: BlockDefinition = {
  type: 'contacts',
  label: 'Contact Form',
  category: 'marketing',
  description: 'Direct contact details and lead submission form',
  variants: [{ id: 'split', label: 'Split Form & Info' }],
  createDefault: () => ({
    id: `blk_contacts_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'contacts',
    variant: 'split',
    content: {},
    styles: {},
  }),
  renderer: ContactsBlock,
};

export const footerDefinition: BlockDefinition = {
  type: 'footer',
  label: 'Site Footer',
  category: 'content',
  description: 'Copyright, links and footer area',
  variants: [{ id: 'simple', label: 'Simple Bar' }],
  createDefault: () => ({
    id: `blk_footer_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'footer',
    variant: 'simple',
    content: {},
    styles: {},
  }),
  renderer: FooterBlock,
};
