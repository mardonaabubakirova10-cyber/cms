import { SiteProject } from '@/types/builder';

export interface ProjectRepository {
  load(projectId: string): Promise<SiteProject | null>;
  save(project: SiteProject): Promise<void>;
  list(): Promise<{ id: string; name: string; updatedAt: string }[]>;
}
