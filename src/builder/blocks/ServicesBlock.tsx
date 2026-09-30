'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { Code2, Palette, Globe2, ArrowRight } from 'lucide-react';

export const ServicesBlock: React.FC<BlockRendererProps> = ({
  block,
  locale,
  breakpoint,
}) => {
  const titleText =
    (block.content?.title as Record<string, string>)?.[locale] ||
    (block.content?.title as Record<string, string>)?.[Object.keys(block.content?.title || {})[0]] ||
    'Наши услуги';

  const subtitleText =
    (block.content?.subtitle as Record<string, string>)?.[locale] ||
    (block.content?.subtitle as Record<string, string>)?.[Object.keys(block.content?.subtitle || {})[0]] ||
    'Решения полного цикла от проектирования до запуска.';

  const services = [
    {
      title: 'Веб-разработка',
      desc: 'Создание быстрых и адаптивных сайтов любой сложности.',
      icon: Code2,
    },
    {
      title: 'UI/UX Дизайн',
      desc: 'Продуманные интерфейсы с фокусом на пользовательский опыт.',
      icon: Palette,
    },
    {
      title: 'SEO и локализация',
      desc: 'Продвижение и адаптация сайта для международных рынков.',
      icon: Globe2,
    },
  ];

  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 64,
    bottom: 64,
    left: 24,
    right: 24,
  };

  return (
    <div
      style={{
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,
      }}
      className="w-full bg-slate-950 text-slate-100 border-t border-slate-800/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {titleText}
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            {subtitleText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border border-slate-800 hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{srv.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Узнать больше</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
