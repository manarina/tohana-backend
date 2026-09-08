// components/common/Layout.tsx
'use client';

import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useSidebarStore } from '@/stores/useSidebarStore';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { collapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
        }`}
      >
        {/* Navbar */}
        <Navbar />

        {/* Contenu de la page */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}