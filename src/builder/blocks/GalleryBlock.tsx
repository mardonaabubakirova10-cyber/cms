'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';

export const GalleryBlock: React.FC<BlockRendererProps> = ({
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

  const images = [
    { title: 'Project Alpha', tag: 'Web Design' },
    { title: 'Mobile App', tag: 'iOS & Android' },
    { title: 'Brand Identity', tag: 'Branding' },
    { title: 'E-commerce Platform', tag: 'Development' },
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
          <h2 className="text-3xl font-bold text-white">Галерея проектов</h2>
          <p className="text-slate-400 text-sm">Примеры наших недавних работ и кейсов</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((item, idx) => (
            <div
              key={idx}
              className="h-60 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-end p-4 hover:border-indigo-500/50 transition-all group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              <div className="relative z-20 space-y-1">
                <span className="text-[10px] text-indigo-400 font-semibold uppercase">{item.tag}</span>
                <p className="text-sm font-bold text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
