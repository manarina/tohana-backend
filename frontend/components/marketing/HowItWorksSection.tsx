// components/marketing/HowItWorksSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, MapPin, Leaf, TrendingUp, ArrowRight } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Créez votre compte',
      description: 'Inscrivez-vous gratuitement et accédez à la plateforme.',
      icon: Users,
    },
    {
      number: '02',
      title: 'Enregistrez vos parcelles',
      description: 'Ajoutez vos exploitations et parcelles agricoles.',
      icon: MapPin,
    },
    {
      number: '03',
      title: 'Suivez vos pratiques',
      description: 'Documentez vos pratiques résilientes et leurs impacts.',
      icon: Leaf,
    },
    {
      number: '04',
      title: 'Analysez et progressez',
      description: 'Visualisez vos données et améliorez vos rendements.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Comment ça fonctionne ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Quatre étapes simples pour transformer votre agriculture
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-green-200 mb-2">
                  {step.number}
                </div>
                <div className="inline-flex p-2 bg-green-100 rounded-lg mb-3">
                  <step.icon className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="h-5 w-5 text-green-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}