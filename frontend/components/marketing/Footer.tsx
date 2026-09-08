// components/marketing/Footer.tsx
'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌾</span>
              <span className="font-bold text-xl">Tohana</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Observatoire de la Résilience Agricole pour le Sud-Est de Madagascar.
            </p>
            <div className="flex gap-4 mt-4">
              
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Liens rapides</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-white transition-colors">
                  Connexion
                </Link>
              </li>
              <li>
                <Link href="/auth/register" className="hover:text-white transition-colors">
                  Inscription
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-white transition-colors">
                  Fonctionnalités
                </Link>
              </li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Ressources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Documentation
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  FAQ
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Support
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>contact@tohana.mg</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Antananarivo, Madagascar</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+261 32 XX XXX XX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Tohana. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}