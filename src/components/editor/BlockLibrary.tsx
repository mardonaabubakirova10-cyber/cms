'use client';

import React, { useState } from 'react';
import {
  Plus,
  Search,
  Layers,
  LayoutGrid,
  FileText,
  Trash2,
  Edit2,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { blockRegistry } from '@/builder/registry';
import { useEditorStore } from '@/store';
import { pageTemplates } from '@/builder/templates/pageTemplates';
import { AIPromptModal } from './AIPromptModal';

interface BlockLibraryProps {
  onAddBlock?: (type: string, variant?: string) => void;
}

export const BlockLibrary: React.FC<BlockLibraryProps> = ({ onAddBlock }) => {
  const [activeTab, setActiveTab] = useState<'blocks' | 'pages' | 'templates'>('blocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Pages state
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingSlug, setEditingSlug] = useState('');

  const project = useEditorStore((state) => state.project);
  const selectedPageId = useEditorStore((state) => state.selectedPageId);
  const selectPage = useEditorStore((state) => state.selectPage);
  const addPage = useEditorStore((state) => state.addPage);
  const removePage = useEditorStore((state) => state.removePage);
  const renamePage = useEditorStore((state) => state.renamePage);

  const registeredBlocks = blockRegistry.getAllBlocks();

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'content', label: 'Content' },
  ];

  const filteredBlocks = registeredBlocks.filter((b) => {
    const matchesCategory =
      selectedCategory === 'all' || b.category === selectedCategory;
    const matchesSearch =
      b.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle.trim()) return;
    const slug = newPageSlug.trim() || newPageTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    addPage(newPageTitle.trim(), slug);
    setNewPageTitle('');
    setNewPageSlug('');
    setIsAddingPage(false);
  };

  const handleCreateFromTemplate = (tmpl: typeof pageTemplates[0]) => {
    const slug = tmpl.category + '-' + Date.now().toString().slice(-4);
    addPage(tmpl.name, slug, tmpl.createBlocks());
    setActiveTab('pages');
  };

  const handleSaveRename = (pageId: string) => {
    if (editingTitle.trim()) {
      renamePage(pageId, editingTitle.trim(), editingSlug.trim());
    }
    setEditingPageId(null);
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-[calc(100vh-3.5rem)] select-none notranslate" translate="no">
      {/* Header Tabs */}
      <div className="flex border-b border-slate-800 text-[11px] font-medium text-slate-400">
        <button
          type="button"
          onClick={() => setActiveTab('blocks')}
          className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'blocks'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Blocks ({registeredBlocks.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pages')}
          className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'pages'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Pages ({project?.pages.length || 0})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'templates'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Templates</span>
        </button>
      </div>

      {activeTab === 'blocks' && (
        /* BLOCKS TAB */
        <>
          <div className="p-3 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 13 blocks..."
                className="w-full bg-slate-950 border border-slate-800 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="px-3 pb-2 flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3 pt-1 space-y-2">
            {filteredBlocks.map((blockDef) => (
              <div
                key={blockDef.type}
                onClick={() => onAddBlock?.(blockDef.type)}
                className="p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                      {blockDef.label}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      {blockDef.description || blockDef.category}
                    </p>
                  </div>
                  <button
                    title="Add block"
                    className="p-1 rounded bg-slate-800 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white transition-all ml-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'pages' && (
        /* PAGES TAB */
        <div className="flex-1 flex flex-col overflow-hidden p-3">
          <div className="mb-3 space-y-2">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-90 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200 animate-pulse" />
              <span>Сгенерировать с AI ✨</span>
            </button>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-slate-300">Pages List</span>
              <button
                onClick={() => setIsAddingPage(true)}
                className="flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20"
              >
                <Plus className="w-3 h-3" /> Add Page
              </button>
            </div>
          </div>

          {isAddingPage && (
            <form
              onSubmit={handleCreatePage}
              className="p-2.5 mb-3 rounded-lg bg-slate-950 border border-indigo-500/40 space-y-2"
            >
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Title</label>
                <input
                  type="text"
                  placeholder="e.g. About Us"
                  value={newPageTitle}
                  onChange={(e) => {
                    setNewPageTitle(e.target.value);
                    if (!newPageSlug) {
                      setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-0.5">Slug</label>
                <input
                  type="text"
                  placeholder="e.g. about"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingPage(false)}
                  className="px-2 py-1 rounded text-[10px] text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  Create
                </button>
              </div>
            </form>
          )}

          <div className="flex-1 overflow-y-auto space-y-1.5">
            {project?.pages.map((page) => {
              const isSelected = selectedPageId === page.id;
              const isEditing = editingPageId === page.id;

              if (isEditing) {
                return (
                  <div key={page.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={editingSlug}
                      onChange={(e) => setEditingSlug(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[11px] font-mono text-slate-300"
                    />
                    <div className="flex items-center justify-end gap-1 pt-1">
                      <button onClick={() => setEditingPageId(null)} className="p-1 text-slate-400"><X className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleSaveRename(page.id)} className="p-1 bg-indigo-600 text-white rounded"><Check className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={page.id}
                  onClick={() => selectPage(page.id)}
                  className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                      : 'bg-slate-800/40 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <div className="truncate">
                      <p className="text-xs font-medium truncate">{page.title}</p>
                      <p className="text-[10px] text-slate-500 font-mono">/{page.slug} ({page.blocks.length} blocks)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPageId(page.id);
                        setEditingTitle(page.title);
                        setEditingSlug(page.slug);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-200 rounded"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    {project.pages.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePage(page.id);
                        }}
                        className="p-1 text-rose-400 hover:text-rose-300 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        /* TEMPLATES TAB */
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="pb-1 border-b border-slate-800">
            <h3 className="text-xs font-semibold text-slate-200">Page Presets</h3>
            <p className="text-[10px] text-slate-500">Create pre-structured pages with 1-click</p>
          </div>
          <div className="space-y-2">
            {pageTemplates.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => handleCreateFromTemplate(tmpl)}
                className="p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-indigo-400">{tmpl.name}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">{tmpl.category}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">{tmpl.description}</p>
                <div className="pt-1 flex items-center justify-end text-[10px] font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <span>Use Template +</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AIPromptModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
    </aside>
  );
};
