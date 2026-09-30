import { BlockDefinition } from '@/builder/registry/types';
import { TextImageBlock } from '@/builder/blocks/TextImageBlock';

export const textImageDefinition: BlockDefinition = {
  type: 'textImage',
  label: 'Text + Image',
  category: 'content',
  description: 'Two-column text with media showcase side-by-side',
  variants: [
    { id: 'imageRight', label: 'Image Right' },
    { id: 'imageLeft', label: 'Image Left' },
  ],
  createDefault: (variant = 'imageRight') => ({
    id: `blk_textImage_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'textImage',
    variant,
    content: {
      title: {
        ru: 'Создано для продуктивной работы',
        en: 'Engineered for High Productivity',
        uz: 'Samarali ishlash uchun yaratilgan',
      },
      description: {
        ru: 'Наш конструктор предоставляет полный контроль над каждым блоком, сохраняя при этом чистоту и скорость итогового сайта.',
        en: 'Our builder provides full control over every block while maintaining top-notch performance.',
        uz: 'Bizning konstruktor har bir blok ustidan toliq nazoratni taqdim etadi.',
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
  renderer: TextImageBlock,
};
