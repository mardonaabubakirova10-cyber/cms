'use client';

import React from 'react';

export interface ToggleControlProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const ToggleControl: React.FC<ToggleControlProps> = ({
  label,
  description,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between py-1">
      <div>
        <span className="block text-xs font-medium text-slate-300">{label}</span>
        {description && (
          <span className="block text-[10px] text-slate-500">{description}</span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
          checked ? 'bg-indigo-600' : 'bg-slate-800'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};
