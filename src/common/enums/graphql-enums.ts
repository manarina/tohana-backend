// src/common/enums/graphql-enums.ts
import { registerEnumType } from '@nestjs/graphql';
import { Regions } from '../constants/regions.enum';

// ✅ Enregistrer l'enum Regions pour GraphQL
registerEnumType(Regions, {
  name: 'Regions',
  description: 'Les 24 régions de Madagascar',
  valuesMap: {
    ANALAMANGA: { description: 'Analamanga' },
    BONGOLAVA: { description: 'Bongolava' },
    ITASY: { description: 'Itasy' },
    VAKINANKARATRA: { description: 'Vakinankaratra' },
    DIANA: { description: 'Diana' },
    SAVA: { description: 'Sava' },
    AMORONI_MANIA: { description: 'Amoron\'i Mania' },
    HAUTE_MATSIATRA: { description: 'Haute Matsiatra' },
    VATOVAVY: { description: 'Vatovavy' },
    FITOVINANY: { description: 'Fitovinany' },
    ATSIMO_ATSINANANA: { description: 'Atsimo Atsinanana' },
    IHOROMBE: { description: 'Ihorombe' },
    SOFIA: { description: 'Sofia' },
    BOENY: { description: 'Boeny' },
    BETSIBOKA: { description: 'Betsiboka' },
    MELAKY: { description: 'Melaky' },
    ALAOTRA_MANGORO: { description: 'Alaotra-Mangoro' },
    ATSINANANA: { description: 'Atsinanana' },
    ANALANJIROFO: { description: 'Analanjirofo' },
    AMBATOSOA: { description: 'Ambatosoa' },
    MENABE: { description: 'Menabe' },
    ATSIMO_ANDREFANA: { description: 'Atsimo Andrefana' },
    ANDROY: { description: 'Androy' },
    ANOSY: { description: 'Anôsy' },
  },
});