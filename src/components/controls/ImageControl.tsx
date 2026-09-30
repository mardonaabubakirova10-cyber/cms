'use client';

import React from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { MediaAsset } from '@/types/cms';

interface ImageControlProps {
  label: string;
  value?: string;
  alt?: string;
  onChange: (url: string, alt?: string) => void;
  mediaAssets?: MediaAsset[];
}

export const ImageControl: React.FC<ImageControlProps> = ({
  label,
  value = '',
  onChange,
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium text-slate-400">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 overflow-hidden flex-shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </div>
        <input
          type="text"
          placeholder="https://..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
        />
        <button
          type="button"
          title="Upload or pick media"
          onClick={() => {
            const demoUrl = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';
            onChange(demoUrl);
          }}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
        >
          <Upload className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
