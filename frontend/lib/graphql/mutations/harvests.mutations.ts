// lib/graphql/mutations/harvests.mutations.ts
import { gql } from '@apollo/client';

export const CREATE_HARVEST = gql`
  mutation CreateHarvest($input: CreateHarvestInput!) {
    createHarvest(input: $input) {
      id
      season
      harvestDate
      quantity
      unit
      quality
      salePrice
      yieldPerHectare
      totalRevenue
      buyer
      notes
      plot {
        id
        name
        cropType
        farm {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_HARVEST = gql`
  mutation UpdateHarvest($input: UpdateHarvestInput!) {
    updateHarvest(input: $input) {
      id
      season
      harvestDate
      quantity
      unit
      quality
      salePrice
      yieldPerHectare
      totalRevenue
      buyer
      notes
      updatedAt
      plot {
        id
        name
        cropType
        farm {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_HARVEST = gql`
  mutation DeleteHarvest($id: Int!) {
    deleteHarvest(id: $id)
  }
`;