'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';

export interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  defaultValue?: number;
  onChange: (value: number) => void;
  onReset?: () => void;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value = 0,
  min,
  max,
  step = 1,
  unit = 'px',
  defaultValue,
  onChange,
  onReset,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
        <span>{label}</span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const num = Number(e.target.value);
              if (!isNaN(num)) onChange(num);
            }}
            className="w-12 bg-slate-950 border border-slate-800 rounded px-1 py-0.5 text-right font-mono text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          {unit && <span className="text-[10px] text-slate-500">{unit}</span>}
          {onReset && defaultValue !== undefined && (
            <button
              onClick={onReset}
              title="Reset to default"
              className="p-1 hover:text-slate-200 text-slate-500 rounded transition-colors ml-0.5"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-slate-800/80"
        />
      </div>
    </div>
  );
};
