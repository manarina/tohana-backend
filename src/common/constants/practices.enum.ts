// src/common/constants/practices.enum.ts

/**
 * Types de pratiques agricoles résilientes
 */
export enum PracticeTypes {
  // ===== Pratiques de conservation des sols =====
  CULTURE_DE_COUVERTURE = 'CULTURE_DE_COUVERTURE',
  MULCHING = 'MULCHING',
  BANDES_ENHERBEES = 'BANDES_ENHERBEES',
  ZAI = 'ZAI',
  TERRASSEMENT = 'TERRASSEMENT',

  // ===== Pratiques agroforestières =====
  AGROFORESTERIE = 'AGROFORESTERIE',
  HAIES_VIVES = 'HAIES_VIVES',
  ARBRES_AGROFORESTIERS = 'ARBRES_AGROFORESTIERS',

  // ===== Pratiques de gestion de l'eau =====
  IRRIGATION_ECONOMIE_EAU = 'IRRIGATION_ECONOMIE_EAU',
  GOUTTE_A_GOUTTE = 'GOUTTE_A_GOUTTE',
  BASSINE = 'BASSINE',
  CAPTAGE_EAU = 'CAPTAGE_EAU',

  // ===== Pratiques de fertilisation =====
  COMPOSTAGE = 'COMPOSTAGE',
  FUMURE_ORGANIQUE = 'FUMURE_ORGANIQUE',
  CROISSANCE_VERTE = 'CROISSANCE_VERTE',
  BIOCHAR = 'BIOCHAR',

  // ===== Pratiques culturales =====
  ROTATION_CULTURES = 'ROTATION_CULTURES',
  ASSOCIATION_CULTURES = 'ASSOCIATION_CULTURES',
  SEMIS_DIRECT = 'SEMIS_DIRECT',
  LABOUR_MINIMAL = 'LABOUR_MINIMAL',

  // ===== Pratiques d'adaptation climatique =====
  VARIETES_RESILIENTES = 'VARIETES_RESILIENTES',
  CALENDRIER_AGROCLIMATIQUE = 'CALENDRIER_AGROCLIMATIQUE',
  ASSURANCE_CLIMATIQUE = 'ASSURANCE_CLIMATIQUE',

  AUTRE = 'AUTRE',
}

/**
 * Labels des pratiques en français
 */
export const PRACTICE_LABELS: Record<PracticeTypes, string> = {
  // Pratiques de conservation des sols
  [PracticeTypes.CULTURE_DE_COUVERTURE]: 'Culture de couverture (Mucuna)',
  [PracticeTypes.MULCHING]: 'Mulching (Paillage)',
  [PracticeTypes.BANDES_ENHERBEES]: 'Bandes enherbées',
  [PracticeTypes.ZAI]: 'Technique Zai (Poquets)',
  [PracticeTypes.TERRASSEMENT]: 'Terrassement / Courbes de niveau',

  // Pratiques agroforestières
  [PracticeTypes.AGROFORESTERIE]: 'Agroforesterie',
  [PracticeTypes.HAIES_VIVES]: 'Haies vives',
  [PracticeTypes.ARBRES_AGROFORESTIERS]: 'Arbres agroforestiers',

  // Pratiques de gestion de l'eau
  [PracticeTypes.IRRIGATION_ECONOMIE_EAU]: "Irrigation d'économie d'eau",
  [PracticeTypes.GOUTTE_A_GOUTTE]: 'Goutte-à-goutte',
  [PracticeTypes.BASSINE]: 'Bassine d\'irrigation',
  [PracticeTypes.CAPTAGE_EAU]: 'Captage d\'eau',

  // Pratiques de fertilisation
  [PracticeTypes.COMPOSTAGE]: 'Compostage',
  [PracticeTypes.FUMURE_ORGANIQUE]: 'Fumure organique',
  [PracticeTypes.CROISSANCE_VERTE]: 'Engrais vert',
  [PracticeTypes.BIOCHAR]: 'Biochar',

  // Pratiques culturales
  [PracticeTypes.ROTATION_CULTURES]: 'Rotation des cultures',
  [PracticeTypes.ASSOCIATION_CULTURES]: 'Association de cultures',
  [PracticeTypes.SEMIS_DIRECT]: 'Semis direct',
  [PracticeTypes.LABOUR_MINIMAL]: 'Labour minimal',

  // Pratiques d'adaptation climatique
  [PracticeTypes.VARIETES_RESILIENTES]: 'Variétés résilientes',
  [PracticeTypes.CALENDRIER_AGROCLIMATIQUE]: 'Calendrier agroclimatique',
  [PracticeTypes.ASSURANCE_CLIMATIQUE]: 'Assurance climatique',

  [PracticeTypes.AUTRE]: 'Autre',
};

/**
 * Catégories de pratiques
 */
export const PRACTICE_CATEGORIES = {
  CONSERVATION_SOLS: [
    'CULTURE_DE_COUVERTURE',
    'MULCHING',
    'BANDES_ENHERBEES',
    'ZAI',
    'TERRASSEMENT',
  ],
  AGROFORESTERIE: ['AGROFORESTERIE', 'HAIES_VIVES', 'ARBRES_AGROFORESTIERS'],
  GESTION_EAU: ['IRRIGATION_ECONOMIE_EAU', 'GOUTTE_A_GOUTTE', 'BASSINE', 'CAPTAGE_EAU'],
  FERTILISATION: ['COMPOSTAGE', 'FUMURE_ORGANIQUE', 'CROISSANCE_VERTE', 'BIOCHAR'],
  CULTURALES: ['ROTATION_CULTURES', 'ASSOCIATION_CULTURES', 'SEMIS_DIRECT', 'LABOUR_MINIMAL'],
  ADAPTATION: ['VARIETES_RESILIENTES', 'CALENDRIER_AGROCLIMATIQUE', 'ASSURANCE_CLIMATIQUE'],
};

/**
 * Bénéfices perçus
 */
export enum PerceivedBenefits {
  AMELIORATION_SOL = 'AMELIORATION_SOL',
  AUGMENTATION_RENDEMENT = 'AUGMENTATION_RENDEMENT',
  REDUCTION_EROSION = 'REDUCTION_EROSION',
  ECONOMIE_EAU = 'ECONOMIE_EAU',
  REDUCTION_INTRANTS = 'REDUCTION_INTRANTS',
  DIVERSIFICATION_REVENUS = 'DIVERSIFICATION_REVENUS',
  MEILLEURE_ADAPTATION = 'MEILLEURE_ADAPTATION',
  AUTRE = 'AUTRE',
}

export const BENEFIT_LABELS: Record<PerceivedBenefits, string> = {
  [PerceivedBenefits.AMELIORATION_SOL]: 'Amélioration de la fertilité du sol',
  [PerceivedBenefits.AUGMENTATION_RENDEMENT]: 'Augmentation du rendement',
  [PerceivedBenefits.REDUCTION_EROSION]: 'Réduction de l\'érosion',
  [PerceivedBenefits.ECONOMIE_EAU]: 'Économie d\'eau',
  [PerceivedBenefits.REDUCTION_INTRANTS]: 'Réduction des intrants',
  [PerceivedBenefits.DIVERSIFICATION_REVENUS]: 'Diversification des revenus',
  [PerceivedBenefits.MEILLEURE_ADAPTATION]: 'Meilleure adaptation climatique',
  [PerceivedBenefits.AUTRE]: 'Autre bénéfice',
};

/**
 * Sources de connaissance
 */
export enum KnowledgeSources {
  FORMATION_TOHATRA = 'FORMATION_TOHATRA',
  FORMATION_DEFIS = 'FORMATION_DEFIS',
  FORMATION_PRADA = 'FORMATION_PRADA',
  VULGARISATION = 'VULGARISATION',
  ECHANGE_PAYSAN = 'ECHANGE_PAYSAN',
  AUTO_APPRENTISSAGE = 'AUTO_APPRENTISSAGE',
  AUTRE = 'AUTRE',
}

export const KNOWLEDGE_SOURCE_LABELS: Record<KnowledgeSources, string> = {
  [KnowledgeSources.FORMATION_TOHATRA]: 'Formation TOHATRA',
  [KnowledgeSources.FORMATION_DEFIS]: 'Formation DEFIS',
  [KnowledgeSources.FORMATION_PRADA]: 'Formation PrAda',
  [KnowledgeSources.VULGARISATION]: 'Vulgarisation agricole',
  [KnowledgeSources.ECHANGE_PAYSAN]: 'Échange entre paysans',
  [KnowledgeSources.AUTO_APPRENTISSAGE]: 'Auto-apprentissage',
  [KnowledgeSources.AUTRE]: 'Autre source',
};