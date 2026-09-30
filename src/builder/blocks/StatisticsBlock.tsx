'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';

export const StatisticsBlock: React.FC<BlockRendererProps> = ({
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

  const stats = [
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '150k+', label: 'Active Users' },
    { value: '50ms', label: 'Average Latency' },
    { value: '24/7', label: 'Global Support' },
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((st, idx) => (
            <div key={idx} className="space-y-2 p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <p className="text-3xl md:text-5xl font-extrabold text-indigo-400 tracking-tight">{st.value}</p>
              <p className="text-xs md:text-sm text-slate-400 font-medium">{st.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
