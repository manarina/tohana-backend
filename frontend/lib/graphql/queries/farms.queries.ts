// lib/graphql/queries/farms.queries.ts
import { gql } from '@apollo/client';

// ============================================
// Récupérer toutes les exploitations (avec filtres)
// ============================================

export const GET_FARMS = gql`
  query GetFarms($filters: FarmFiltersInput) {
    farms(filters: $filters) {
      id
      name
      description
      region
      district
      commune
      village
      fokontany
      gpsLatitude
      gpsLongitude
      totalSurface
      phoneNumber
      farmerGroup
      isBeneficiary
      programAffiliation
      notes
      createdAt
      updatedAt
      user {
        id
        email
        name
        role
      }
    }
  }
`;

// ============================================
// Récupérer toutes les exploitations (sans filtre)
// ============================================

export const GET_ALL_FARMS = gql`
  query GetAllFarms {
    allFarms {
      id
      name
      region
      district
      commune
      village
      totalSurface
      isBeneficiary
      programAffiliation
      user {
        id
        name
        email
      }
    }
  }
`;

// ============================================
// Récupérer une exploitation par ID
// ============================================

export const GET_FARM = gql`
  query GetFarm($id: Int!) {
    farm(id: $id) {
      id
      name
      description
      region
      district
      commune
      village
      fokontany
      gpsLatitude
      gpsLongitude
      totalSurface
      phoneNumber
      farmerGroup
      isBeneficiary
      programAffiliation
      notes
      createdAt
      updatedAt
      user {
        id
        email
        name
        role
        region
        district
      }
    }
  }
`;

// ============================================
// Récupérer les exploitations par région
// ============================================

export const GET_FARMS_BY_REGION = gql`
  query GetFarmsByRegion($region: Regions!) {
    farmsByRegion(region: $region) {
      id
      name
      region
      district
      commune
      village
      totalSurface
      isBeneficiary
      programAffiliation
      user {
        id
        name
      }
    }
  }
`;

// ============================================
// Récupérer les exploitations par programme
// ============================================

export const GET_FARMS_BY_PROGRAM = gql`
  query GetFarmsByProgram($program: String!) {
    farmsByProgram(program: $program) {
      id
      name
      programAffiliation
      isBeneficiary
      totalSurface
      user {
        id
        name
      }
    }
  }
`;

// ============================================
// Récupérer les exploitations bénéficiaires
// ============================================

export const GET_BENEFICIARY_FARMS = gql`
  query GetBeneficiaryFarms {
    beneficiaryFarms {
      id
      name
      isBeneficiary
      programAffiliation
      region
      district
      totalSurface
      user {
        id
        name
      }
    }
  }
`;

// ============================================
// Compter les exploitations
// ============================================

export const GET_FARMS_COUNT = gql`
  query GetFarmsCount {
    farmsCount
  }
`;

// ============================================
// Statistiques des exploitations
// ============================================

export const GET_FARM_STATS = gql`
  query GetFarmStats($region: String) {
    farmStats(region: $region) {
      totalFarms
      totalSurface
      averageSurface
      beneficiaryCount
      beneficiaryRate
    }
  }
`;

// ============================================
// Pagination des exploitations
// ============================================

export const GET_FARMS_PAGINATED = gql`
  query GetFarmsPaginated($page: Int!, $limit: Int!) {
    farmsPaginated(page: $page, limit: $limit) {
      data {
        id
        name
        region
        district
        commune
        village
        totalSurface
        isBeneficiary
        programAffiliation
        createdAt
        user {
          id
          name
          email
        }
      }
      total
      page
      totalPages
    }
  }
`;