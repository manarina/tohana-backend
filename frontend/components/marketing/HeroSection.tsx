// components/marketing/HeroSection.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, TrendingUp, Sprout } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-green-50 to-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <Sprout className="h-4 w-4" />
              Résilience agricole
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Observatoire de la{' '}
              <span className="text-green-600">Résilience Agricole</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Suivez et améliorez la résilience agricole dans le Sud-Est de Madagascar.
              Une plateforme dédiée aux agriculteurs, coopératives et décideurs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/register"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-xl shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all flex items-center justify-center gap-2"
              >
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50 transition-all flex items-center justify-center gap-2"
              >
                En savoir plus
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Gratuit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Sécurisé
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Pour les agriculteurs
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-green-500" />
                +100 agriculteurs
              </span>
            </div>
          </motion.div>

          {/* Image / Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🌾</div>
                  <p className="text-lg font-medium text-green-800">
                    Agriculture résiliente
                  </p>
                  <p className="text-sm text-green-600">
                    Pour un avenir durable
                  </p>
                </div>
              </div>
            </div>

            {/* Badges flottants */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3"
            >
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">+100 agriculteurs</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">+25% rendement</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}