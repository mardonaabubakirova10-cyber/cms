'use client';

import React from 'react';
import { Trash2, Copy, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { PageBlock } from '@/types/builder';
import { blockRegistry } from '@/builder/registry';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EditorBlockFrameProps {
  block: PageBlock;
  isSelected: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onSelect: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: React.ReactNode;
}

export const EditorBlockFrame: React.FC<EditorBlockFrameProps> = ({
  block,
  isSelected,
  isFirst = false,
  isLast = false,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  children,
}) => {
  const definition = blockRegistry.getBlockDefinition(block.type);
  const blockLabel = definition?.label || block.type;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`relative transition-all group cursor-pointer ${
        isSelected
          ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950 z-10'
          : 'hover:ring-1 hover:ring-indigo-400/50'
      } ${isDragging ? 'shadow-2xl z-50 ring-2 ring-indigo-400' : ''}`}
    >
      {/* Top Floating Controls Bar */}
      <div
        className={`absolute top-2 left-3 right-3 flex items-center justify-between pointer-events-none z-20 transition-opacity ${
          isSelected || isDragging
            ? 'opacity-100'
            : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {/* Drag Handle, Move Arrows & Label Tag */}
        <div className="flex items-center gap-1 pointer-events-auto">
          <div
            {...attributes}
            {...listeners}
            className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-lg backdrop-blur cursor-grab active:cursor-grabbing hover:bg-slate-800"
            title="Зажмите и перетащите блок (Drag & Drop)"
          >
            <GripVertical className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-400" />
            <span className="font-semibold text-indigo-400">{blockLabel}</span>
            <span className="text-slate-400 text-[10px]">({block.variant})</span>
          </div>

          {/* Quick 1-Click Move Up / Down Buttons */}
          <div className="flex items-center bg-slate-900/90 border border-slate-700/80 rounded p-0.5 shadow-lg backdrop-blur">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp?.();
              }}
              disabled={isFirst}
              title="Передвинуть блок вверх"
              className={`p-1 rounded transition-colors ${
                isFirst
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown?.();
              }}
              disabled={isLast}
              title="Передвинуть блок вниз"
              className={`p-1 rounded transition-colors ${
                isLast
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/80 rounded p-0.5 shadow-lg backdrop-blur pointer-events-auto">
          {onDuplicate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              title="Duplicate block"
              className="p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Delete block"
              className="p-1 hover:bg-rose-900/50 rounded text-rose-400 hover:text-rose-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};
