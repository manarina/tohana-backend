// app/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/common/Layout';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette,
  Moon,
  Sun,
  LogOut,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Lock,
  UserCircle,
  Languages,
  Monitor,
  Smartphone as MobileIcon,
  Tablet,
  Laptop,
  ChevronRight,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState<any>(null);

  // États des formulaires
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    language: 'fr',
    timezone: 'Indian/Antananarivo',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
    language: 'fr',
    timezone: 'Indian/Antananarivo',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setProfileData({
        name: parsed.name || '',
        email: parsed.email || '',
        phone: parsed.phone || '',
        language: 'fr',
        timezone: 'Indian/Antananarivo',
      });
    }
  }, []);

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'preferences', label: 'Préférences', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const handleSaveProfile = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSaved(true);
    toast.success('Profil mis à jour avec succès !');
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success('Mot de passe modifié avec succès !');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success('Préférences sauvegardées !');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-100 rounded-xl">
            <Settings className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-500 mt-0.5">
              Gérez vos préférences et paramètres de compte
            </p>
          </div>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar des onglets */}
          <div className="lg:col-span-1">
            <Card className="p-2 sticky top-20">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : ''}`} />
                    <span className="flex-1 text-left">{tab.label}</span>
                    <ChevronRight className={`h-4 w-4 ${isActive ? 'text-purple-400' : 'text-gray-300'}`} />
                  </button>
                );
              })}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="flex-1 text-left">Déconnexion</span>
                </button>
              </div>
            </Card>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Informations du profil
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <div className="relative">
                        <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                          placeholder="+261 32 XX XXX XX"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Langue
                      </label>
                      <div className="relative">
                        <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                          value={profileData.language}
                          onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none"
                        >
                          <option value="fr">Français</option>
                          <option value="mg">Malagasy</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : saved ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {loading ? 'Enregistrement...' : saved ? 'Enregistré !' : 'Enregistrer'}
                    </button>
                    {saved && (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Modifications sauvegardées
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  Sécurité
                </h2>

                <div className="space-y-6">
                  {/* Changement de mot de passe */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Changer le mot de passe</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Mot de passe actuel
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.current ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            placeholder="Entrez votre mot de passe actuel"
                          />
                          <button
                            onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Nouveau mot de passe
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.new ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            placeholder="Minimum 8 caractères"
                          />
                          <button
                            onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Confirmer le nouveau mot de passe
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.confirm ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            placeholder="Confirmez votre nouveau mot de passe"
                          />
                          <button
                            onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                        {passwordData.newPassword && passwordData.confirmPassword && (
                          <p className={`text-xs mt-1 ${passwordData.newPassword === passwordData.confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                            {passwordData.newPassword === passwordData.confirmPassword ? (
                              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Les mots de passe correspondent</span>
                            ) : (
                              <span className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Les mots de passe ne correspondent pas</span>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleChangePassword}
                      disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || passwordData.newPassword !== passwordData.confirmPassword}
                      className="mt-4 flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                      {loading ? 'Changement...' : 'Changer le mot de passe'}
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  Préférences
                </h2>

                <div className="space-y-6">
                  {/* Thème */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Thème</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => setPreferences({ ...preferences, theme: 'light' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          preferences.theme === 'light'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Sun className="h-6 w-6 mx-auto text-yellow-500" />
                        <span className="text-xs mt-1 block text-gray-600">Clair</span>
                      </button>
                      <button
                        onClick={() => setPreferences({ ...preferences, theme: 'dark' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          preferences.theme === 'dark'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Moon className="h-6 w-6 mx-auto text-gray-700" />
                        <span className="text-xs mt-1 block text-gray-600">Sombre</span>
                      </button>
                      <button
                        onClick={() => setPreferences({ ...preferences, theme: 'system' })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          preferences.theme === 'system'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Monitor className="h-6 w-6 mx-auto text-gray-500" />
                        <span className="text-xs mt-1 block text-gray-600">Système</span>
                      </button>
                    </div>
                  </div>

                  {/* Langue */}
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Langue</h3>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className="w-full max-w-xs px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    >
                      <option value="fr">Français</option>
                      <option value="mg">Malagasy</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  {/* Fuseau horaire */}
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Fuseau horaire</h3>
                    <select
                      value={preferences.timezone}
                      onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
                      className="w-full max-w-xs px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    >
                      <option value="Indian/Antananarivo">Antananarivo (UTC+3)</option>
                      <option value="Europe/Paris">Paris (UTC+1)</option>
                      <option value="Africa/Nairobi">Nairobi (UTC+3)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleSavePreferences}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      {loading ? 'Enregistrement...' : 'Enregistrer les préférences'}
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-600" />
                  Notifications
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications push</h3>
                      <p className="text-sm text-gray-500">Recevoir des notifications sur votre navigateur</p>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, notifications: !preferences.notifications })}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        preferences.notifications ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                          preferences.notifications ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications email</h3>
                      <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        preferences.emailNotifications ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                          preferences.emailNotifications ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Notifications SMS</h3>
                      <p className="text-sm text-gray-500">Recevoir des notifications par SMS</p>
                    </div>
                    <button
                      onClick={() => setPreferences({ ...preferences, smsNotifications: !preferences.smsNotifications })}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        preferences.smsNotifications ? 'bg-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                          preferences.smsNotifications ? 'right-1' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}