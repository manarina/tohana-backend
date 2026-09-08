// components/common/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Leaf,
  Package,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Settings,
  BarChart3,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useSidebarStore } from '@/stores/useSidebarStore';

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, mobileOpen, toggleCollapse, closeMobile } = useSidebarStore();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Navigation principale
  const navigation = [
    {
      label: 'Tableau de bord',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Exploitations',
      href: '/farms',
      icon: Building2,
    },
    {
      label: 'Parcelles',
      href: '/plots',
      icon: MapPin,
    },
    {
      label: 'Pratiques',
      href: '/practices',
      icon: Leaf,
    },
    {
      label: 'Récoltes',
      href: '/harvests',
      icon: Package,
    },
  ];

  // Navigation secondaire
  const secondaryNavigation = [
    {
      label: 'Statistiques',
      href: '/stats',
      icon: BarChart3,
      soon: true,
    },
    {
      label: 'Paramètres',
      href: '/settings',
      icon: Settings,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname?.startsWith(path) || false;
  };

  // Composant de navigation réutilisable
  const NavItem = ({ item, isSecondary = false }: { item: any; isSecondary?: boolean }) => {
    const active = isActive(item.href);

    return (
      <Link
        href={item.href}
        title={collapsed ? item.label : undefined}
        className={`group relative flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
          collapsed ? 'justify-center px-2' : 'gap-3 px-3'
        } ${
          active
            ? 'bg-green-50 text-green-700'
            : isSecondary
            ? 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        {active && (
          <motion.span
            layoutId="sidebar-active-indicator"
            className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-green-600"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            active
              ? 'bg-green-100 text-green-600'
              : isSecondary
              ? 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
              : 'bg-gray-50 text-gray-500 group-hover:bg-gray-100 group-hover:text-gray-700'
          }`}
        >
          <item.icon className="h-[18px] w-[18px]" />
        </div>
        {!collapsed && (
          <>
            <span className="flex-1 whitespace-nowrap">{item.label}</span>
            {item.soon && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-semibold uppercase text-gray-400">
                Bientôt
              </span>
            )}
          </>
        )}
      </Link>
    );
  };

  // ============================================================
  // SIDEBAR DESKTOP
  // ============================================================

  const DesktopSidebar = () => (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden border-r border-gray-200 bg-white lg:flex lg:flex-col transition-[width] duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-[72px] shrink-0 items-center border-b border-gray-100 transition-all duration-300 ${
          collapsed ? 'justify-center px-2' : 'px-6'
        }`}
      >
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          {!collapsed && <span className="font-bold text-xl text-green-700">Tohana</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav
        className={`flex-1 overflow-y-auto py-6 transition-all duration-300 ${
          collapsed ? 'px-2' : 'px-4'
        }`}
      >
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </div>

        <div className="my-6 border-t border-gray-100" />

        <div className="space-y-1">
          {secondaryNavigation.map((item) => (
            <NavItem key={item.href} item={item} isSecondary />
          ))}
        </div>
      </nav>

      {/* Footer avec mini drawer toggle */}
      <div className={`border-t border-gray-100 transition-all duration-300 ${collapsed ? 'p-2' : 'p-4'}`}>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3 rounded-xl bg-green-50 p-3"
          >
            <p className="text-xs font-semibold text-green-800">Tohana</p>
            <p className="mt-1 text-[11px] leading-relaxed text-green-600">
              Observatoire de la résilience agricole
            </p>
          </motion.div>
        )}

        {/* Mini drawer toggle button */}
        <button
          onClick={toggleCollapse}
          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 ${
            collapsed ? 'justify-center' : ''
          }`}
          title={collapsed ? 'Agrandir' : 'Réduire'}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" />
              <span>Réduire</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );

  // ============================================================
  // SIDEBAR MOBILE
  // ============================================================

  const MobileSidebar = () => (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden"
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
        className="fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-gray-200 bg-white shadow-2xl lg:hidden"
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-gray-100 px-5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="font-bold text-xl text-green-700">Tohana</span>
          </Link>
          <button
            onClick={closeMobile}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isActive(item.href)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </div>
                <span className="flex-1">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="my-6 border-t border-gray-100" />

          <div className="space-y-1">
            {secondaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isActive(item.href)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </div>
                <span className="flex-1">{item.label}</span>
                {item.soon && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-semibold uppercase text-gray-400">
                    Bientôt
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={() => {
              closeMobile();
              handleLogout();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </motion.aside>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}