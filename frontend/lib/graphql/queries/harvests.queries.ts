// lib/graphql/queries/harvests.queries.ts
import { gql } from '@apollo/client';

export const GET_HARVESTS = gql`
  query GetHarvests {
    harvests {
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
      createdAt
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
    plots {
      id
      name
      cropType
      farm {
        id
        name
      }
    }
  }
`;

export const GET_HARVEST = gql`
  query GetHarvest($id: Int!) {
    harvest(id: $id) {
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
      createdAt
      updatedAt
      plot {
        id
        name
        cropType
        surface
        farm {
          id
          name
          user {
            id
            name
            email
          }
        }
      }
    }
  }
`;