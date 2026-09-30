'use client';

import React, { useEffect } from 'react';
import { EditorTopbar } from './EditorTopbar';
import { BlockLibrary } from './BlockLibrary';
import { EditorCanvas } from './EditorCanvas';
import { Inspector } from './Inspector';
import { useEditorStore } from '@/store';
import { blockRegistry } from '@/builder/registry';
import { generateGlobalCssVariables } from '@/builder/renderer/cssGenerator';

export const EditorShell: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const isDirty = useEditorStore((state) => state.isDirty);
  const loadProject = useEditorStore((state) => state.loadProject);
  const saveProject = useEditorStore((state) => state.saveProject);
  const addBlock = useEditorStore((state) => state.addBlock);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);

  // Load project on mount from localStorage
  useEffect(() => {
    loadProject('proj_demo_01');
  }, [loadProject]);

  // Debounced autosave (700ms)
  useEffect(() => {
    if (!isDirty) return;

    const timer = setTimeout(() => {
      saveProject();
    }, 700);

    return () => clearTimeout(timer);
  }, [isDirty, project, saveProject]);

  // Keyboard shortcuts: Ctrl/Cmd+Z (Undo) and Ctrl/Cmd+Shift+Z or Ctrl+Y (Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleAddBlock = (type: string) => {
    const newBlock = blockRegistry.createBlock(type);
    if (newBlock) {
      addBlock(newBlock);
    }
  };

  const cssVariables = project
    ? generateGlobalCssVariables(project.globalStyles)
    : '';

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 font-sans">
      {/* Injected Global Design Tokens */}
      {cssVariables && (
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      )}

      <EditorTopbar />
      <div className="flex flex-1 overflow-hidden">
        <BlockLibrary onAddBlock={handleAddBlock} />
        <EditorCanvas />
        <Inspector />
      </div>
    </div>
  );
};
