import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

export const getGraphQLConfig = (configService: ConfigService): ApolloDriverConfig => ({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: configService.get('graphql.sortSchema'),
  playground: configService.get('graphql.playground'),
  introspection: configService.get('graphql.introspection'),
  context: ({ req }) => ({ req }),
  formatError: (error) => {
    // En production, masquer les détails techniques
    if (process.env.NODE_ENV === 'production') {
      return {
        message: error.message,
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      };
    }
    return error;
  },
});