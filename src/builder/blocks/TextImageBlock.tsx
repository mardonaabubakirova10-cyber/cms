'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';

export const TextImageBlock: React.FC<BlockRendererProps> = ({
  block,
  locale,
  breakpoint,
}) => {
  const isImageLeft = block.variant === 'imageLeft';

  const titleText =
    (block.content?.title as Record<string, string>)?.[locale] ||
    (block.content?.title as Record<string, string>)?.[Object.keys(block.content?.title || {})[0]] ||
    'Создано для продуктивной работы';

  const descText =
    (block.content?.description as Record<string, string>)?.[locale] ||
    (block.content?.description as Record<string, string>)?.[Object.keys(block.content?.description || {})[0]] ||
    'Наш конструктор предоставляет полный контроль над каждым блоком, сохраняя при этом чистоту и скорость итогового сайта.';

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
      className="w-full bg-slate-900 text-slate-100 border-t border-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
            isImageLeft ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className={`space-y-5 ${isImageLeft ? 'md:order-2' : 'md:order-1'}`}>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              О продукте
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              {titleText}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              {descText}
            </p>
            <div className="pt-2">
              <button className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow">
                Подробнее
              </button>
            </div>
          </div>

          <div
            className={`h-72 md:h-96 rounded-2xl bg-gradient-to-tr from-slate-950 to-indigo-950/40 border border-slate-800 flex items-center justify-center p-8 text-center ${
              isImageLeft ? 'md:order-1' : 'md:order-2'
            }`}
          >
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl font-bold">
                🖼️
              </div>
              <p className="text-sm font-medium text-slate-300">Feature Media / Mockup</p>
              <p className="text-xs text-slate-500">1200x800 recommended</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
