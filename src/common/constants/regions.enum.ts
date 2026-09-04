// src/common/constants/regions.enum.ts

// Enum des 24 régions officielles de Madagascar (mise à jour 2023)
export enum Regions {
  // Province d'Antananarivo
  ANALAMANGA = 'ANALAMANGA',
  BONGOLAVA = 'BONGOLAVA',
  ITASY = 'ITASY',
  VAKINANKARATRA = 'VAKINANKARATRA',

  // Province d'Antsiranana
  DIANA = 'DIANA',
  SAVA = 'SAVA',

  // Province de Fianarantsoa
  AMORONI_MANIA = 'AMORONI_MANIA',
  HAUTE_MATSIATRA = 'HAUTE_MATSIATRA',
  VATOVAVY = 'VATOVAVY',
  FITOVINANY = 'FITOVINANY',
  ATSIMO_ATSINANANA = 'ATSIMO_ATSINANANA',
  IHOROMBE = 'IHOROMBE',

  // Province de Mahajanga
  SOFIA = 'SOFIA',
  BOENY = 'BOENY',
  BETSIBOKA = 'BETSIBOKA',
  MELAKY = 'MELAKY',

  // Province de Toamasina
  ALAOTRA_MANGORO = 'ALAOTRA_MANGORO',
  ATSINANANA = 'ATSINANANA',
  ANALANJIROFO = 'ANALANJIROFO',
  AMBATOSOA = 'AMBATOSOA', // Nouvelle région créée en 2023 [citation:1][citation:12]

  // Province de Toliara
  MENABE = 'MENABE',
  ATSIMO_ANDREFANA = 'ATSIMO_ANDREFANA',
  ANDROY = 'ANDROY',
  ANOSY = 'ANOSY',
}

// Labels des régions en français
export const REGION_LABELS: Record<Regions, string> = {
  // Province d'Antananarivo
  [Regions.ANALAMANGA]: 'Analamanga',
  [Regions.BONGOLAVA]: 'Bongolava',
  [Regions.ITASY]: 'Itasy',
  [Regions.VAKINANKARATRA]: 'Vakinankaratra',

  // Province d'Antsiranana
  [Regions.DIANA]: 'Diana',
  [Regions.SAVA]: 'Sava',

  // Province de Fianarantsoa
  [Regions.AMORONI_MANIA]: 'Amoron\'i Mania',
  [Regions.HAUTE_MATSIATRA]: 'Haute Matsiatra',
  [Regions.VATOVAVY]: 'Vatovavy',
  [Regions.FITOVINANY]: 'Fitovinany',
  [Regions.ATSIMO_ATSINANANA]: 'Atsimo Atsinanana',
  [Regions.IHOROMBE]: 'Ihorombe',

  // Province de Mahajanga
  [Regions.SOFIA]: 'Sofia',
  [Regions.BOENY]: 'Boeny',
  [Regions.BETSIBOKA]: 'Betsiboka',
  [Regions.MELAKY]: 'Melaky',

  // Province de Toamasina
  [Regions.ALAOTRA_MANGORO]: 'Alaotra-Mangoro',
  [Regions.ATSINANANA]: 'Atsinanana',
  [Regions.ANALANJIROFO]: 'Analanjirofo',
  [Regions.AMBATOSOA]: 'Ambatosoa', // Créée en 2023 [citation:1][citation:12]

  // Province de Toliara
  [Regions.MENABE]: 'Menabe',
  [Regions.ATSIMO_ANDREFANA]: 'Atsimo Andrefana',
  [Regions.ANDROY]: 'Androy',
  [Regions.ANOSY]: 'Anôsy',
};

// Districts par région (basé sur le découpage officiel) [citation:1][citation:8][citation:9]
export const REGION_DISTRICTS: Record<Regions, string[]> = {
  // ===== Province d'Antananarivo =====
  [Regions.ANALAMANGA]: [
    'Ambohidratrimo',
    'Andramasina',
    'Anjozorobe',
    'Ankazobe',
    'Antananarivo Atsimondrano',
    'Antananarivo Avaradrano',
    'Antananarivo Renivohitra', // Commune Urbaine d'Antananarivo
    'Manjakandriana',
  ],
  [Regions.BONGOLAVA]: [
    'Fenoarivobe',
    'Tsiroanomandidy',
  ],
  [Regions.ITASY]: [
    'Arivonimamo',
    'Miarinarivo',
    'Soavinandriana',
  ],
  [Regions.VAKINANKARATRA]: [
    'Ambatolampy',
    'Antanifotsy',
    'Antsirabe I',
    'Antsirabe II',
    'Betafo',
    'Faratsiho',
    'Mandoto',
  ],

  // ===== Province d'Antsiranana =====
  [Regions.DIANA]: [
    'Ambanja',
    'Ambilobe',
    'Antsiranana I',
    'Antsiranana II',
    'Nosy Be',
  ],
  [Regions.SAVA]: [
    'Andapa',
    'Antalaha',
    'Sambava',
    'Vohemar',
  ],

  // ===== Province de Fianarantsoa =====
  [Regions.AMORONI_MANIA]: [
    'Ambatofinandrahana',
    'Ambositra',
    'Fandriana',
    'Manandriana',
  ],
  [Regions.HAUTE_MATSIATRA]: [
    'Ambalavao',
    'Ambohimahasoa',
    'Fianarantsoa I',
    'Ikalamavony',
    'Isandra',
    'Lalangina',
    'Vohibato',
  ],
  [Regions.VATOVAVY]: [
    'Ifanadiana',
    'Mananjary',
    'Nosy Varika',
  ],
  [Regions.FITOVINANY]: [
    'Ikongo',
    'Manakara',
    'Vohipeno',
  ],
  [Regions.ATSIMO_ATSINANANA]: [
    'Befotaka',
    'Farafangana',
    'Midongy',
    'Vangaindrano',
    'Vondrozo',
  ],
  [Regions.IHOROMBE]: [
    'Iakora',
    'Ihosy',
    'Ivohibe', // (Ivohibe est parfois inclus)
  ],

  // ===== Province de Mahajanga =====
  [Regions.SOFIA]: [
    'Analalava',
    'Antsohihy',
    'Bealanana',
    'Befandriana Nord',
    'Boriziny',
    'Mampikony',
    'Mandritsara',
  ],
  [Regions.BOENY]: [
    'Ambato Boeni',
    'Mahajanga I',
    'Mahajanga II',
    'Marovoay',
    'Mitsinjo',
    'Soalala',
  ],
  [Regions.BETSIBOKA]: [
    'Kandreho',
    'Maevatanana',
    'Tsaratanana',
  ],
  [Regions.MELAKY]: [
    'Ambatomainty',
    'Antsalova',
    'Besalampy',
    'Maintirano',
    'Morafenobe',
  ],

  // ===== Province de Toamasina =====
  [Regions.ALAOTRA_MANGORO]: [
    'Ambatondrazaka',
    'Amparafaravola',
    'Andilamena',
    'Anosibe An\'ala',
    'Moramanga',
  ],
  [Regions.ATSINANANA]: [
    'Antanambao Manampotsy',
    'Brickaville',
    'Mahanoro',
    'Marolambo',
    'Toamasina I',
    'Toamasina II',
    'Vatomandry',
  ],
  [Regions.ANALANJIROFO]: [
    'Fenoarivo Atsinanana',
    'Nosy Boraha',
    'Soanierana Ivongo',
    'Vavatenina',
  ],
  [Regions.AMBATOSOA]: [
    // Nouvelle région créée en 2023, composée des districts de
    'Mananara Nord',
    'Maroantsetra',
  ],

  // ===== Province de Toliara =====
  [Regions.MENABE]: [
    'Belon\'i Tsiribihina',
    'Mahabo',
    'Manja',
    'Miandrivazo',
    'Morondava',
  ],
  [Regions.ATSIMO_ANDREFANA]: [
    'Ampanihy',
    'Ankazoabo Atsimo',
    'Benenitra',
    'Betioky Atsimo',
    'Beroroha',
    'Morombe',
    'Sakaraha',
    'Toliara I',
    'Toliara II',
  ],
  [Regions.ANDROY]: [
    'Ambovombe Androy',
    'Beloha Androy',
    'Tsihombe',
    'Antanimora Sud',
    'Bekily Androy'
  ],
  [Regions.ANOSY]: [
    'Amboasary Sud',
    'Betroka',
    'Taolagnaro', // Fort-Dauphin
  ],
};

// Options pour les selects (UI)
export const REGION_OPTIONS = Object.values(Regions).map((region) => ({
  value: region,
  label: REGION_LABELS[region],
}));

// Récupérer les districts d'une région
export const getDistricts = (region: Regions): string[] => {
  return REGION_DISTRICTS[region] || [];
};

// Vérifier si un district appartient à une région
export const isDistrictInRegion = (district: string, region: Regions): boolean => {
  return REGION_DISTRICTS[region]?.includes(district) || false;
};