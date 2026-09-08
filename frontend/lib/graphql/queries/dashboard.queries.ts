// lib/graphql/queries/dashboard.queries.ts
import { gql } from '@apollo/client';

export const GET_DASHBOARD = gql`
  query Dashboard($filters: DashboardFiltersInput) {
    dashboard(filters: $filters) {
      overview {
        totalFarms
        totalPlots
        totalSurface
        totalHarvests
        totalProduction
        totalPractices
        practiceAdoptionRate
        totalUsers
        womenFarmers
      }
      agriculture {
        topCrops {
          cropType
          totalQuantity
          totalSurface
          averageYield
        }
        totalProduction
        averageYield
        irrigationCoverage
      }
      resilience {
        totalPractices
        adoptionRate
        averageYieldImprovement
        stillPracticedRate
        topPractices
      }
      trends {
        productionTrend {
          period
          value
        }
        adoptionTrend {
          period
          value
        }
      }
      regionalDistribution {
        region
        farmsCount
        totalSurface
      }
      lastUpdated
    }
  }
`;