'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';

export const TeamBlock: React.FC<BlockRendererProps> = ({
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

  const members = [
    { name: 'Алексей Иванов', role: 'Lead Architect', tag: 'Architecture' },
    { name: 'Елена Смирнова', role: 'Product Designer', tag: 'UI / UX' },
    { name: 'Дмитрий Кузнецов', role: 'Fullstack Dev', tag: 'Engineering' },
    { name: 'Анна Новикова', role: 'SEO & Content', tag: 'Growth' },
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
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl font-bold text-white">Наша команда</h2>
          <p className="text-slate-400 text-sm">Эксперты, создающие лучший продукт для вас</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
              <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/20 flex items-center justify-center text-2xl font-bold text-indigo-400">
                {m.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{m.name}</p>
                <p className="text-xs text-indigo-400 font-medium">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
