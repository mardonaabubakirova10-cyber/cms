import { BlockDefinition, BlockRendererProps, BlockVariant, ControlDefinition } from './types';
import { PageBlock } from '@/types/builder';

class SimpleBlockRegistry {
  private definitions: Map<string, BlockDefinition> = new Map();

  registerBlock(definition: BlockDefinition): void {
    this.definitions.set(definition.type, definition);
  }

  getBlockDefinition(type: string): BlockDefinition | undefined {
    return this.definitions.get(type);
  }

  getAllBlocks(): BlockDefinition[] {
    return Array.from(this.definitions.values());
  }

  getBlocksByCategory(category: string): BlockDefinition[] {
    return this.getAllBlocks().filter((def) => def.category === category);
  }

  createBlock(type: string, variant?: string): PageBlock | null {
    const def = this.getBlockDefinition(type);
    if (!def) return null;
    return def.createDefault(variant);
  }
}

export const blockRegistry = new SimpleBlockRegistry();
export type { BlockDefinition, BlockRendererProps, BlockVariant, ControlDefinition };
