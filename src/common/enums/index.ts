// src/common/enums/index.ts
import { registerEnumType } from '@nestjs/graphql';
import { Regions } from '../constants/regions.enum';

// ✅ Enregistrer l'enum Regions pour GraphQL
registerEnumType(Regions, {
  name: 'Regions',
  description: 'Les 24 régions de Madagascar',
});

console.log('✅ GraphQL Regions enum registered successfully');
console.log('📋 Valeurs disponibles:', Object.values(Regions));