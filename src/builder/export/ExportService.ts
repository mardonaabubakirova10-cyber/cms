import JSZip from 'jszip';
import { SiteProject } from '@/types/builder';
import {
  renderPageToStaticHtml,
  generateSitemapXml,
  generateRobotsTxt,
} from './htmlRenderer';

export interface ExportOptions {
  locale?: string;
  baseUrl?: string;
  includeAllPages?: boolean;
}

export class ExportService {
  /**
   * Export entire site or selected pages into a multi-page ZIP package with SEO assets.
   */
  static async exportProjectZip(
    project: SiteProject,
    options: ExportOptions = {}
  ): Promise<Blob> {
    const zip = new JSZip();
    const locale = options.locale || project.defaultLocale || 'ru';
    const baseUrl = options.baseUrl || 'https://example.com';

    if (!project.pages || project.pages.length === 0) {
      throw new Error('В проекте нет страниц для экспорта.');
    }

    // 1. Export pages
    const pagesToExport = project.pages.filter(
      (p) => p.status === 'published' || p.slug === 'home' || p.slug === '' || p.slug === '/'
    );

    const effectivePages = pagesToExport.length > 0 ? pagesToExport : [project.pages[0]];

    for (const page of effectivePages) {
      const isHome = page.slug === 'home' || page.slug === '' || page.slug === '/';
      const htmlContent = renderPageToStaticHtml(project, page, { locale, baseUrl });

      if (isHome) {
        zip.file('index.html', htmlContent);
      } else {
        const cleanSlug = page.slug.replace(/^\/+|\/+$/g, '');
        zip.file(`${cleanSlug}/index.html`, htmlContent);
        // Also provide direct page.html for flat hosting
        zip.file(`${cleanSlug}.html`, htmlContent);
      }
    }

    // 2. SEO files: sitemap.xml & robots.txt
    const sitemap = generateSitemapXml(project, baseUrl);
    zip.file('sitemap.xml', sitemap);

    const robots = generateRobotsTxt(baseUrl);
    zip.file('robots.txt', robots);

    // 3. Documentation
    const readme = `Visual Site Builder Export (Full Multi-Page Website)
===================================================
Project: ${project.name}
Language: ${locale.toUpperCase()}
Total Exported Pages: ${effectivePages.length}
Generated On: ${new Date().toISOString()}

Included Structure:
- index.html (Home page)
${effectivePages
  .filter((p) => !(p.slug === 'home' || p.slug === '' || p.slug === '/'))
  .map((p) => `- ${p.slug}/index.html (${p.title})`)
  .join('\n')}
- sitemap.xml (SEO Sitemap)
- robots.txt (Search Engine indexing guidelines)

How to deploy / preview:
1. Double click "index.html" to test the homepage offline.
2. Upload all files and folders to any web host (Vercel, Netlify, GitHub Pages, Apache, Nginx).
`;
    zip.file('README.txt', readme);

    // 4. Generate compressed ZIP
    return await zip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });
  }

  /**
   * Helper for Home-only export (backwards compatibility)
   */
  static async exportHomeProjectZip(project: SiteProject, locale: string = 'ru'): Promise<Blob> {
    return this.exportProjectZip(project, { locale, includeAllPages: true });
  }

  /**
   * Helper to trigger download in browser
   */
  static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
