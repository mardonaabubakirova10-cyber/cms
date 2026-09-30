'use client';

import React, { useState } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Save,
  Globe,
  Eye,
  Download,
  Loader2,
} from 'lucide-react';
import { useEditorStore } from '@/store';
import Link from 'next/link';
import { ExportService } from '@/builder/export';

export const EditorTopbar: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const selectedPageId = useEditorStore((state) => state.selectedPageId);
  const currentBreakpoint = useEditorStore((state) => state.currentBreakpoint);
  const setBreakpoint = useEditorStore((state) => state.setBreakpoint);
  const currentLocale = useEditorStore((state) => state.currentLocale);
  const setLocale = useEditorStore((state) => state.setLocale);
  const past = useEditorStore((state) => state.past);
  const future = useEditorStore((state) => state.future);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const saveProject = useEditorStore((state) => state.saveProject);

  const [isExporting, setIsExporting] = useState(false);

  if (!project) return null;

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const zipBlob = await ExportService.exportHomeProjectZip(project, currentLocale);
      const filename = `${project.name.toLowerCase().replace(/\s+/g, '-')}-export.zip`;
      ExportService.downloadBlob(zipBlob, filename);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Ошибка при экспорте проекта: ' + (err as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between select-none">
      {/* Left: Project title & logo */}
      <div className="flex items-center gap-3">
        <div className="font-semibold text-slate-100 text-sm flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          {project.name}
        </div>
        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
          MVP Editor
        </span>
      </div>

      {/* Center: Viewport breakpoints */}
      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
        <button
          onClick={() => setBreakpoint('desktop')}
          className={`p-1.5 rounded transition-colors ${
            currentBreakpoint === 'desktop'
              ? 'bg-slate-800 text-indigo-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Desktop view"
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => setBreakpoint('tablet')}
          className={`p-1.5 rounded transition-colors ${
            currentBreakpoint === 'tablet'
              ? 'bg-slate-800 text-indigo-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Tablet view"
        >
          <Tablet className="w-4 h-4" />
        </button>
        <button
          onClick={() => setBreakpoint('mobile')}
          className={`p-1.5 rounded transition-colors ${
            currentBreakpoint === 'mobile'
              ? 'bg-slate-800 text-indigo-400 font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Mobile view"
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-slate-400 mr-2">
          <button
            onClick={undo}
            disabled={past.length === 0}
            className={`p-1.5 rounded transition-colors ${
              past.length > 0
                ? 'hover:text-slate-200 hover:bg-slate-800 text-slate-300'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={future.length === 0}
            className={`p-1.5 rounded transition-colors ${
              future.length > 0
                ? 'hover:text-slate-200 hover:bg-slate-800 text-slate-300'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Locale switcher */}
        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-2 py-1 rounded text-xs text-slate-300 mr-2">
          <Globe className="w-3.5 h-3.5 text-slate-400 mr-1" />
          {project.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => setLocale(loc)}
              className={`px-1.5 py-0.5 rounded uppercase font-medium text-[10px] transition-colors ${
                currentLocale === loc
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        <Link
          href={`/preview/${project.id}/${selectedPageId || project.pages[0]?.id}?lang=${currentLocale}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          Preview
        </Link>

        <button
          onClick={() => saveProject()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shadow"
        >
          <Save className="w-3.5 h-3.5" />
          Save
        </button>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-700 disabled:opacity-50"
        >
          {isExporting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          {isExporting ? 'Exporting…' : 'Export'}
        </button>
      </div>
    </header>
  );
};
