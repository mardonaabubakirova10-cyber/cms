'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { SiteProject, Breakpoint } from '@/types/builder';
import { projectRepository } from '@/repositories';
import { PageRenderer } from '@/builder/renderer';
import { generateGlobalCssVariables } from '@/builder/renderer/cssGenerator';
import { Monitor, Tablet, Smartphone, Globe, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PreviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = (params?.projectId as string) || 'proj_demo_01';
  const pageId = (params?.pageId as string) || 'page_home_01';

  const [project, setProject] = useState<SiteProject | null>(null);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');
  const [locale, setLocale] = useState<string>(searchParams.get('lang') || 'ru');

  useEffect(() => {
    async function load() {
      const data = await projectRepository.load(projectId);
      if (data) {
        setProject(data);
        if (!searchParams.get('lang')) {
          setLocale(data.defaultLocale || 'ru');
        }
      }
    }
    load();
  }, [projectId, searchParams]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-400">
        <p className="text-sm">Загрузка предпросмотра...</p>
      </div>
    );
  }

  const activePage =
    project.pages.find((p) => p.id === pageId || p.slug === pageId) ||
    project.pages[0];

  const cssVariables = generateGlobalCssVariables(project.globalStyles);

  const getCanvasWidthClass = () => {
    switch (breakpoint) {
      case 'mobile':
        return 'max-w-[375px] shadow-2xl border border-slate-800 my-6 rounded-2xl overflow-hidden';
      case 'tablet':
        return 'max-w-[768px] shadow-2xl border border-slate-800 my-6 rounded-2xl overflow-hidden';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <style dangerouslySetInnerHTML={{ __html: cssVariables }} />

      {/* Floating Preview Topbar */}
      <header className="h-12 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 flex items-center justify-between sticky top-0 z-50 select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/editor/demo"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Editor
          </Link>
          <span className="text-slate-700">|</span>
          <span className="text-xs text-slate-200 font-semibold">{activePage?.title}</span>
          <span className="text-[10px] text-slate-500 font-mono">/{activePage?.slug}</span>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setBreakpoint('desktop')}
            className={`p-1 rounded ${breakpoint === 'desktop' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setBreakpoint('tablet')}
            className={`p-1 rounded ${breakpoint === 'tablet' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'}`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setBreakpoint('mobile')}
            className={`p-1 rounded ${breakpoint === 'mobile' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Locales & Open New Tab */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-xs">
            <Globe className="w-3 h-3 text-slate-400" />
            {project.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={`px-1 py-0.2 rounded text-[10px] uppercase font-medium ${
                  locale === loc ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <a
            href={`/preview/${projectId}/${activePage.id}?lang=${locale}`}
            target="_blank"
            rel="noreferrer"
            className="p-1 text-slate-400 hover:text-white"
            title="Open in new window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Preview Container */}
      <main className="flex-1 flex justify-center bg-slate-950 overflow-y-auto">
        <div className={`transition-all duration-300 ${getCanvasWidthClass()}`}>
          {activePage && (
            <PageRenderer
              page={activePage}
              locale={locale}
              breakpoint={breakpoint}
              mode="preview"
            />
          )}
        </div>
      </main>
    </div>
  );
}
