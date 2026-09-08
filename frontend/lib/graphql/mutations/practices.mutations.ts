// lib/graphql/mutations/practices.mutations.ts
import { gql } from '@apollo/client';

export const CREATE_PRACTICE = gql`
  mutation CreatePractice($input: CreatePracticeInput!) {
    createPractice(input: $input) {
      id
      practiceType
      specificTechnique
      surface
      adoptionDate
      description
      perceivedBenefit
      yieldImprovement
      sourceOfKnowledge
      isStillPracticed
      challenges
      satisfactionRating
      recommendation
      createdAt
      farm {
        id
        name
      }
    }
  }
`;

export const UPDATE_PRACTICE = gql`
  mutation UpdatePractice($input: UpdatePracticeInput!) {
    updatePractice(input: $input) {
      id
      practiceType
      specificTechnique
      surface
      adoptionDate
      description
      perceivedBenefit
      yieldImprovement
      sourceOfKnowledge
      isStillPracticed
      challenges
      satisfactionRating
      recommendation
      updatedAt
      farm {
        id
        name
      }
    }
  }
`;

export const DELETE_PRACTICE = gql`
  mutation DeletePractice($id: Int!) {
    deletePractice(id: $id)
  }
`;