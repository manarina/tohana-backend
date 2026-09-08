// lib/graphql/mutations/plots.mutations.ts
import { gql } from '@apollo/client';

export const CREATE_PLOT = gql`
  mutation CreatePlot($input: CreatePlotInput!) {
    createPlot(input: $input) {
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
  }
`;

export const UPDATE_PLOT = gql`
  mutation UpdatePlot($input: UpdatePlotInput!) {
    updatePlot(input: $input) {
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
      updatedAt
      farm {
        id
        name
      }
    }
  }
`;

export const DELETE_PLOT = gql`
  mutation DeletePlot($id: Int!) {
    deletePlot(id: $id)
  }
`;