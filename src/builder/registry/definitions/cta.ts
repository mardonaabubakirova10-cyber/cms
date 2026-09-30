import { BlockDefinition } from '@/builder/registry/types';
import { CTABlock } from '@/builder/blocks/CTABlock';

export const ctaDefinition: BlockDefinition = {
  type: 'cta',
  label: 'Call to Action',
  category: 'marketing',
  description: 'High-converting conversion banner section',
  variants: [
    { id: 'banner', label: 'Full Banner' },
  ],
  createDefault: (variant = 'banner') => ({
    id: `blk_cta_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'cta',
    variant,
    content: {
      title: {
        ru: 'Готовы запустить свой сайт?',
        en: 'Ready to launch your website?',
        uz: 'Veb-saytingizni ishga tushirishga tayyormisiz?',
      },
      subtitle: {
        ru: 'Присоединяйтесь к тысячам создателей и соберите свой первый проект за считанные минуты.',
        en: 'Join thousands of creators building clean, lightning-fast static sites.',
        uz: "Minglab yaratuvchilarga qoshib, birinchi loyihangizni bir necha daqiqada yarating.",
      },
      buttonText: {
        ru: 'Попробовать бесплатно',
        en: 'Get Started Free',
        uz: 'Bepul boshlash',
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
  renderer: CTABlock,
};
