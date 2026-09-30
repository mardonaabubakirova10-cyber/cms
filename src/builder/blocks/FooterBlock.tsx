'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';

export const FooterBlock: React.FC<BlockRendererProps> = ({
  block,
  locale,
  breakpoint,
}) => {
  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 40,
    bottom: 40,
    left: 24,
    right: 24,
  };

  return (
    <footer
      style={{
        paddingTop: `${padding.top}px`,
        paddingBottom: `${padding.bottom}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,
      }}
      className="w-full bg-slate-950 text-slate-400 border-t border-slate-800 text-xs"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Visual Site Builder. Все права защищены.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-white cursor-pointer">Политика конфиденциальности</span>
          <span className="hover:text-white cursor-pointer">Условия сервиса</span>
          <span className="hover:text-white cursor-pointer">Контакты</span>
        </div>
      </div>
    </footer>
  );
};
