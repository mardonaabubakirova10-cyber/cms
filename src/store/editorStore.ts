import { create } from 'zustand';
import { SiteProject, Breakpoint, PageBlock, GlobalStyles, Page } from '@/types/builder';
import { demoProjectFixture } from '@/builder/fixtures/demoProject';
import { setByPath } from '@/lib/pathUtils';
import { projectRepository } from '@/repositories';

const MAX_HISTORY = 50;

export interface EditorStore {
  project: SiteProject | null;
  selectedPageId: string | null;
  selectedBlockId: string | null;
  currentBreakpoint: Breakpoint;
  currentLocale: string;
  isDirty: boolean;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';

  // History for Undo / Redo
  past: SiteProject[];
  future: SiteProject[];

  // History Actions
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;

  // Persistence Actions
  loadProject: (projectId: string) => Promise<void>;
  saveProject: () => Promise<void>;

  // Navigation & Selection Actions
  setProject: (project: SiteProject) => void;
  selectPage: (pageId: string) => void;
  selectBlock: (blockId: string | null) => void;
  setBreakpoint: (breakpoint: Breakpoint) => void;
  setLocale: (locale: string) => void;
  setSaveStatus: (status: 'idle' | 'saving' | 'saved' | 'error') => void;

  // Pages Actions
  addPage: (title: string, slug: string, initialBlocks?: PageBlock[]) => void;
  removePage: (pageId: string) => void;
  renamePage: (pageId: string, title: string, slug?: string) => void;
  updatePageSEO: (pageId: string, path: string, value: unknown) => void;

  // Translation Dictionary Actions
  updateTranslationKey: (key: string, locale: string, value: string) => void;

  // Block Mutation Actions
  addBlock: (block: PageBlock, index?: number) => void;
  removeBlock: (blockId: string) => void;
  duplicateBlock: (blockId: string) => void;
  moveBlock: (fromIndex: number, toIndex: number) => void;
  updateBlockContent: (blockId: string, path: string, value: unknown) => void;
  updateBlockStyle: (blockId: string, path: string, value: unknown) => void;
  updateBlockVariant: (blockId: string, variant: string) => void;

  // Global Style Actions
  updateGlobalStyles: (path: string, value: unknown) => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  project: demoProjectFixture,
  selectedPageId: demoProjectFixture.pages[0]?.id || null,
  selectedBlockId: demoProjectFixture.pages[0]?.blocks[0]?.id || null,
  currentBreakpoint: 'desktop',
  currentLocale: demoProjectFixture.defaultLocale || 'ru',
  isDirty: false,
  saveStatus: 'idle',

  past: [],
  future: [],

  pushHistory: () => {
    const { project, past } = get();
    if (!project) return;
    const snapshot = JSON.parse(JSON.stringify(project));
    set({
      past: [...past.slice(-(MAX_HISTORY - 1)), snapshot],
      future: [],
    });
  },

  undo: () => {
    const { past, project, future } = get();
    if (past.length === 0 || !project) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    const currentSnapshot = JSON.parse(JSON.stringify(project));

    set({
      project: previous,
      past: newPast,
      future: [currentSnapshot, ...future.slice(0, MAX_HISTORY - 1)],
      isDirty: true,
      selectedPageId: previous.pages[0]?.id || null,
      selectedBlockId: previous.pages[0]?.blocks[0]?.id || null,
    });
  },

  redo: () => {
    const { past, project, future } = get();
    if (future.length === 0 || !project) return;

    const next = future[0];
    const newFuture = future.slice(1);
    const currentSnapshot = JSON.parse(JSON.stringify(project));

    set({
      project: next,
      past: [...past.slice(-(MAX_HISTORY - 1)), currentSnapshot],
      future: newFuture,
      isDirty: true,
      selectedPageId: next.pages[0]?.id || null,
      selectedBlockId: next.pages[0]?.blocks[0]?.id || null,
    });
  },

  loadProject: async (projectId: string) => {
    try {
      const project = await projectRepository.load(projectId);
      if (project) {
        set({
          project,
          selectedPageId: project.pages[0]?.id || null,
          selectedBlockId: project.pages[0]?.blocks[0]?.id || null,
          currentLocale: project.defaultLocale || 'ru',
          isDirty: false,
          saveStatus: 'saved',
          past: [],
          future: [],
        });
      }
    } catch (err) {
      console.error('Failed to load project:', err);
      set({ saveStatus: 'error' });
    }
  },

  saveProject: async () => {
    const { project } = get();
    if (!project) return;
    set({ saveStatus: 'saving' });
    try {
      await projectRepository.save(project);
      set({ saveStatus: 'saved', isDirty: false });
    } catch (err) {
      console.error('Save failed:', err);
      set({ saveStatus: 'error' });
    }
  },

  setProject: (project) => set({ project }),
  selectPage: (pageId) => set({ selectedPageId: pageId, selectedBlockId: null }),
  selectBlock: (blockId) => set({ selectedBlockId: blockId }),
  setBreakpoint: (currentBreakpoint) => set({ currentBreakpoint }),
  setLocale: (currentLocale) => set({ currentLocale }),
  setSaveStatus: (saveStatus) => set({ saveStatus }),

  // Pages CRUD with template support
  addPage: (title, slug, initialBlocks = []) => {
    get().pushHistory();
    set((state) => {
      if (!state.project) return state;
      const newPage: Page = {
        id: `page_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        title,
        slug: slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
        status: 'published',
        blocks: initialBlocks,
        seo: {
          title: { [state.currentLocale]: title },
          description: { [state.currentLocale]: `${title} page description` },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        project: {
          ...state.project,
          pages: [...state.project.pages, newPage],
        },
        selectedPageId: newPage.id,
        selectedBlockId: initialBlocks[0]?.id || null,
        isDirty: true,
      };
    });
  },

  removePage: (pageId) => {
    const { project } = get();
    if (!project || project.pages.length <= 1) return;
    get().pushHistory();
    set((state) => {
      if (!state.project) return state;
      const remainingPages = state.project.pages.filter((p) => p.id !== pageId);
      return {
        project: {
          ...state.project,
          pages: remainingPages,
        },
        selectedPageId: remainingPages[0]?.id || null,
        selectedBlockId: null,
        isDirty: true,
      };
    });
  },

  renamePage: (pageId, title, slug) => {
    get().pushHistory();
    set((state) => {
      if (!state.project) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== pageId) return p;
        return {
          ...p,
          title,
          slug: slug
            ? slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-')
            : p.slug,
          updatedAt: new Date().toISOString(),
        };
      });
      return {
        project: { ...state.project, pages },
        isDirty: true,
      };
    });
  },

  updatePageSEO: (pageId, path, value) => {
    set((state) => {
      if (!state.project) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== pageId) return p;
        const newSEO = setByPath(p.seo as unknown as Record<string, unknown>, path, value);
        return { ...p, seo: newSEO, updatedAt: new Date().toISOString() };
      });
      return { project: { ...state.project, pages }, isDirty: true };
    });
  },

  updateTranslationKey: (key, locale, value) => {
    set((state) => {
      if (!state.project) return state;
      const trans = { ...state.project.translations };
      if (!trans[key]) trans[key] = {};
      trans[key][locale] = value;
      return {
        project: { ...state.project, translations: trans },
        isDirty: true,
      };
    });
  },

  // Block Actions with Undo history support
  addBlock: (block, index) => {
    get().pushHistory();
    set((state) => {
      if (!state.project || !state.selectedPageId) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== state.selectedPageId) return p;
        const blocks = [...p.blocks];
        if (typeof index === 'number') {
          blocks.splice(index, 0, block);
        } else {
          blocks.push(block);
        }
        return { ...p, blocks, updatedAt: new Date().toISOString() };
      });
      return {
        project: { ...state.project, pages },
        selectedBlockId: block.id,
        isDirty: true,
      };
    });
  },

  removeBlock: (blockId) => {
    get().pushHistory();
    set((state) => {
      if (!state.project || !state.selectedPageId) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== state.selectedPageId) return p;
        return {
          ...p,
          blocks: p.blocks.filter((b) => b.id !== blockId),
          updatedAt: new Date().toISOString(),
        };
      });
      return {
        project: { ...state.project, pages },
        selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId,
        isDirty: true,
      };
    });
  },

  duplicateBlock: (blockId) => {
    get().pushHistory();
    set((state) => {
      if (!state.project || !state.selectedPageId) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== state.selectedPageId) return p;
        const index = p.blocks.findIndex((b) => b.id === blockId);
        if (index === -1) return p;
        const orig = p.blocks[index];
        const copy: PageBlock = {
          ...orig,
          id: `blk_${orig.type}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          content: JSON.parse(JSON.stringify(orig.content)),
          styles: JSON.parse(JSON.stringify(orig.styles)),
        };
        const blocks = [...p.blocks];
        blocks.splice(index + 1, 0, copy);
        return { ...p, blocks, updatedAt: new Date().toISOString() };
      });
      return { project: { ...state.project, pages }, isDirty: true };
    });
  },

  moveBlock: (fromIndex, toIndex) => {
    get().pushHistory();
    set((state) => {
      if (!state.project || !state.selectedPageId) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== state.selectedPageId) return p;
        const blocks = [...p.blocks];
        const [moved] = blocks.splice(fromIndex, 1);
        blocks.splice(toIndex, 0, moved);
        return { ...p, blocks, updatedAt: new Date().toISOString() };
      });
      return { project: { ...state.project, pages }, isDirty: true };
    });
  },

  updateBlockContent: (blockId, path, value) =>
    set((state) => {
      if (!state.project || !state.selectedPageId) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== state.selectedPageId) return p;
        const blocks = p.blocks.map((b) => {
          if (b.id !== blockId) return b;
          const newContent = setByPath(b.content, path, value);
          return { ...b, content: newContent };
        });
        return { ...p, blocks, updatedAt: new Date().toISOString() };
      });
      return { project: { ...state.project, pages }, isDirty: true };
    }),

  updateBlockStyle: (blockId, path, value) =>
    set((state) => {
      if (!state.project || !state.selectedPageId) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== state.selectedPageId) return p;
        const blocks = p.blocks.map((b) => {
          if (b.id !== blockId) return b;
          const newStyles = setByPath(b.styles as Record<string, unknown>, path, value);
          return { ...b, styles: newStyles };
        });
        return { ...p, blocks, updatedAt: new Date().toISOString() };
      });
      return { project: { ...state.project, pages }, isDirty: true };
    }),

  updateBlockVariant: (blockId, variant) => {
    get().pushHistory();
    set((state) => {
      if (!state.project || !state.selectedPageId) return state;
      const pages = state.project.pages.map((p) => {
        if (p.id !== state.selectedPageId) return p;
        const blocks = p.blocks.map((b) => {
          if (b.id !== blockId) return b;
          return { ...b, variant };
        });
        return { ...p, blocks, updatedAt: new Date().toISOString() };
      });
      return { project: { ...state.project, pages }, isDirty: true };
    });
  },

  updateGlobalStyles: (path, value) => {
    get().pushHistory();
    set((state) => {
      if (!state.project) return state;
      const updatedGlobals = setByPath(
        state.project.globalStyles as unknown as Record<string, unknown>,
        path,
        value
      );
      return {
        project: {
          ...state.project,
          globalStyles: updatedGlobals as unknown as GlobalStyles,
        },
        isDirty: true,
      };
    });
  },
}));
