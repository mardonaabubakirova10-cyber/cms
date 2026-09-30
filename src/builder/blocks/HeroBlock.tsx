'use client';

import React from 'react';
import { BlockRendererProps } from '@/builder/registry/types';
import { resolveResponsiveValue } from '@/builder/renderer/styleResolver';
import { InlineEditableText } from '@/components/editor/InlineEditableText';

export const HeroBlock: React.FC<BlockRendererProps> = ({
  block,
  locale,
  breakpoint,
  mode,
  onUpdateContent,
}) => {
  const isSplit = block.variant === 'split';
  const isEditor = mode === 'editor';

  const titleText =
    (block.content?.title as Record<string, string>)?.[locale] ||
    (block.content?.title as Record<string, string>)?.[Object.keys(block.content?.title || {})[0]] ||
    '';

  const subtitleText =
    (block.content?.subtitle as Record<string, string>)?.[locale] ||
    (block.content?.subtitle as Record<string, string>)?.[Object.keys(block.content?.subtitle || {})[0]] ||
    '';

  const buttonText =
    (block.content?.buttonText as Record<string, string>)?.[locale] ||
    (block.content?.buttonText as Record<string, string>)?.[Object.keys(block.content?.buttonText || {})[0]] ||
    '';

  // Responsive Styles & Typography
  const padding = resolveResponsiveValue(block.styles?.spacing?.padding, breakpoint) || {
    top: 64,
    bottom: 64,
    left: 24,
    right: 24,
  };

  const maxWidth = resolveResponsiveValue(block.styles?.sizing?.maxWidth, breakpoint) || 1024;
  const textAlign = resolveResponsiveValue(block.styles?.typography?.textAlign, breakpoint) || 'center';
  const fontSize = resolveResponsiveValue(block.styles?.typography?.fontSize, breakpoint);
  const fontWeight = block.styles?.typography?.fontWeight || 800;
  const lineHeight = resolveResponsiveValue(block.styles?.typography?.lineHeight, breakpoint);
  const letterSpacing = resolveResponsiveValue(block.styles?.typography?.letterSpacing, breakpoint);
  const textColor = block.styles?.typography?.color;
  const borderRadius = resolveResponsiveValue(block.styles?.border?.radius, breakpoint) || 16;
  const bgColor = block.styles?.background?.color;

  const handleUpdate = (path: string, val: string) => {
    if (path === 'title') {
      onUpdateContent?.(`title.${locale}`, val);
    } else if (path === 'subtitle') {
      onUpdateContent?.(`subtitle.${locale}`, val);
    } else if (path === 'buttonText') {
      onUpdateContent?.(`buttonText.${locale}`, val);
    }
  };

  const containerStyle: React.CSSProperties = {
    paddingTop: `${padding.top}px`,
    paddingBottom: `${padding.bottom}px`,
    paddingLeft: `${padding.left}px`,
    paddingRight: `${padding.right}px`,
    backgroundColor: bgColor || undefined,
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    textAlign: textAlign as React.CSSProperties['textAlign'],
  };

  const titleCustomStyle: React.CSSProperties = {
    fontSize: fontSize ? `${fontSize}px` : undefined,
    fontWeight: fontWeight,
    lineHeight: lineHeight ? `${lineHeight}` : undefined,
    letterSpacing: letterSpacing ? `${letterSpacing}px` : undefined,
    color: textColor || undefined,
  };

  return (
    <div
      style={containerStyle}
      className={`w-full transition-all text-slate-100 ${
        !bgColor ? 'bg-gradient-to-b from-slate-900 to-slate-950' : ''
      }`}
    >
      <div style={contentStyle} className="mx-auto">
        {isSplit ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-left space-y-4">
              <div style={titleCustomStyle}>
                <InlineEditableText
                  tagName="h1"
                  value={titleText}
                  isEditorMode={isEditor}
                  onChange={(val) => handleUpdate('title', val)}
                  className={`tracking-tight ${
                    !textColor
                      ? 'bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'
                      : ''
                  } ${!fontSize ? 'text-3xl md:text-5xl font-extrabold' : ''} block`}
                />
              </div>
              <InlineEditableText
                tagName="p"
                value={subtitleText}
                multiline
                isEditorMode={isEditor}
                onChange={(val) => handleUpdate('subtitle', val)}
                className="text-slate-400 text-base md:text-lg leading-relaxed block"
              />
              <div className="pt-2">
                <button
                  style={{
                    borderRadius: `${borderRadius}px`,
                    backgroundColor: 'var(--color-primary, #6366f1)',
                  }}
                  className="px-6 py-3 hover:opacity-90 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all"
                >
                  <InlineEditableText
                    tagName="span"
                    value={buttonText}
                    isEditorMode={isEditor}
                    onChange={(val) => handleUpdate('buttonText', val)}
                  />
                </button>
              </div>
            </div>
            <div
              style={{ borderRadius: `${borderRadius}px` }}
              className="h-64 md:h-80 bg-gradient-to-tr from-indigo-500/20 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center p-6 text-center text-slate-400"
            >
              <div className="space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl font-bold">
                  ⚡
                </div>
                <p className="text-sm font-medium">Hero Image / Media Area</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div style={titleCustomStyle}>
              <InlineEditableText
                tagName="h1"
                value={titleText}
                isEditorMode={isEditor}
                onChange={(val) => handleUpdate('title', val)}
                className={`tracking-tight ${
                  !textColor
                    ? 'bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent'
                    : ''
                } ${!fontSize ? 'text-4xl md:text-6xl font-extrabold' : ''} block`}
              />
            </div>
            <InlineEditableText
              tagName="p"
              value={subtitleText}
              multiline
              isEditorMode={isEditor}
              onChange={(val) => handleUpdate('subtitle', val)}
              className="text-slate-400 text-lg md:text-xl leading-relaxed block"
            />
            <div
              className={`pt-2 flex flex-wrap gap-4 ${
                textAlign === 'left'
                  ? 'justify-start'
                  : textAlign === 'right'
                  ? 'justify-end'
                  : 'justify-center'
              }`}
            >
              <button
                style={{
                  borderRadius: `${borderRadius}px`,
                  backgroundColor: 'var(--color-primary, #6366f1)',
                }}
                className="px-7 py-3.5 hover:opacity-90 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all"
              >
                <InlineEditableText
                  tagName="span"
                  value={buttonText}
                  isEditorMode={isEditor}
                  onChange={(val) => handleUpdate('buttonText', val)}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
