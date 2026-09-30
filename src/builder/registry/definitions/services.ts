import { BlockDefinition } from '@/builder/registry/types';
import { ServicesBlock } from '@/builder/blocks/ServicesBlock';

export const servicesDefinition: BlockDefinition = {
  type: 'services',
  label: 'Services Cards',
  category: 'marketing',
  description: 'Showcase services or offerings with icons and details',
  variants: [
    { id: 'cards', label: 'Cards Grid' },
  ],
  createDefault: (variant = 'cards') => ({
    id: `blk_services_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'services',
    variant,
    content: {
      title: {
        ru: 'Наши услуги',
        en: 'Our Services',
        uz: 'Bizning xizmatlarimiz',
      },
      subtitle: {
        ru: 'Решения полного цикла от проектирования до запуска.',
        en: 'End-to-end solutions from architecture to production launch.',
        uz: 'Loyihalashdan tortib ishga tushirishgacha toliq yechimlar.',
      },
    },
    styles: {
      spacing: {
        padding: {
          desktop: { top: 64, right: 24, bottom: 64, left: 24 },
          tablet: { top: 48, right: 20, bottom: 48, left: 20 },
          mobile: { top: 36, right: 16, bottom: 36, left: 16 },
        },
      },
    },
  }),
  renderer: ServicesBlock,
};
