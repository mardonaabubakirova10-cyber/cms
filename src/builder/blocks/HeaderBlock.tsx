'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';

export const HeaderBlock: React.FC<BlockRendererProps> = ({
  block,
  locale,
  breakpoint,
}) => {
  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 16,
    bottom: 16,
    left: 24,
    right: 24,
  };

  const navLinks = [
    { label: 'Главная', href: '#' },
    { label: 'Услуги', href: '#services' },
    { label: 'О компании', href: '#about' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <header
      style={{
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,
      }}
      className="w-full bg-slate-900/90 backdrop-blur border-b border-slate-800 text-slate-100 select-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="w-3 h-3 rounded-full bg-indigo-500" />
          <span>BrandLogo</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow">
            Связаться
          </button>
        </div>
      </div>
    </header>
  );
};
