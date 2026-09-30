import { z } from 'zod';

export const allowedBlockTypes = [
  'header',
  'hero',
  'features',
  'services',
  'textImage',
  'cta',
  'gallery',
  'statistics',
  'pricing',
  'team',
  'reviews',
  'faq',
  'contacts',
  'footer',
] as const;

export const aiBlockSchema = z.object({
  type: z.enum(allowedBlockTypes),
  variant: z.string().default('default'),
  content: z.record(z.string(), z.any()).default({}),
});

export const aiPageResponseSchema = z.object({
  title: z.string(),
  slug: z.string().default('ai-generated-page'),
  description: z.string().optional(),
  blocks: z.array(aiBlockSchema).min(1),
});

export type AIPageResponse = z.infer<typeof aiPageResponseSchema>;
export type AIBlockResponse = z.infer<typeof aiBlockSchema>;
