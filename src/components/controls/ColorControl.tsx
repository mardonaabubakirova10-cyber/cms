'use client';

import React from 'react';

export interface ColorControlProps {
  label: string;
  value?: string;
  defaultValue?: string;
  presets?: string[];
  onChange: (value: string) => void;
}

export const ColorControl: React.FC<ColorControlProps> = ({
  label,
  value = '#6366f1',
  presets = ['#6366f1', '#4f46e5', '#0f172a', '#1e293b', '#ffffff', '#10b981', '#f59e0b', '#ef4444'],
  onChange,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
        <span>{label}</span>
        <span className="font-mono text-[10px] text-slate-500 uppercase">{value}</span>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Color Presets */}
      <div className="flex items-center gap-1.5 pt-1">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            style={{ backgroundColor: preset }}
            className={`w-4 h-4 rounded-full border transition-transform hover:scale-125 ${
              value.toLowerCase() === preset.toLowerCase()
                ? 'border-indigo-400 ring-1 ring-indigo-400 scale-110'
                : 'border-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
