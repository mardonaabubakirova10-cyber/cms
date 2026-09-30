'use client';

import React from 'react';
import { PageRenderer } from '@/builder/renderer';
import { useEditorStore } from '@/store';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export const EditorCanvas: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const selectedPageId = useEditorStore((state) => state.selectedPageId);
  const selectedBlockId = useEditorStore((state) => state.selectedBlockId);
  const selectBlock = useEditorStore((state) => state.selectBlock);
  const currentBreakpoint = useEditorStore((state) => state.currentBreakpoint);
  const currentLocale = useEditorStore((state) => state.currentLocale);
  const removeBlock = useEditorStore((state) => state.removeBlock);
  const duplicateBlock = useEditorStore((state) => state.duplicateBlock);
  const moveBlock = useEditorStore((state) => state.moveBlock);
  const updateBlockContent = useEditorStore((state) => state.updateBlockContent);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!project) return null;

  const activePage =
    project.pages.find((p) => p.id === selectedPageId) || project.pages[0];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id && activePage) {
      const oldIndex = activePage.blocks.findIndex((b) => b.id === active.id);
      const newIndex = activePage.blocks.findIndex((b) => b.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        moveBlock(oldIndex, newIndex);
      }
    }
  };

  const getCanvasWidthClass = () => {
    switch (currentBreakpoint) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full max-w-[1200px]';
    }
  };

  return (
    <main
      onClick={() => selectBlock(null)}
      className="flex-1 h-full bg-slate-950 overflow-y-auto overflow-x-hidden p-6 flex flex-col items-center select-none"
    >
      <div className="w-full max-w-[1200px] flex items-center justify-between text-xs text-slate-500 mb-3 px-2">
        <span>
          Page: <strong className="text-slate-300 font-medium">{activePage?.title}</strong> ({activePage?.slug})
        </span>
        <span>
          Blocks count: <strong className="text-slate-300 font-medium">{activePage?.blocks.length || 0}</strong>
        </span>
      </div>

      {/* Viewport Frame with DndContext */}
      <div
        className={`bg-slate-900 border border-slate-800 rounded-lg shadow-2xl transition-all duration-300 min-h-[600px] mb-20 ${getCanvasWidthClass()}`}
      >
        {activePage && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activePage.blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              <PageRenderer
                page={activePage}
                locale={currentLocale}
                breakpoint={currentBreakpoint}
                mode="editor"
                selectedBlockId={selectedBlockId}
                onSelectBlock={(id) => selectBlock(id)}
                onDeleteBlock={(id) => removeBlock(id)}
                onDuplicateBlock={(id) => duplicateBlock(id)}
                onMoveBlock={(from, to) => moveBlock(from, to)}
                onUpdateBlockContent={(blockId, path, val) =>
                  updateBlockContent(blockId, path, val)
                }
              />
            </SortableContext>
          </DndContext>
        )}
      </div>
    </main>
  );
};
