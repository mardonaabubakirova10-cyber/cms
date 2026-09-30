'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { Mail, Phone, MapPin } from 'lucide-react';

export const ContactsBlock: React.FC<BlockRendererProps> = ({
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
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl font-bold text-white">Связаться с нами</h2>
          <p className="text-slate-400 text-sm">Оставьте заявку или напишите нам напрямую</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <Mail className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-sm font-semibold text-white">support@builder.dev</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <Phone className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-xs text-slate-400">Телефон</p>
                <p className="text-sm font-semibold text-white">+1 (800) 555-0199</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <MapPin className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-xs text-slate-400">Локация</p>
                <p className="text-sm font-semibold text-white">Global Remote Office</p>
              </div>
            </div>
          </div>
          <form className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <input type="text" placeholder="Ваше имя" className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white" />
            <input type="email" placeholder="Email" className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white" />
            <textarea rows={3} placeholder="Сообщение" className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-white resize-none" />
            <button type="button" className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
};
