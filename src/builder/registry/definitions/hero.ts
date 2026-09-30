import { BlockDefinition } from '@/builder/registry/types';
import { HeroBlock } from '@/builder/blocks/HeroBlock';

export const heroDefinition: BlockDefinition = {
  type: 'hero',
  label: 'Hero Section',
  category: 'marketing',
  description: 'Main header section with centered or split content and CTA button',
  variants: [
    { id: 'centered', label: 'Centered', description: 'Centered title and subtitle' },
    { id: 'split', label: 'Split', description: 'Split text and media column' },
  ],
  createDefault: (variant = 'centered') => ({
    id: `blk_hero_${Date.now()}`,
    type: 'hero',
    variant,
    content: {
      title: {
        ru: 'Создавайте современные сайты за минуты',
        en: 'Build modern websites in minutes',
        uz: 'Zamonaviy veb-saytlarni bir necha daqiqada yarating',
      },
      subtitle: {
        ru: 'Визуальный конструктор с чистым кодом, поддержкой мультиязычности и мгновенным экспортом.',
        en: 'Visual builder with clean code, multi-language support, and instant static export.',
        uz: "Toza kod, ko'p tillilik va bir zumda eksportga ega vizual konstruktor.",
      },
      buttonText: {
        ru: 'Начать бесплатно',
        en: 'Get Started Free',
        uz: 'Bepul boshlash',
      },
    },
    styles: {
      spacing: {
        padding: {
          desktop: { top: 80, right: 24, bottom: 80, left: 24 },
          tablet: { top: 60, right: 20, bottom: 60, left: 20 },
          mobile: { top: 40, right: 16, bottom: 40, left: 16 },
        },
      },
    },
  }),
  renderer: HeroBlock,
  inspector: {
    content: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        path: 'title',
      },
      {
        name: 'subtitle',
        label: 'Subtitle',
        type: 'textarea',
        path: 'subtitle',
      },
      {
        name: 'buttonText',
        label: 'Button Text',
        type: 'text',
        path: 'buttonText',
      },
    ],
    style: [],
  },
};
