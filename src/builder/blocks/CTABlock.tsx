'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';

export const CTABlock: React.FC<BlockRendererProps> = ({
  block,
  locale,
  breakpoint,
}) => {
  const titleText =
    (block.content?.title as Record<string, string>)?.[locale] ||
    (block.content?.title as Record<string, string>)?.[Object.keys(block.content?.title || {})[0]] ||
    'Готовы запустить свой сайт?';

  const subtitleText =
    (block.content?.subtitle as Record<string, string>)?.[locale] ||
    (block.content?.subtitle as Record<string, string>)?.[Object.keys(block.content?.subtitle || {})[0]] ||
    'Присоединяйтесь к тысячам создателей и соберите свой первый проект за считанные минуты.';

  const buttonText =
    (block.content?.buttonText as Record<string, string>)?.[locale] ||
    (block.content?.buttonText as Record<string, string>)?.[Object.keys(block.content?.buttonText || {})[0]] ||
    'Попробовать бесплатно';

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
      className="w-full bg-slate-950 text-slate-100 border-t border-slate-800 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10 p-10 md:p-14 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 shadow-2xl">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          {titleText}
        </h2>
        <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          {subtitleText}
        </p>
        <button className="px-8 py-3.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
