import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SiteProject, Page } from '@/types/builder';
import { PageRenderer } from '@/builder/renderer';
import { generateGlobalCssVariables } from '@/builder/renderer/cssGenerator';

export interface RenderOptions {
  locale?: string;
  baseUrl?: string;
}

export function renderPageToStaticHtml(
  project: SiteProject,
  page: Page,
  options: RenderOptions = {}
): string {
  const locale = options.locale || project.defaultLocale || 'ru';
  const baseUrl = options.baseUrl || 'https://example.com';
  const cssVariables = generateGlobalCssVariables(project.globalStyles);
  
  // Render the react component tree into static HTML string
  const bodyContent = ReactDOMServer.renderToStaticMarkup(
    React.createElement(PageRenderer, {
      page: page,
      locale: locale,
      breakpoint: 'desktop',
      mode: 'export',
    })
  );

  const pageTitle = page.seo?.title?.[locale] || page.title || project.name;
  const pageDescription = page.seo?.description?.[locale] || '';
  const isHomePage = page.slug === 'home' || page.slug === '' || page.slug === '/';
  const canonicalUrl = page.seo?.canonical || `${baseUrl}/${isHomePage ? '' : page.slug}`;
  const ogTitle = page.seo?.ogTitle?.[locale] || pageTitle;
  const ogDescription = page.seo?.ogDescription?.[locale] || pageDescription;
  const ogImage = page.seo?.ogImage || '';

  // Hreflang alternates
  const hreflangTags = (project.locales || [locale])
    .map((loc) => `<link rel="alternate" hreflang="${loc}" href="${baseUrl}/${loc}/${isHomePage ? '' : page.slug}" />`)
    .join('\n  ');

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  ${pageDescription ? `<meta name="description" content="${escapeHtml(pageDescription)}">` : ''}
  ${page.seo?.noIndex ? `<meta name="robots" content="noindex, nofollow">` : `<meta name="robots" content="index, follow">`}
  
  <!-- Canonical & Hreflang -->
  <link rel="canonical" href="${canonicalUrl}">
  ${hreflangTags}
  
  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(ogTitle)}">
  ${ogDescription ? `<meta property="og:description" content="${escapeHtml(ogDescription)}">` : ''}
  <meta property="og:url" content="${canonicalUrl}">
  ${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}">` : ''}
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    ${cssVariables}
    body {
      margin: 0;
      padding: 0;
      background-color: var(--color-background, #090d16);
      color: var(--color-text, #f8fafc);
      font-family: var(--font-body, system-ui, -apple-system, sans-serif);
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading, inherit);
    }
  </style>
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
  ${bodyContent}
</body>
</html>`;
}

export function generateSitemapXml(project: SiteProject, baseUrl: string = 'https://example.com'): string {
  const publishedPages = project.pages.filter(p => p.status === 'published' && !p.seo?.noIndex);
  const now = new Date().toISOString().split('T')[0];

  const urls = publishedPages.map(page => {
    const isHome = page.slug === 'home' || page.slug === '' || page.slug === '/';
    const loc = isHome ? baseUrl : `${baseUrl}/${page.slug}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${page.updatedAt ? page.updatedAt.split('T')[0] : now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${isHome ? '1.0' : '0.8'}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string = 'https://example.com'): string {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
