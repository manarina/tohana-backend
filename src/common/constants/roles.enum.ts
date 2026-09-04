export enum Roles {
  ADMIN = 'ADMIN',
  FIELD_AGENT = 'FIELD_AGENT',
  COORDINATOR = 'COORDINATOR',
  VIEWER = 'VIEWER',
}

export const ROLE_HIERARCHY = {
  [Roles.ADMIN]: 4,
  [Roles.COORDINATOR]: 3,
  [Roles.FIELD_AGENT]: 2,
  [Roles.VIEWER]: 1,
};

export const ROLE_DESCRIPTIONS = {
  [Roles.ADMIN]: 'Accès complet à toutes les données et fonctionnalités',
  [Roles.COORDINATOR]: 'Gestion des projets et supervision des agents terrain',
  [Roles.FIELD_AGENT]: 'Collecte de données sur le terrain',
  [Roles.VIEWER]: 'Consultation des données uniquement',
};