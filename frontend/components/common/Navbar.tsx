// components/common/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, LogOut, User, PanelLeftOpen, PanelLeftClose, ChevronDown, Settings, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebarStore } from '@/stores/useSidebarStore';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { collapsed, toggleCollapse, openMobile } = useSidebarStore();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      openMobile();
    }
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const fullName = user?.name || 'Utilisateur';
  const firstName = fullName.split(' ')[0] || 'Utilisateur';

  return (
    <header className="sticky top-0 z-30 bg-gray-50 backdrop-blur-md">
      <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ====================================================
            GAUCHE
        ==================================================== */}
        <div className="flex items-center gap-3">
          {/* Bouton Menu mobile */}
          <button
            onClick={handleMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Bouton Mini Drawer Desktop */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label={collapsed ? 'Agrandir le menu' : 'Réduire le menu'}
            title={collapsed ? 'Agrandir le menu' : 'Réduire le menu'}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>

          <div className="lg:hidden">
            <span className="text-xl font-bold text-green-700">Tohana</span>
          </div>

          <span className="hidden text-sm text-gray-400 lg:block">
            {new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* ====================================================
            DROITE - AVATAR AVEC DROPDOWN
        ==================================================== */}
        <div className="flex items-center gap-4">
          {/* Avatar avec dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-xl px-3 py-1.5 transition-colors hover:bg-gray-50 group"
              aria-label="Menu utilisateur"
            >
              {/* Avatar */}
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-sm font-bold text-green-700 shadow-sm">
                {initials}
              </div>

              {/* Informations utilisateur */}
              <div className="hidden text-left sm:block">
                <p className="max-w-[120px] truncate text-sm font-semibold text-gray-800 group-hover:text-gray-900">
                  {firstName}
                </p>
                <p className="text-xs text-gray-400 group-hover:text-gray-500">
                  {user?.role || 'VIEWER'}
                </p>
              </div>

              {/* Chevron */}
              <ChevronDown
                className={`hidden h-4 w-4 text-gray-400 transition-transform duration-200 sm:block ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* ==================================================
                DROPDOWN MENU
            ================================================== */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-200/50"
                >
                  {/* Header du dropdown */}
                  <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center text-base font-bold text-green-700">
                        {initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {fullName}
                        </p>
                        <p className="truncate text-xs text-gray-400">{user?.email || ''}</p>
                        <p className="mt-1 text-xs font-medium text-green-600">
                          {user?.role || 'VIEWER'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    {/* Profile */}
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <User className="h-4 w-4 text-gray-400" />
                      <span>Mon profil</span>
                    </Link>

                    {/* Settings */}
                    <Link
                      href="/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Settings className="h-4 w-4 text-gray-400" />
                      <span>Paramètres</span>
                    </Link>

                    {/* Help */}
                    <Link
                      href="/help"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                    >
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                      <span>Aide & support</span>
                    </Link>

                    {/* Séparateur */}
                    <div className="my-2 border-t border-gray-100" />

                    {/* Logout */}
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}