// components/marketing/CTASection.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-green-700">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          Prêt à transformer votre agriculture ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-green-100 mb-8 max-w-2xl mx-auto"
        >
          Rejoignez la communauté Tohana et améliorez votre résilience agricole.
          Inscrivez-vous gratuitement dès maintenant.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg shadow-green-800/20 hover:shadow-green-800/30"
          >
            Commencer maintenant
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}