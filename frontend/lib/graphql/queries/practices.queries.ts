// lib/graphql/queries/practices.queries.ts
import { gql } from '@apollo/client';

export const GET_PRACTICES = gql`
  query GetPractices {
    practices {
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
    farms {
      id
      name
    }
  }
`;

export const GET_PRACTICE = gql`
  query GetPractice($id: Int!) {
    practice(id: $id) {
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