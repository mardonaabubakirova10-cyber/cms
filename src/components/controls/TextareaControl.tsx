'use client';

import React from 'react';

interface TextareaControlProps {
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (val: string) => void;
}

export const TextareaControl: React.FC<TextareaControlProps> = ({
  label,
  value,
  placeholder,
  rows = 3,
  onChange,
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-[11px] font-medium text-slate-400">
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
      />
    </div>
  );
};
