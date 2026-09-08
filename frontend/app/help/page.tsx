// app/help/page.tsx
'use client';

import { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
  BookOpen,
  Video,
  FileText,
  Users,
  Rocket,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Download,
  Play,
  ThumbsUp,
  Star,
  MessageSquare,
  LifeBuoy,
  Lightbulb,
  Award,
  GraduationCap,
  Globe,
  Server,
  Database,
  Layers,
  Zap,
  Lock,
  RefreshCw,
  Settings,
  User,
  Bell,
  Eye,
  Link2,
  ListChecks,
  Leaf
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

// ============================================================
// TYPES
// ============================================================

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ============================================================
// COMPOSANTS
// ============================================================

const FAQItem = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="border-b border-gray-100 last:border-0"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 px-4 rounded-lg transition-colors"
    >
      <span className="font-medium text-gray-900">{item.question}</span>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pb-4 px-4 text-gray-600 leading-relaxed">
            {item.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ============================================================
// PAGE PRINCIPALE
// ============================================================

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  // ============================================================
  // DONNÉES
  // ============================================================

  const categories = [
    { id: 'all', label: 'Toutes', icon: ListChecks },
    { id: 'getting-started', label: 'Démarrage', icon: Rocket },
    { id: 'farms', label: 'Exploitations', icon: Database },
    { id: 'plots', label: 'Parcelles', icon: Layers },
    { id: 'practices', label: 'Pratiques', icon: Leaf },
    { id: 'account', label: 'Compte', icon: User },
    { id: 'security', label: 'Sécurité', icon: Lock },
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      category: 'getting-started',
      question: 'Comment créer mon premier compte ?',
      answer: 'Pour créer votre compte, cliquez sur "S\'inscrire" en haut à droite de la page d\'accueil. Remplissez le formulaire avec vos informations personnelles (nom, email, mot de passe) puis validez. Vous recevrez un email de confirmation pour activer votre compte.',
    },
    {
      id: '2',
      category: 'getting-started',
      question: 'Comment me connecter à la plateforme ?',
      answer: 'Utilisez vos identifiants (email et mot de passe) sur la page de connexion. Si vous avez oublié votre mot de passe, cliquez sur "Mot de passe oublié" pour recevoir un lien de réinitialisation.',
    },
    {
      id: '3',
      category: 'farms',
      question: 'Comment ajouter une exploitation agricole ?',
      answer: 'Allez dans la section "Exploitations" puis cliquez sur "Nouvelle exploitation". Remplissez tous les champs requis (nom, localisation, surface) et enregistrez. Vous pouvez également ajouter des parcelles à votre exploitation.',
    },
    {
      id: '4',
      category: 'farms',
      question: 'Comment modifier les informations d\'une exploitation ?',
      answer: 'Dans la liste des exploitations, cliquez sur l\'icône "Modifier" (crayon) de l\'exploitation concernée. Modifiez les informations souhaitées et validez. Les données seront mises à jour automatiquement.',
    },
    {
      id: '5',
      category: 'plots',
      question: 'Comment créer une parcelle ?',
      answer: 'Accédez à la section "Parcelles" depuis le menu. Sélectionnez d\'abord l\'exploitation concernée, puis cliquez sur "Nouvelle parcelle". Remplissez les informations (nom, culture, surface) et enregistrez.',
    },
    {
      id: '6',
      category: 'plots',
      question: 'Quels types de cultures puis-je enregistrer ?',
      answer: 'Vous pouvez enregistrer tous les types de cultures : céréales (riz, maïs), tubercules (manioc, patate douce), légumineuses, cultures de rente (vanille, café) et fruits. La liste est exhaustive et couvre toutes les cultures de Madagascar.',
    },
    {
      id: '7',
      category: 'practices',
      question: 'Quelles sont les pratiques résilientes disponibles ?',
      answer: 'Nous proposons plus de 20 pratiques résilientes : culture de couverture, agroforesterie, compostage, irrigation économe, Zai, etc. Chaque pratique est décrite avec ses bénéfices et son impact sur les rendements.',
    },
    {
      id: '8',
      category: 'practices',
      question: 'Comment suivre l\'impact de mes pratiques ?',
      answer: 'Enregistrez vos pratiques avec les données de rendement avant/après. Le système calcule automatiquement l\'amélioration des rendements et génère des statistiques dans le dashboard.',
    },
    {
      id: '9',
      category: 'account',
      question: 'Comment modifier mon profil ?',
      answer: 'Allez dans la section "Profil" depuis le menu. Vous pouvez modifier vos informations personnelles (nom, email, téléphone) et télécharger une photo de profil. Les modifications sont sauvegardées automatiquement.',
    },
    {
      id: '10',
      category: 'account',
      question: 'Comment changer mon mot de passe ?',
      answer: 'Rendez-vous dans la section "Paramètres" puis "Sécurité". Entrez votre mot de passe actuel, puis le nouveau mot de passe et confirmez-le. Validez pour enregistrer le changement.',
    },
    {
      id: '11',
      category: 'security',
      question: 'Mes données sont-elles sécurisées ?',
      answer: 'Oui, toutes vos données sont sécurisées avec un chiffrement de bout en bout. Vos mots de passe sont hachés et nous utilisons des protocoles de sécurité modernes (HTTPS, JWT) pour protéger vos informations.',
    },
    {
      id: '12',
      category: 'security',
      question: 'Que faire si j\'oublie mon mot de passe ?',
      answer: 'Utilisez la fonction "Mot de passe oublié" sur la page de connexion. Vous recevrez un email avec un lien sécurisé pour réinitialiser votre mot de passe. Le lien expire après 24 heures.',
    },
  ];

  // ============================================================
  // FILTRES
  // ============================================================

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContact = (method: string) => {
    toast.success(`Demande de contact via ${method} envoyée !`);
  };

  // ============================================================
  // RENDU
  // ============================================================

  return (
    <Layout>
      <div className="space-y-8">
        {/* ====================================================
            EN-TÊTE
        ==================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
              <HelpCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Centre d'aide</h1>
              <p className="text-gray-500 mt-0.5">
                Trouvez des réponses à vos questions
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================
            RECHERCHE
        ==================================================== */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une question..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Card>

        {/* ====================================================
            STATISTIQUES
        ==================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
              <BookOpen className="h-4 w-4 text-purple-500" />
              Articles
            </div>
            <p className="text-2xl font-bold text-gray-900">{faqs.length}</p>
          </Card>
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
              <Users className="h-4 w-4 text-blue-500" />
              Utilisateurs aidés
            </div>
            <p className="text-2xl font-bold text-gray-900">1 234</p>
          </Card>
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              Taux de satisfaction
            </div>
            <p className="text-2xl font-bold text-gray-900">98%</p>
          </Card>
          <Card className="p-4 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
              <Clock className="h-4 w-4 text-amber-500" />
              Temps de réponse
            </div>
            <p className="text-2xl font-bold text-gray-900">&lt; 24h</p>
          </Card>
        </div>

        {/* ====================================================
            RESSOURCES RAPIDES
        ==================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/help/guides" className="group">
            <Card className="p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="p-3 bg-purple-100 rounded-xl inline-block mb-3 group-hover:bg-purple-200 transition-colors">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">Guides</h3>
              <p className="text-xs text-gray-400 mt-1">Tutoriels complets</p>
            </Card>
          </Link>
          <Link href="/help/videos" className="group">
            <Card className="p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="p-3 bg-blue-100 rounded-xl inline-block mb-3 group-hover:bg-blue-200 transition-colors">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Vidéos</h3>
              <p className="text-xs text-gray-400 mt-1">Tutoriels vidéo</p>
            </Card>
          </Link>
          <Link href="/help/docs" className="group">
            <Card className="p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="p-3 bg-green-100 rounded-xl inline-block mb-3 group-hover:bg-green-200 transition-colors">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Documentation</h3>
              <p className="text-xs text-gray-400 mt-1">Docs techniques</p>
            </Card>
          </Link>
          <Link href="/help/community" className="group">
            <Card className="p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="p-3 bg-amber-100 rounded-xl inline-block mb-3 group-hover:bg-amber-200 transition-colors">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-medium text-gray-900">Communauté</h3>
              <p className="text-xs text-gray-400 mt-1">Entraide</p>
            </Card>
          </Link>
        </div>

        {/* ====================================================
            FAQ
        ==================================================== */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Questions fréquentes
          </h2>
          <Card className="p-2 divide-y divide-gray-100">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  item={faq}
                  isOpen={openFAQ === faq.id}
                  onToggle={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p>Aucune question ne correspond à votre recherche</p>
                <p className="text-sm mt-1">Essayez avec d'autres mots-clés</p>
              </div>
            )}
          </Card>
        </div>

        {/* ====================================================
            CONTACT
        ==================================================== */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Besoin d'aide supplémentaire ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-xl inline-block mb-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="text-sm text-gray-500 mt-1">support@tohana.mg</p>
              <button 
                onClick={() => handleContact('email')}
                className="mt-3 text-blue-600 text-sm font-medium hover:underline"
              >
                Envoyer un email
              </button>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="p-3 bg-green-100 rounded-xl inline-block mb-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Chat en direct</h3>
              <p className="text-sm text-gray-500 mt-1">Disponible 24/7</p>
              <button 
                onClick={() => handleContact('chat')}
                className="mt-3 text-green-600 text-sm font-medium hover:underline"
              >
                Démarrer un chat
              </button>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="p-3 bg-purple-100 rounded-xl inline-block mb-3">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Téléphone</h3>
              <p className="text-sm text-gray-500 mt-1">+261 32 XX XXX XX</p>
              <button 
                onClick={() => handleContact('phone')}
                className="mt-3 text-purple-600 text-sm font-medium hover:underline"
              >
                Nous appeler
              </button>
            </Card>
          </div>
        </div>

        {/* ====================================================
            FOOTER
        ==================================================== */}
        <div className="text-center text-xs text-gray-400 border-t border-gray-100 pt-6">
          <p>
            © {new Date().getFullYear()} Tohana - Observatoire Agricole. Tous droits réservés.
          </p>
          <p className="mt-1">
            Besoin d'aide ? Consultez notre centre d'aide ou contactez-nous
          </p>
        </div>
      </div>
    </Layout>
  );
}