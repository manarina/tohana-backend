// components/marketing/FeaturesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { 
  MapPin, 
  Leaf, 
  BarChart3, 
  Users, 
  Droplet, 
  Shield,
  Sprout,
  TrendingUp,
  Gauge
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: MapPin,
      title: 'Suivi des exploitations',
      description: 'Gérez vos parcelles et suivez les cultures en temps réel.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Leaf,
      title: 'Pratiques résilientes',
      description: 'Adoptez des techniques agricoles durables et climato-intelligentes.',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: BarChart3,
      title: 'Analyse et statistiques',
      description: 'Visualisez vos données et prenez des décisions éclairées.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      icon: Users,
      title: 'Communauté agricole',
      description: 'Échangez avec d\'autres agriculteurs et partenaires.',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      icon: Droplet,
      title: 'Gestion de l\'eau',
      description: 'Optimisez l\'irrigation et la gestion des ressources en eau.',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
    },
    {
      icon: Shield,
      title: 'Résilience climatique',
      description: 'Protégez vos cultures face aux aléas climatiques.',
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      icon: Sprout,
      title: 'Agroécologie',
      description: 'Promouvez des pratiques agricoles respectueuses de l\'environnement.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      icon: TrendingUp,
      title: 'Amélioration continue',
      description: 'Suivez vos progrès et améliorez vos rendements.',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      icon: Gauge,
      title: 'Indicateurs de performance',
      description: 'Mesurez votre résilience avec des indicateurs clés.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Pourquoi choisir <span className="text-green-600">Tohana</span> ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Une plateforme complète pour le suivi et l&apos;amélioration de la résilience agricole
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-green-100"
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}