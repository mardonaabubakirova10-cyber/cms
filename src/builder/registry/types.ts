import React from 'react';
import { PageBlock, Breakpoint } from '@/types/builder';

export interface BlockVariant {
  id: string;
  label: string;
  description?: string;
}

export interface ControlDefinition {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'slider' | 'color' | 'select' | 'toggle' | 'spacing';
  path: string;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface BlockRendererProps {
  block: PageBlock;
  locale: string;
  breakpoint: Breakpoint;
  mode: 'editor' | 'preview' | 'export';
  isSelected?: boolean;
  onUpdateContent?: (path: string, value: unknown) => void;
}

export interface BlockDefinition {
  type: string;
  label: string;
  category: string;
  description?: string;
  variants: BlockVariant[];
  createDefault: (variant?: string) => PageBlock;
  renderer: React.ComponentType<BlockRendererProps>;
  inspector?: {
    content?: ControlDefinition[];
    style?: ControlDefinition[];
  };
}
