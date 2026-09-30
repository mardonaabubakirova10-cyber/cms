import { SiteProject } from '@/types/builder';
import { ProjectRepository } from './ProjectRepository';
import { SiteProjectSchema } from '@/schemas/project.schema';
import { demoProjectFixture } from '@/builder/fixtures/demoProject';

const STORAGE_PREFIX = 'cms_project_';

export class LocalStorageProjectRepository implements ProjectRepository {
  async load(projectId: string): Promise<SiteProject | null> {
    if (typeof window === 'undefined') return null;

    try {
      const dataStr = localStorage.getItem(`${STORAGE_PREFIX}${projectId}`);
      if (!dataStr) {
        // Fallback to fixture if it's the demo project
        if (projectId === demoProjectFixture.id) {
          await this.save(demoProjectFixture);
          return demoProjectFixture;
        }
        return null;
      }

      const parsed = JSON.parse(dataStr);
      const validated = SiteProjectSchema.safeParse(parsed);

      if (!validated.success) {
        console.warn('Project validation warning:', validated.error);
        return parsed as SiteProject;
      }

      return validated.data as SiteProject;
    } catch (err) {
      console.error('Failed to load project from localStorage:', err);
      return null;
    }
  }

  async save(project: SiteProject): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(
        `${STORAGE_PREFIX}${project.id}`,
        JSON.stringify(project)
      );
    } catch (err) {
      console.error('Failed to save project to localStorage:', err);
      throw err;
    }
  }

  async list(): Promise<{ id: string; name: string; updatedAt: string }[]> {
    if (typeof window === 'undefined') return [];
    const results: { id: string; name: string; updatedAt: string }[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}');
          if (item.id && item.name) {
            results.push({
              id: item.id,
              name: item.name,
              updatedAt: item.pages?.[0]?.updatedAt || new Date().toISOString(),
            });
          }
        } catch {
          // ignore corrupted keys
        }
      }
    }

    return results;
  }
}

export const projectRepository = new LocalStorageProjectRepository();
