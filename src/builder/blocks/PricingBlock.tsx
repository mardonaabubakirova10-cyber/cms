'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { Check } from 'lucide-react';

export const PricingBlock: React.FC<BlockRendererProps> = ({
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

  const plans = [
    { name: 'Starter', price: '$0', desc: 'Для пет-проектов и тестирования', featured: false },
    { name: 'Pro', price: '$29', desc: 'Для профессионалов и растущих команд', featured: true },
    { name: 'Enterprise', price: '$99', desc: 'Для крупного бизнеса и агентств', featured: false },
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
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Тарифные планы</h2>
          <p className="text-slate-400 text-sm">Прозрачные цены без скрытых платежей</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl border flex flex-col justify-between space-y-6 ${
                p.featured
                  ? 'bg-slate-950 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">{p.name}</h3>
                <p className="text-3xl font-extrabold text-white">{p.price}<span className="text-xs text-slate-400 font-normal">/мес</span></p>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                <ul className="space-y-2.5 pt-4 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Безлимитный экспорт</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Мультиязычность</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-400" /> Все типы секций</li>
                </ul>
              </div>
              <button
                className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  p.featured
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                Выбрать план
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
