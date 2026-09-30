import { z } from 'zod';

export const LocalizedTextSchema = z.record(z.string(), z.string());

export const ResponsiveNumberSchema = z.object({
  desktop: z.number().optional(),
  tablet: z.number().optional(),
  mobile: z.number().optional(),
});

export const ResponsiveStringSchema = z.object({
  desktop: z.string().optional(),
  tablet: z.string().optional(),
  mobile: z.string().optional(),
});

export const SpacingValueSchema = z.object({
  top: z.number(),
  right: z.number(),
  bottom: z.number(),
  left: z.number(),
});

export const ResponsiveSpacingSchema = z.object({
  desktop: SpacingValueSchema.optional(),
  tablet: SpacingValueSchema.optional(),
  mobile: SpacingValueSchema.optional(),
});

export const BlockStylesSchema = z.object({
  spacing: z
    .object({
      padding: ResponsiveSpacingSchema.optional(),
      margin: ResponsiveSpacingSchema.optional(),
      gap: ResponsiveNumberSchema.optional(),
    })
    .optional(),
  sizing: z
    .object({
      width: z.union([ResponsiveNumberSchema, ResponsiveStringSchema]).optional(),
      maxWidth: z.union([ResponsiveNumberSchema, ResponsiveStringSchema]).optional(),
      minHeight: z.union([ResponsiveNumberSchema, ResponsiveStringSchema]).optional(),
    })
    .optional(),
  background: z
    .object({
      type: z.enum(['color', 'gradient', 'image']).optional(),
      color: z.string().optional(),
      value: z.string().optional(),
      imageUrl: z.string().optional(),
      overlay: z.string().optional(),
    })
    .optional(),
  border: z
    .object({
      width: z.number().optional(),
      style: z.enum(['solid', 'dashed', 'dotted', 'none']).optional(),
      color: z.string().optional(),
      radius: ResponsiveNumberSchema.optional(),
    })
    .optional(),
  typography: z
    .object({
      fontFamily: z.string().optional(),
      fontSize: ResponsiveNumberSchema.optional(),
      fontWeight: z.number().optional(),
      lineHeight: ResponsiveNumberSchema.optional(),
      letterSpacing: ResponsiveNumberSchema.optional(),
      textAlign: z
        .object({
          desktop: z.enum(['left', 'center', 'right', 'justify']).optional(),
          tablet: z.enum(['left', 'center', 'right', 'justify']).optional(),
          mobile: z.enum(['left', 'center', 'right', 'justify']).optional(),
        })
        .optional(),
      color: z.string().optional(),
    })
    .optional(),
  layout: z
    .object({
      display: z.enum(['block', 'flex', 'grid']).optional(),
      columns: ResponsiveNumberSchema.optional(),
      direction: z
        .object({
          desktop: z.enum(['row', 'column']).optional(),
          tablet: z.enum(['row', 'column']).optional(),
          mobile: z.enum(['row', 'column']).optional(),
        })
        .optional(),
      alignItems: z.string().optional(),
      justifyContent: z.string().optional(),
    })
    .optional(),
});

export const PageBlockSchema = z.object({
  id: z.string(),
  type: z.string(),
  variant: z.string(),
  content: z.record(z.string(), z.unknown()),
  styles: BlockStylesSchema.default({}),
  hidden: z.boolean().optional(),
});

export const PageSEOSchema = z.object({
  title: LocalizedTextSchema.optional(),
  description: LocalizedTextSchema.optional(),
  canonical: z.string().optional(),
  ogTitle: LocalizedTextSchema.optional(),
  ogDescription: LocalizedTextSchema.optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().optional(),
});

export const PageSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(['draft', 'published']),
  blocks: z.array(PageBlockSchema),
  seo: PageSEOSchema.default({}),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GlobalStylesSchema = z.object({
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    text: z.string(),
    background: z.string(),
  }),
  typography: z.object({
    headingFont: z.string(),
    bodyFont: z.string(),
  }),
  radius: z.object({
    sm: z.number(),
    md: z.number(),
    lg: z.number(),
  }),
  containerMaxWidth: z.number(),
});

export const SiteProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  defaultLocale: z.string(),
  locales: z.array(z.string()),
  pages: z.array(PageSchema),
  globalStyles: GlobalStylesSchema,
  translations: z.record(z.string(), LocalizedTextSchema),
});
