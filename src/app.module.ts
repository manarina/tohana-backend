import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

import configuration from './config/configuration';
import { getDatabaseConfig } from './config/database.config';
import { getGraphQLConfig } from './config/graphql.config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EmailModule } from './modules/email/email.module';
import { FarmsModule } from './modules/farms/farms.module';
import { PlotsModule } from './modules/plots/plots.module';
import { PracticesModule } from './modules/practices/practices.module';
import { HarvestsModule } from './modules/harvests/harvests.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getGraphQLConfig,
    }),
    AuthModule,
    UsersModule,
    EmailModule,
    FarmsModule,
    PlotsModule,
    PracticesModule,
    HarvestsModule,
    DashboardModule,
  ],
})
export class AppModule {}