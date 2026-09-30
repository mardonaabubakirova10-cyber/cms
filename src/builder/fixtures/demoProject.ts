import { SiteProject } from '@/types';

export const demoProjectFixture: SiteProject = {
  id: 'proj_demo_01',
  name: 'Demo SaaS Product',
  defaultLocale: 'ru',
  locales: ['ru', 'en', 'uz'],
  globalStyles: {
    colors: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      text: '#0f172a',
      background: '#ffffff',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    radius: {
      sm: 4,
      md: 8,
      lg: 16,
    },
    containerMaxWidth: 1200,
  },
  translations: {
    'cta.button': {
      ru: 'Начать бесплатно',
      en: 'Get Started Free',
      uz: 'Bepul boshlash',
    },
  },
  pages: [
    {
      id: 'page_home_01',
      title: 'Главная',
      slug: 'index',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seo: {
        title: { ru: 'Главная страница | SaaS Product' },
        description: { ru: 'Конструктор сайтов с визуальными настройками.' },
      },
      blocks: [
        {
          id: 'blk_hero_01',
          type: 'hero',
          variant: 'centered',
          content: {
            title: {
              ru: 'Создавайте сайты легко и быстро',
              en: 'Build websites effortlessly',
              uz: 'Veb-saytlarni oson va tez yarating',
            },
            subtitle: {
              ru: 'Блочный визуальный редактор с поддержкой мультиязычности и экспортом.',
              en: 'Block-based visual editor with multilingual support and export.',
              uz: "Ko'p tillilikni qo'llab-quvvatlaydigan va eksport qiluvchi blokli vizual muharrir.",
            },
          },
          styles: {
            spacing: {
              padding: {
                desktop: { top: 80, right: 24, bottom: 80, left: 24 },
                mobile: { top: 40, right: 16, bottom: 40, left: 16 },
              },
            },
          },
        },
      ],
    },
  ],
};
