// lib/graphql/queries/plots.queries.ts
import { gql } from '@apollo/client';

export const GET_PLOTS = gql`
  query GetPlots {
    plots {
      id
      name
      description
      cropType
      cropVariety
      surface
      plantingDate
      harvestDate
      irrigationType
      soilType
      slope
      expectedYield
      actualYield
      notes
      createdAt
      farm {
        id
        name
      }
    }
    farms {
      id
      name
    }
  }
`;

export const GET_PLOT = gql`
  query GetPlot($id: Int!) {
    plot(id: $id) {
      id
      name
      description
      cropType
      cropVariety
      surface
      plantingDate
      harvestDate
      irrigationType
      soilType
      slope
      expectedYield
      actualYield
      notes
      createdAt
      updatedAt
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
`;