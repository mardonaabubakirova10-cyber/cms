'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { Star } from 'lucide-react';

export const ReviewsBlock: React.FC<BlockRendererProps> = ({
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

  const reviews = [
    { name: 'Михаил Т.', role: 'Startup Founder', text: 'Конструктор позволил собрать и экспортировать MVP за один вечер!' },
    { name: 'Ольга К.', role: 'Маркетолог', text: 'Удобная мультиязычность и визуальный контроль стилей без кода.' },
    { name: 'Сергей В.', role: 'Фрилансер', text: 'Чистый статический экспорт без лишнего мусора в разметке.' },
  ];

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
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl font-bold text-white">Отзывы клиентов</h2>
          <p className="text-slate-400 text-sm">Что говорят пользователи о конструкторе</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              <div>
                <p className="text-xs font-bold text-white">{r.name}</p>
                <p className="text-[10px] text-slate-500">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
