'use client';

import React, { useState } from 'react';
import { Link2, Unlink } from 'lucide-react';
import { SpacingValue } from '@/types/builder';

export interface SpacingControlProps {
  label: string;
  value?: SpacingValue;
  onChange: (value: SpacingValue) => void;
}

export const SpacingControl: React.FC<SpacingControlProps> = ({
  label,
  value = { top: 0, right: 0, bottom: 0, left: 0 },
  onChange,
}) => {
  const [isLinked, setIsLinked] = useState(
    value.top === value.right &&
    value.right === value.bottom &&
    value.bottom === value.left
  );

  const handleLinkedChange = (val: number) => {
    onChange({
      top: val,
      right: val,
      bottom: val,
      left: val,
    });
  };

  const handleSideChange = (side: keyof SpacingValue, val: number) => {
    if (isLinked) {
      handleLinkedChange(val);
    } else {
      onChange({
        ...value,
        [side]: val,
      });
    }
  };

  return (
    <div className="space-y-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
      <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
        <span>{label}</span>
        <button
          onClick={() => setIsLinked(!isLinked)}
          title={isLinked ? 'Unlink values' : 'Link all values'}
          className={`p-1 rounded transition-colors flex items-center gap-1 text-[10px] ${
            isLinked
              ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {isLinked ? <Link2 className="w-3 h-3" /> : <Unlink className="w-3 h-3" />}
          <span>{isLinked ? 'Linked' : 'Custom'}</span>
        </button>
      </div>

      {isLinked ? (
        <div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={160}
              step={4}
              value={value.top || 0}
              onChange={(e) => handleLinkedChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-slate-800"
            />
            <input
              type="number"
              min={0}
              max={240}
              value={value.top || 0}
              onChange={(e) => handleLinkedChange(Number(e.target.value))}
              className="w-12 bg-slate-900 border border-slate-800 rounded px-1 py-0.5 text-right font-mono text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div>
            <span className="text-slate-500 block mb-0.5">Top</span>
            <input
              type="number"
              min={0}
              max={240}
              value={value.top || 0}
              onChange={(e) => handleSideChange('top', Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Right</span>
            <input
              type="number"
              min={0}
              max={240}
              value={value.right || 0}
              onChange={(e) => handleSideChange('right', Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Bottom</span>
            <input
              type="number"
              min={0}
              max={240}
              value={value.bottom || 0}
              onChange={(e) => handleSideChange('bottom', Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">Left</span>
            <input
              type="number"
              min={0}
              max={240}
              value={value.left || 0}
              onChange={(e) => handleSideChange('left', Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
