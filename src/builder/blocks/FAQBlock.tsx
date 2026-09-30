'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';

export const FAQBlock: React.FC<BlockRendererProps> = ({
  block,
  locale,
  breakpoint,
}) => {
  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 64,
    bottom: 64,
    left: 24,
    right: 24,
  };

  const faqs = [
    { q: 'Как происходит экспорт сайта?', a: 'Вы получаете чистый ZIP-архив с HTML, CSS и assets, готовый для деплоя на любой хостинг.' },
    { q: 'Нужен ли backend для работы сайта?', a: 'Нет, экспортированный сайт является статическим и работает автономно.' },
    { q: 'Поддерживается ли мультиязычность?', a: 'Да, вы можете создавать переводы для RU, EN, UZ прямо в визуальном редакторе.' },
  ];

  return (
    <div
      style={{
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,
      }}
      className="w-full bg-slate-950 text-slate-100 border-t border-slate-800"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Частые вопросы (FAQ)</h2>
          <p className="text-slate-400 text-sm">Ответы на популярные вопросы о платформе</p>
        </div>
        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <p className="text-sm font-semibold text-white">{f.q}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
