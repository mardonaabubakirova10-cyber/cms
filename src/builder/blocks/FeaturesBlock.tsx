'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { Zap, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export const FeaturesBlock: React.FC<BlockRendererProps> = ({
  block,
  locale,
  breakpoint,
}) => {
  const isGrid4 = block.variant === 'grid4';

  const titleText =
    (block.content?.title as Record<string, string>)?.[locale] ||
    (block.content?.title as Record<string, string>)?.[Object.keys(block.content?.title || {})[0]] ||
    'Наши преимущества';

  const subtitleText =
    (block.content?.subtitle as Record<string, string>)?.[locale] ||
    (block.content?.subtitle as Record<string, string>)?.[Object.keys(block.content?.subtitle || {})[0]] ||
    'Все необходимые инструменты для быстрого запуска ваших проектов.';

  const defaultItems = [
    { title: 'Высокая скорость', desc: 'Мгновенный отклик и чистая сборка.' },
    { title: 'Надёжность', desc: 'Типизированная и проверенная архитектура.' },
    { title: 'Мультиязычность', desc: 'Поддержка перевода контента из коробки.' },
    { title: 'SEO-оптимизация', desc: 'Готовые метатеги и чистый HTML.' },
  ];

  const items = isGrid4 ? defaultItems : defaultItems.slice(0, 3);

  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 64,
    bottom: 64,
    left: 24,
    right: 24,
  };

  const icons = [Zap, Shield, Sparkles, CheckCircle2];

  return (
    <div
      style={{
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,
      }}
      className="w-full bg-slate-900 text-slate-100 border-t border-slate-800"
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

        <div
          className={`grid gap-6 ${
            isGrid4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 md:grid-cols-3'
          }`}
        >
          {items.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-200">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
