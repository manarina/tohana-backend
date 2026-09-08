// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/common/Layout';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { ProfileQuickMenu } from '@/components/profile/ProfileQuickMenu';
import { ProfileStats } from '@/components/profile/ProfileStats';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileActivity } from '@/components/profile/ProfileActivity';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Données du profil
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    region: '',
    district: '',
    bio: '',
    joinedDate: '',
    avatar: '',
  });

  // Statistiques
  const [stats, setStats] = useState({
    farms: 0,
    plots: 0,
    practices: 0,
    harvests: 0,
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setProfile({
        name: parsed.name || 'Utilisateur',
        email: parsed.email || '',
        phone: parsed.phone || '',
        role: parsed.role || 'VIEWER',
        region: parsed.region || 'Non spécifié',
        district: parsed.district || 'Non spécifié',
        bio: parsed.bio || '',
        joinedDate: parsed.createdAt || new Date().toISOString(),
        avatar: '',
      });
    }

    // Simuler des statistiques (à remplacer par des données réelles)
    setStats({
      farms: 5,
      plots: 12,
      practices: 8,
      harvests: 24,
    });
  }, []);

  // ============================================================
  // HELPERS
  // ============================================================

  const getRoleLabel = (role: string) => {
    const roles: Record<string, { label: string; color: string }> = {
      ADMIN: { label: 'Administrateur', color: 'bg-purple-100 text-purple-800' },
      COORDINATOR: { label: 'Coordinateur', color: 'bg-blue-100 text-blue-800' },
      FIELD_AGENT: { label: 'Agent terrain', color: 'bg-green-100 text-green-800' },
      VIEWER: { label: 'Consultant', color: 'bg-gray-100 text-gray-800' },
    };
    return roles[role] || roles['VIEWER'];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getInitials = () => {
    if (!profile.name) return 'U';
    return profile.name
      .split(' ')
      .map((n: string) => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const roleInfo = getRoleLabel(profile.role);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleSave = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSaved(true);
    toast.success('Profil mis à jour avec succès !');
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Layout>
      <div className="space-y-6">
        {/* En-tête */}
        <ProfileHeader
          isEditing={isEditing}
          isLoading={loading}
          isSaved={saved}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
        />

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne de gauche */}
          <div className="lg:col-span-1">
            <ProfileCard
              name={profile.name}
              email={profile.email}
              phone={profile.phone}
              role={profile.role}
              region={profile.region}
              joinedDate={profile.joinedDate}
              roleInfo={roleInfo}
              getInitials={getInitials}
              formatDate={formatDate}
            />
          </div>

          {/* Colonne de droite */}
          <div className="lg:col-span-2 space-y-6">
          
            <ProfileInfo
              profile={profile}
              isEditing={isEditing}
              onProfileChange={handleProfileChange}
            />
    
          </div>
        </div>
      </div>
    </Layout>
  );
}