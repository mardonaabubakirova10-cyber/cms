'use client';

import React from 'react';
import { Page, Breakpoint, PageBlock } from '@/types/builder';
import { blockRegistry } from '@/builder/registry';
import { AlertTriangle } from 'lucide-react';
import { EditorBlockFrame } from '@/components/editor/EditorBlockFrame';

interface PageRendererProps {
  page: Page;
  locale?: string;
  breakpoint?: Breakpoint;
  mode?: 'editor' | 'preview' | 'export';
  selectedBlockId?: string | null;
  onSelectBlock?: (id: string | null) => void;
  onDeleteBlock?: (id: string) => void;
  onDuplicateBlock?: (id: string) => void;
  onMoveBlock?: (fromIndex: number, toIndex: number) => void;
  onUpdateBlockContent?: (blockId: string, path: string, value: unknown) => void;
  dragHandleProps?: Record<string, unknown>;
}

const UnknownBlockFallback: React.FC<{ block: PageBlock }> = ({ block }) => {
  return (
    <div className="p-6 my-4 rounded-xl border border-dashed border-amber-500/50 bg-amber-500/10 text-amber-300 flex items-center gap-3">
      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold">Unknown block type: {block.type}</p>
        <p className="text-xs text-amber-400/80">
          No definition found in BlockRegistry for type &quot;{block.type}&quot;.
        </p>
      </div>
    </div>
  );
};

export const PageRenderer: React.FC<PageRendererProps> = ({
  page,
  locale = 'ru',
  breakpoint = 'desktop',
  mode = 'editor',
  selectedBlockId,
  onSelectBlock,
  onDeleteBlock,
  onDuplicateBlock,
  onMoveBlock,
  onUpdateBlockContent,
}) => {
  if (!page.blocks || page.blocks.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        <p className="text-sm">Page is empty. Add blocks from the left sidebar.</p>
      </div>
    );
  }

  const visibleBlocks = page.blocks.filter((block) => !block.hidden);

  return (
    <div className="w-full flex flex-col">
      {visibleBlocks.map((block, index) => {
        const definition = blockRegistry.getBlockDefinition(block.type);

        if (!definition) {
          return <UnknownBlockFallback key={block.id} block={block} />;
        }

        const BlockComponent = definition.renderer;
        const isSelected = selectedBlockId === block.id;
        const isFirst = index === 0;
        const isLast = index === visibleBlocks.length - 1;

        if (mode === 'editor') {
          return (
            <EditorBlockFrame
              key={block.id}
              block={block}
              isSelected={isSelected}
              isFirst={isFirst}
              isLast={isLast}
              onSelect={() => onSelectBlock?.(block.id)}
              onDelete={onDeleteBlock ? () => onDeleteBlock(block.id) : undefined}
              onDuplicate={onDuplicateBlock ? () => onDuplicateBlock(block.id) : undefined}
              onMoveUp={onMoveBlock && !isFirst ? () => onMoveBlock(index, index - 1) : undefined}
              onMoveDown={onMoveBlock && !isLast ? () => onMoveBlock(index, index + 1) : undefined}
            >
              <BlockComponent
                block={block}
                locale={locale}
                breakpoint={breakpoint}
                mode={mode}
                isSelected={isSelected}
                onUpdateContent={(path, val) =>
                  onUpdateBlockContent?.(block.id, path, val)
                }
              />
            </EditorBlockFrame>
          );
        }

        return (
          <BlockComponent
            key={block.id}
            block={block}
            locale={locale}
            breakpoint={breakpoint}
            mode={mode}
            isSelected={false}
          />
        );
      })}
    </div>
  );
};
