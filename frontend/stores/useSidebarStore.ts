// stores/useSidebarStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleCollapse: () => void;
  setCollapsed: (collapsed: boolean) => void;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      mobileOpen: false,

      toggleCollapse: () =>
        set((state) => ({ collapsed: !state.collapsed })),

      setCollapsed: (collapsed: boolean) =>
        set({ collapsed }),

      openMobile: () =>
        set({ mobileOpen: true }),

      closeMobile: () =>
        set({ mobileOpen: false }),

      toggleMobile: () =>
        set((state) => ({ mobileOpen: !state.mobileOpen })),
    }),
    {
      name: 'sidebar-storage', // Nom dans localStorage
      partialize: (state) => ({
        collapsed: state.collapsed, // Persister seulement collapsed
      }),
    }
  )
);