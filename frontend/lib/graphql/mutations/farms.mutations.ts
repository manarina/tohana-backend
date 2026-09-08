// lib/graphql/mutations/farms.mutations.ts
import { gql } from '@apollo/client';

// ============================================
// CREATE - Créer une exploitation
// ============================================

export const CREATE_FARM = gql`
  mutation CreateFarm($input: CreateFarmInput!) {
    createFarm(input: $input) {
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
// UPDATE - Mettre à jour une exploitation
// ============================================

export const UPDATE_FARM = gql`
  mutation UpdateFarm($input: UpdateFarmInput!) {
    updateFarm(input: $input) {
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
// DELETE - Supprimer une exploitation
// ============================================

export const DELETE_FARM = gql`
  mutation DeleteFarm($id: Int!) {
    deleteFarm(id: $id)
  }
`;

// ============================================
// DELETE ALL - Supprimer toutes les exploitations (Admin uniquement)
// ============================================

export const DELETE_ALL_FARMS = gql`
  mutation DeleteAllFarms {
    deleteAllFarms {
      message
      count
    }
  }
`;