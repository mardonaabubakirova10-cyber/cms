import { BlockDefinition } from '@/builder/registry/types';
import { HeaderBlock } from '@/builder/blocks/HeaderBlock';

export const headerDefinition: BlockDefinition = {
  type: 'header',
  label: 'Navigation Header',
  category: 'content',
  description: 'Site logo, menu navigation links and CTA button',
  variants: [{ id: 'standard', label: 'Standard Bar' }],
  createDefault: () => ({
    id: `blk_header_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    type: 'header',
    variant: 'standard',
    content: {},
    styles: {},
  }),
  renderer: HeaderBlock,
};
