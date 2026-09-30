'use client';

import React from 'react';

export interface SegmentedOption<T extends string | number> {
  label: React.ReactNode;
  value: T;
  title?: string;
}

export interface SegmentedControlProps<T extends string | number> {
  label: string;
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium text-slate-400">
        {label}
      </label>
      <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            title={opt.title}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-all flex items-center justify-center ${
              value === opt.value
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
