// src/common/constants/crops.enum.ts

/**
 * Types de cultures agricoles à Madagascar
 */
export enum CropTypes {
  // ===== Céréales =====
  RIZ = 'RIZ',
  MAIS = 'MAIS',
  SORGHO = 'SORGHO',
  MIL = 'MIL',

  // ===== Tubercules =====
  MANIOC = 'MANIOC',
  PATATE_DOUCE = 'PATATE_DOUCE',
  IGNAME = 'IGNAME',
  POMME_DE_TERRE = 'POMME_DE_TERRE',

  // ===== Légumineuses =====
  ARACHIDE = 'ARACHIDE',
  HARICOT = 'HARICOT',
  POIS = 'POIS',
  SOJA = 'SOJA',
  LENTILLE = 'LENTILLE',

  // ===== Cultures de rente =====
  VANILLE = 'VANILLE',
  CAFE = 'CAFE',
  GIROFLE = 'GIROFLE',
  POIVRE = 'POIVRE',
  CACAO = 'CACAO',

  // ===== Fruits =====
  BANANE = 'BANANE',
  MANGE = 'MANGE',
  ANANAS = 'ANANAS',
  AGRUME = 'AGRUME',
  PAPAYE = 'PAPAYE',

  // ===== Légumes =====
  TOMATE = 'TOMATE',
  OIGNON = 'OIGNON',
  AIL = 'AIL',
  CHOU = 'CHOU',
  SALADE = 'SALADE',
  CONCOMBRE = 'CONCOMBRE',
  COURGETTE = 'COURGETTE',

  // ===== Autres =====
  CANNE_A_SUCRE = 'CANNE_A_SUCRE',
  COTON = 'COTON',
  TABAC = 'TABAC',
  HUILE_DE_PALME = 'HUILE_DE_PALME',
  KAOL = 'KAOL',
  AUTRE = 'AUTRE',
}

/**
 * Labels des cultures en français
 */
export const CROP_LABELS: Record<CropTypes, string> = {
  // ===== Céréales =====
  [CropTypes.RIZ]: 'Riz',
  [CropTypes.MAIS]: 'Maïs',
  [CropTypes.SORGHO]: 'Sorgho',
  [CropTypes.MIL]: 'Mil',

  // ===== Tubercules =====
  [CropTypes.MANIOC]: 'Manioc',
  [CropTypes.PATATE_DOUCE]: 'Patate douce',
  [CropTypes.IGNAME]: 'Igname',
  [CropTypes.POMME_DE_TERRE]: 'Pomme de terre',

  // ===== Légumineuses =====
  [CropTypes.ARACHIDE]: 'Arachide',
  [CropTypes.HARICOT]: 'Haricot',
  [CropTypes.POIS]: 'Pois',
  [CropTypes.SOJA]: 'Soja',
  [CropTypes.LENTILLE]: 'Lentille',

  // ===== Cultures de rente =====
  [CropTypes.VANILLE]: 'Vanille',
  [CropTypes.CAFE]: 'Café',
  [CropTypes.GIROFLE]: 'Girofle',
  [CropTypes.POIVRE]: 'Poivre',
  [CropTypes.CACAO]: 'Cacao',

  // ===== Fruits =====
  [CropTypes.BANANE]: 'Banane',
  [CropTypes.MANGE]: 'Mangue',
  [CropTypes.ANANAS]: 'Ananas',
  [CropTypes.AGRUME]: 'Agrume',
  [CropTypes.PAPAYE]: 'Papaye',

  // ===== Légumes =====
  [CropTypes.TOMATE]: 'Tomate',
  [CropTypes.OIGNON]: 'Oignon',
  [CropTypes.AIL]: 'Ail',
  [CropTypes.CHOU]: 'Chou',
  [CropTypes.SALADE]: 'Salade',
  [CropTypes.CONCOMBRE]: 'Concombre',
  [CropTypes.COURGETTE]: 'Courgette',

  // ===== Autres =====
  [CropTypes.CANNE_A_SUCRE]: 'Canne à sucre',
  [CropTypes.COTON]: 'Coton',
  [CropTypes.TABAC]: 'Tabac',
  [CropTypes.HUILE_DE_PALME]: 'Huile de palme',
  [CropTypes.KAOL]: 'Kaol',
  [CropTypes.AUTRE]: 'Autre',
};

/**
 * Catégories de cultures
 */
export const CROP_CATEGORIES = {
  CEREALES: ['RIZ', 'MAIS', 'SORGHO', 'MIL'],
  TUBERCULES: ['MANIOC', 'PATATE_DOUCE', 'IGNOME', 'POMME_DE_TERRE'],
  LEGUMINEUSES: ['ARACHIDE', 'HARICOT', 'POIS', 'SOJA', 'LENTILLE'],
  RENTE: ['VANILLE', 'CAFE', 'GIROFLE', 'POIVRE', 'CACAO'],
  FRUITS: ['BANANE', 'MANGE', 'ANANAS', 'AGRUME', 'PAPAYE'],
  LEGUMES: ['TOMATE', 'OIGNON', 'AIL', 'CHOU', 'SALADE', 'CONCOMBRE', 'COURGETTE'],
  AUTRES: ['CANNE_A_SUCRE', 'COTON', 'TABAC', 'HUILE_DE_PALME', 'KAOL', 'AUTRE'],
};

/**
 * Options pour les selects (UI)
 */
export const CROP_OPTIONS = Object.values(CropTypes).map((crop) => ({
  value: crop,
  label: CROP_LABELS[crop],
}));

/**
 * Grouper les cultures par catégorie
 */
export const CROP_GROUPED_OPTIONS = [
  {
    label: 'Céréales',
    options: CROP_CATEGORIES.CEREALES.map((crop) => ({
      value: crop,
      label: CROP_LABELS[crop as CropTypes],
    })),
  },
  {
    label: 'Tubercules',
    options: CROP_CATEGORIES.TUBERCULES.map((crop) => ({
      value: crop,
      label: CROP_LABELS[crop as CropTypes],
    })),
  },
  {
    label: 'Légumineuses',
    options: CROP_CATEGORIES.LEGUMINEUSES.map((crop) => ({
      value: crop,
      label: CROP_LABELS[crop as CropTypes],
    })),
  },
  {
    label: 'Cultures de rente',
    options: CROP_CATEGORIES.RENTE.map((crop) => ({
      value: crop,
      label: CROP_LABELS[crop as CropTypes],
    })),
  },
  {
    label: 'Fruits',
    options: CROP_CATEGORIES.FRUITS.map((crop) => ({
      value: crop,
      label: CROP_LABELS[crop as CropTypes],
    })),
  },
  {
    label: 'Légumes',
    options: CROP_CATEGORIES.LEGUMES.map((crop) => ({
      value: crop,
      label: CROP_LABELS[crop as CropTypes],
    })),
  },
  {
    label: 'Autres',
    options: CROP_CATEGORIES.AUTRES.map((crop) => ({
      value: crop,
      label: CROP_LABELS[crop as CropTypes],
    })),
  },
];

/**
 * Vérifier si une culture est une céréale
 */
export const isCereal = (cropType: CropTypes): boolean => {
  return CROP_CATEGORIES.CEREALES.includes(cropType);
};

/**
 * Vérifier si une culture est une tubercule
 */
export const isTubercule = (cropType: CropTypes): boolean => {
  return CROP_CATEGORIES.TUBERCULES.includes(cropType);
};

/**
 * Vérifier si une culture est une légumineuse
 */
export const isLegumineuse = (cropType: CropTypes): boolean => {
  return CROP_CATEGORIES.LEGUMINEUSES.includes(cropType);
};

/**
 * Vérifier si une culture est de rente
 */
export const isRente = (cropType: CropTypes): boolean => {
  return CROP_CATEGORIES.RENTE.includes(cropType);
};

/**
 * Obtenir la catégorie d'une culture
 */
export const getCropCategory = (cropType: CropTypes): string | null => {
  if (isCereal(cropType)) return 'Céréales';
  if (isTubercule(cropType)) return 'Tubercules';
  if (isLegumineuse(cropType)) return 'Légumineuses';
  if (isRente(cropType)) return 'Cultures de rente';
  return null;
};