import { BlockDefinition } from '@/builder/registry/types';
import { FeaturesBlock } from '@/builder/blocks/FeaturesBlock';

export const featuresDefinition: BlockDefinition = {
  type: 'features',
  label: 'Features Grid',
  category: 'content',
  description: 'Grid showcasing key benefits and feature items',
  variants: [
    { id: 'grid3', label: '3 Columns' },
    { id: 'grid4', label: '4 Columns' },
  ],
  createDefault: (variant = 'grid3') => ({
    id: `blk_features_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'features',
    variant,
    content: {
      title: {
        ru: 'Наши преимущества',
        en: 'Our Key Features',
        uz: 'Bizning afzalliklarimiz',
      },
      subtitle: {
        ru: 'Все необходимые инструменты для быстрого запуска ваших проектов.',
        en: 'Everything you need to launch and scale your online presence.',
        uz: 'Loyihalaringizni tezda ishga tushirish uchun barcha kerakli vositalar.',
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
  renderer: FeaturesBlock,
};
