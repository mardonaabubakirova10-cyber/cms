'use client';

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Settings2,
  Sparkles,
  MousePointerClick,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
  Palette,
  Search,
  Check,
  Loader2,
  Globe2,
} from 'lucide-react';
import { useEditorStore } from '@/store';
import { blockRegistry } from '@/builder/registry';
import {
  TextControl,
  TextareaControl,
  SelectControl,
  SliderControl,
  SpacingControl,
  ColorControl,
  SegmentedControl,
  ToggleControl,
} from '@/components/controls';
import { getByPath } from '@/lib/pathUtils';
import { SpacingValue } from '@/types/builder';

export const Inspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'seo' | 'global'>('content');

  const project = useEditorStore((state) => state.project);
  const selectedPageId = useEditorStore((state) => state.selectedPageId);
  const selectedBlockId = useEditorStore((state) => state.selectedBlockId);
  const currentLocale = useEditorStore((state) => state.currentLocale);
  const currentBreakpoint = useEditorStore((state) => state.currentBreakpoint);
  const saveStatus = useEditorStore((state) => state.saveStatus);
  const updateBlockContent = useEditorStore((state) => state.updateBlockContent);
  const updateBlockStyle = useEditorStore((state) => state.updateBlockStyle);
  const updateBlockVariant = useEditorStore((state) => state.updateBlockVariant);
  const updateGlobalStyles = useEditorStore((state) => state.updateGlobalStyles);
  const updatePageSEO = useEditorStore((state) => state.updatePageSEO);

  if (!project) return null;

  const activePage =
    project.pages.find((p) => p.id === selectedPageId) || project.pages[0];

  const selectedBlock = activePage?.blocks.find((b) => b.id === selectedBlockId);
  const definition = selectedBlock
    ? blockRegistry.getBlockDefinition(selectedBlock.type)
    : null;

  const handleContentChange = (field: string, value: string) => {
    if (!selectedBlock) return;
    updateBlockContent(selectedBlock.id, `${field}.${currentLocale}`, value);
  };

  const handleResponsiveStyleChange = (path: string, value: unknown) => {
    if (!selectedBlock) return;
    updateBlockStyle(selectedBlock.id, `${path}.${currentBreakpoint}`, value);
  };

  const handleGlobalStyleChange = (path: string, value: unknown) => {
    if (!selectedBlock) return;
    updateBlockStyle(selectedBlock.id, path, value);
  };

  return (
    <aside className="w-72 bg-slate-900 border-l border-slate-800 flex flex-col h-[calc(100vh-3.5rem)] select-none notranslate" translate="no">
      {/* Inspector Tabs */}
      <div className="flex border-b border-slate-800 text-[11px] font-medium text-slate-400">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'content'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span>Content</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'style'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Settings2 className="w-3 h-3" />
          <span>Style</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'seo'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Search className="w-3 h-3" />
          <span>SEO</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('global')}
          className={`flex-1 py-3 border-b-2 flex items-center justify-center gap-1 transition-colors ${
            activeTab === 'global'
              ? 'border-indigo-500 text-indigo-400 bg-slate-800/40'
              : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Palette className="w-3 h-3" />
          <span>Theme</span>
        </button>
      </div>

      {/* Body Area */}
      <div className="p-4 flex-1 overflow-y-auto">
        {activeTab === 'seo' ? (
          /* SEO TAB */
          <div className="space-y-4">
            <div className="pb-1 border-b border-slate-800">
              <h3 className="text-xs font-semibold text-slate-200">Page SEO Settings</h3>
              <p className="text-[10px] text-slate-500">Metadata for search engines and social cards</p>
            </div>

            <TextControl
              label={`Meta Title (${currentLocale.toUpperCase()})`}
              placeholder="Page title | Brand"
              value={activePage.seo?.title?.[currentLocale] || ''}
              onChange={(val) =>
                updatePageSEO(activePage.id, `title.${currentLocale}`, val)
              }
            />

            <TextareaControl
              label={`Meta Description (${currentLocale.toUpperCase()})`}
              rows={3}
              placeholder="Short description for search results"
              value={activePage.seo?.description?.[currentLocale] || ''}
              onChange={(val) =>
                updatePageSEO(activePage.id, `description.${currentLocale}`, val)
              }
            />

            <TextControl
              label="Canonical URL"
              placeholder="https://example.com/about"
              value={activePage.seo?.canonical || ''}
              onChange={(val) =>
                updatePageSEO(activePage.id, 'canonical', val)
              }
            />

            <TextControl
              label={`OG Title (${currentLocale.toUpperCase()})`}
              placeholder="Social card title"
              value={activePage.seo?.ogTitle?.[currentLocale] || ''}
              onChange={(val) =>
                updatePageSEO(activePage.id, `ogTitle.${currentLocale}`, val)
              }
            />

            <ToggleControl
              label="Noindex (Hide from search engines)"
              checked={!!activePage.seo?.noIndex}
              onChange={(val) => updatePageSEO(activePage.id, 'noIndex', val)}
            />
          </div>
        ) : activeTab === 'global' ? (
          /* GLOBAL THEME TAB */
          <div className="space-y-4">
            <div className="pb-1 border-b border-slate-800">
              <h3 className="text-xs font-semibold text-slate-200">Global Design Tokens</h3>
              <p className="text-[10px] text-slate-500">Site-wide theme and design variables</p>
            </div>

            <ColorControl
              label="Primary Color"
              value={project.globalStyles.colors.primary}
              onChange={(val) => updateGlobalStyles('colors.primary', val)}
            />

            <ColorControl
              label="Secondary Color"
              value={project.globalStyles.colors.secondary}
              onChange={(val) => updateGlobalStyles('colors.secondary', val)}
            />

            <SliderControl
              label="Container Max Width"
              min={960}
              max={1600}
              step={40}
              unit="px"
              value={project.globalStyles.containerMaxWidth || 1200}
              onChange={(val) => updateGlobalStyles('containerMaxWidth', val)}
            />

            <SliderControl
              label="Global Radius (md)"
              min={0}
              max={32}
              step={2}
              unit="px"
              value={project.globalStyles.radius.md || 8}
              onChange={(val) => updateGlobalStyles('radius.md', val)}
            />
          </div>
        ) : selectedBlock && definition ? (
          <div className="space-y-4">
            {/* Block meta & variant selector */}
            <div className="p-3 bg-slate-800/60 rounded-lg border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Type:</span>
                <span className="text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded text-[10px] font-mono">
                  {selectedBlock.type}
                </span>
              </div>
              <p className="text-xs text-slate-200 font-semibold">
                {definition.label}
              </p>

              {definition.variants.length > 1 && (
                <div className="pt-2 border-t border-slate-800/80">
                  <SelectControl
                    label="Variant / Layout"
                    value={selectedBlock.variant}
                    options={definition.variants.map((v) => ({
                      label: v.label,
                      value: v.id,
                    }))}
                    onChange={(variant) =>
                      updateBlockVariant(selectedBlock.id, variant)
                    }
                  />
                </div>
              )}
            </div>

            {activeTab === 'content' ? (
              /* CONTENT TAB */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                    <Globe2 className="w-3 h-3 text-indigo-400" />
                    Language: {currentLocale.toUpperCase()}
                  </span>
                </div>

                <TextControl
                  label="Title"
                  placeholder="Section title"
                  value={
                    getByPath<string>(
                      selectedBlock.content,
                      `title.${currentLocale}`,
                      ''
                    ) || ''
                  }
                  onChange={(val) => handleContentChange('title', val)}
                />

                {(selectedBlock.content?.subtitle !== undefined ||
                  selectedBlock.content?.description !== undefined) && (
                  <TextareaControl
                    label={
                      selectedBlock.content?.subtitle !== undefined
                        ? 'Subtitle'
                        : 'Description'
                    }
                    rows={3}
                    placeholder="Section subtitle / description"
                    value={
                      getByPath<string>(
                        selectedBlock.content,
                        selectedBlock.content?.subtitle !== undefined
                          ? `subtitle.${currentLocale}`
                          : `description.${currentLocale}`,
                        ''
                      ) || ''
                    }
                    onChange={(val) =>
                      handleContentChange(
                        selectedBlock.content?.subtitle !== undefined
                          ? 'subtitle'
                          : 'description',
                        val
                      )
                    }
                  />
                )}

                {selectedBlock.content?.buttonText !== undefined && (
                  <TextControl
                    label="Button Text"
                    placeholder="CTA button label"
                    value={
                      getByPath<string>(
                        selectedBlock.content,
                        `buttonText.${currentLocale}`,
                        ''
                      ) || ''
                    }
                    onChange={(val) => handleContentChange('buttonText', val)}
                  />
                )}
              </div>
            ) : (
              /* STYLE & TYPOGRAPHY TAB */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Active Viewport:
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded">
                    {currentBreakpoint}
                  </span>
                </div>

                {/* Typography Controls */}
                <div className="space-y-2 p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-300 mb-1">
                    <Type className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Typography</span>
                  </div>

                  <SliderControl
                    label={`Font Size (${currentBreakpoint})`}
                    min={16}
                    max={96}
                    step={2}
                    unit="px"
                    value={
                      getByPath<number>(
                        selectedBlock.styles as Record<string, unknown>,
                        `typography.fontSize.${currentBreakpoint}`,
                        48
                      ) || 48
                    }
                    onChange={(val) =>
                      handleResponsiveStyleChange('typography.fontSize', val)
                    }
                    onReset={() =>
                      handleResponsiveStyleChange('typography.fontSize', 48)
                    }
                  />

                  <SliderControl
                    label={`Letter Spacing (${currentBreakpoint})`}
                    min={-4}
                    max={12}
                    step={0.5}
                    unit="px"
                    value={
                      getByPath<number>(
                        selectedBlock.styles as Record<string, unknown>,
                        `typography.letterSpacing.${currentBreakpoint}`,
                        0
                      ) || 0
                    }
                    onChange={(val) =>
                      handleResponsiveStyleChange('typography.letterSpacing', val)
                    }
                  />

                  <ColorControl
                    label="Text Color Override"
                    value={
                      getByPath<string>(
                        selectedBlock.styles as Record<string, unknown>,
                        'typography.color',
                        '#ffffff'
                      ) || '#ffffff'
                    }
                    onChange={(val) =>
                      handleGlobalStyleChange('typography.color', val)
                    }
                  />
                </div>

                {/* Spacing / Padding */}
                <SpacingControl
                  label={`Padding (${currentBreakpoint})`}
                  value={
                    getByPath<SpacingValue>(
                      selectedBlock.styles as Record<string, unknown>,
                      `spacing.padding.${currentBreakpoint}`,
                      { top: 64, right: 24, bottom: 64, left: 24 }
                    ) || { top: 64, right: 24, bottom: 64, left: 24 }
                  }
                  onChange={(val) =>
                    handleResponsiveStyleChange('spacing.padding', val)
                  }
                />

                {/* Max Width */}
                <SliderControl
                  label={`Max Width (${currentBreakpoint})`}
                  min={320}
                  max={1440}
                  step={20}
                  unit="px"
                  value={
                    getByPath<number>(
                      selectedBlock.styles as Record<string, unknown>,
                      `sizing.maxWidth.${currentBreakpoint}`,
                      1024
                    ) || 1024
                  }
                  onChange={(val) =>
                    handleResponsiveStyleChange('sizing.maxWidth', val)
                  }
                  onReset={() =>
                    handleResponsiveStyleChange('sizing.maxWidth', 1024)
                  }
                />

                {/* Border Radius */}
                <SliderControl
                  label={`Border Radius (${currentBreakpoint})`}
                  min={0}
                  max={48}
                  step={2}
                  unit="px"
                  value={
                    getByPath<number>(
                      selectedBlock.styles as Record<string, unknown>,
                      `border.radius.${currentBreakpoint}`,
                      16
                    ) || 16
                  }
                  onChange={(val) =>
                    handleResponsiveStyleChange('border.radius', val)
                  }
                  onReset={() =>
                    handleResponsiveStyleChange('border.radius', 16)
                  }
                />

                {/* Text Alignment */}
                <SegmentedControl
                  label={`Text Alignment (${currentBreakpoint})`}
                  value={
                    getByPath<string>(
                      selectedBlock.styles as Record<string, unknown>,
                      `typography.textAlign.${currentBreakpoint}`,
                      'center'
                    ) || 'center'
                  }
                  options={[
                    { label: <AlignLeft className="w-3.5 h-3.5" />, value: 'left', title: 'Left' },
                    { label: <AlignCenter className="w-3.5 h-3.5" />, value: 'center', title: 'Center' },
                    { label: <AlignRight className="w-3.5 h-3.5" />, value: 'right', title: 'Right' },
                    { label: <AlignJustify className="w-3.5 h-3.5" />, value: 'justify', title: 'Justify' },
                  ]}
                  onChange={(val) =>
                    handleResponsiveStyleChange('typography.textAlign', val)
                  }
                />

                {/* Background Color */}
                <ColorControl
                  label="Background Color"
                  value={
                    getByPath<string>(
                      selectedBlock.styles as Record<string, unknown>,
                      'background.color',
                      '#0f172a'
                    ) || '#0f172a'
                  }
                  onChange={(val) =>
                    handleGlobalStyleChange('background.color', val)
                  }
                />
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 space-y-2">
            <MousePointerClick className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-xs font-medium text-slate-400">No block selected</p>
            <p className="text-[11px] text-slate-600 max-w-[180px] mx-auto">
              Click any block in the canvas to inspect and customize its properties.
            </p>
          </div>
        )}
      </div>

      {/* Footer autosave indicator */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          {saveStatus === 'saving' && (
            <>
              <Loader2 className="w-3 h-3 text-indigo-400 animate-spin" />
              <span className="text-indigo-400">Saving...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Saved</span>
            </>
          )}
          {saveStatus === 'error' && (
            <>
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-rose-400">Save Error</span>
            </>
          )}
          {saveStatus === 'idle' && (
            <>
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Autosave ready</span>
            </>
          )}
        </span>
        <span className="font-mono text-[10px] text-slate-400">
          {selectedBlockId || 'None'}
        </span>
      </div>
    </aside>
  );
};
