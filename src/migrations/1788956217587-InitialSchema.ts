import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1788956217587 implements MigrationInterface {
    name = 'InitialSchema1788956217587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'FIELD_AGENT', 'COORDINATOR', 'VIEWER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'ADMIN', "region" character varying, "district" character varying, "isActive" boolean NOT NULL DEFAULT true, "lastLogin" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."farms_region_enum" AS ENUM('ANALAMANGA', 'BONGOLAVA', 'ITASY', 'VAKINANKARATRA', 'DIANA', 'SAVA', 'AMORONI_MANIA', 'HAUTE_MATSIATRA', 'VATOVAVY', 'FITOVINANY', 'ATSIMO_ATSINANANA', 'IHOROMBE', 'SOFIA', 'BOENY', 'BETSIBOKA', 'MELAKY', 'ALAOTRA_MANGORO', 'ATSINANANA', 'ANALANJIROFO', 'AMBATOSOA', 'MENABE', 'ATSIMO_ANDREFANA', 'ANDROY', 'ANOSY')`);
        await queryRunner.query(`CREATE TABLE "farms" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "region" "public"."farms_region_enum" NOT NULL, "district" character varying NOT NULL, "commune" character varying NOT NULL, "village" character varying NOT NULL, "fokontany" character varying, "gpsLatitude" character varying, "gpsLongitude" character varying, "totalSurface" numeric(10,2) NOT NULL, "phoneNumber" character varying, "farmerGroup" character varying, "isBeneficiary" boolean NOT NULL DEFAULT false, "programAffiliation" character varying, "notes" text, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_39f1ebfd7501e560552cff6760" ON "farms" ("userId") `);
        await queryRunner.query(`CREATE TYPE "public"."climate_practices_practicetype_enum" AS ENUM('CULTURE_DE_COUVERTURE', 'MULCHING', 'BANDES_ENHERBEES', 'ZAI', 'TERRASSEMENT', 'AGROFORESTERIE', 'HAIES_VIVES', 'ARBRES_AGROFORESTIERS', 'IRRIGATION_ECONOMIE_EAU', 'GOUTTE_A_GOUTTE', 'BASSINE', 'CAPTAGE_EAU', 'COMPOSTAGE', 'FUMURE_ORGANIQUE', 'CROISSANCE_VERTE', 'BIOCHAR', 'ROTATION_CULTURES', 'ASSOCIATION_CULTURES', 'SEMIS_DIRECT', 'LABOUR_MINIMAL', 'VARIETES_RESILIENTES', 'CALENDRIER_AGROCLIMATIQUE', 'ASSURANCE_CLIMATIQUE', 'AUTRE')`);
        await queryRunner.query(`CREATE TYPE "public"."climate_practices_perceivedbenefit_enum" AS ENUM('AMELIORATION_SOL', 'AUGMENTATION_RENDEMENT', 'REDUCTION_EROSION', 'ECONOMIE_EAU', 'REDUCTION_INTRANTS', 'DIVERSIFICATION_REVENUS', 'MEILLEURE_ADAPTATION', 'AUTRE')`);
        await queryRunner.query(`CREATE TYPE "public"."climate_practices_sourceofknowledge_enum" AS ENUM('FORMATION_TOHATRA', 'FORMATION_DEFIS', 'FORMATION_PRADA', 'VULGARISATION', 'ECHANGE_PAYSAN', 'AUTO_APPRENTISSAGE', 'AUTRE')`);
        await queryRunner.query(`CREATE TABLE "climate_practices" ("id" SERIAL NOT NULL, "practiceType" "public"."climate_practices_practicetype_enum" NOT NULL, "specificTechnique" character varying, "surface" numeric(10,2) NOT NULL, "adoptionDate" date NOT NULL, "description" text, "perceivedBenefit" "public"."climate_practices_perceivedbenefit_enum", "yieldImprovement" numeric(5,2), "sourceOfKnowledge" "public"."climate_practices_sourceofknowledge_enum", "isStillPracticed" boolean NOT NULL DEFAULT true, "challenges" text, "satisfactionRating" numeric(5,2), "recommendation" text, "farmId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2cbe941a714bdb72c53f058e228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_792b10a244ed0868b0690b53df" ON "climate_practices" ("farmId") `);
        await queryRunner.query(`CREATE TYPE "public"."plots_croptype_enum" AS ENUM('RIZ', 'MAIS', 'SORGHO', 'MIL', 'MANIOC', 'PATATE_DOUCE', 'IGNAME', 'POMME_DE_TERRE', 'ARACHIDE', 'HARICOT', 'POIS', 'SOJA', 'LENTILLE', 'VANILLE', 'CAFE', 'GIROFLE', 'POIVRE', 'CACAO', 'BANANE', 'MANGE', 'ANANAS', 'AGRUME', 'PAPAYE', 'TOMATE', 'OIGNON', 'AIL', 'CHOU', 'SALADE', 'CONCOMBRE', 'COURGETTE', 'CANNE_A_SUCRE', 'COTON', 'TABAC', 'HUILE_DE_PALME', 'KAOL', 'AUTRE')`);
        await queryRunner.query(`CREATE TABLE "plots" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "cropType" "public"."plots_croptype_enum" NOT NULL, "cropVariety" character varying, "surface" numeric(10,2) NOT NULL, "plantingDate" TIMESTAMP, "harvestDate" TIMESTAMP, "irrigationType" character varying, "soilType" character varying, "slope" numeric(5,2), "expectedYield" numeric(10,2), "actualYield" numeric(10,2), "soilTestDate" TIMESTAMP, "soilPH" integer, "notes" text, "farmId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba7eaba496503e69206deae9363" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b7ebad14dbd4432cb87c0d92a9" ON "plots" ("farmId") `);
        await queryRunner.query(`CREATE TABLE "harvests" ("id" SERIAL NOT NULL, "season" character varying NOT NULL, "harvestDate" date NOT NULL, "quantity" numeric(10,2) NOT NULL, "unit" character varying, "yieldPerHectare" numeric(10,2), "quality" character varying, "salePrice" numeric(10,2), "buyer" character varying, "totalRevenue" numeric(10,2), "notes" text, "plotId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb748ae28bc0000875b1949a0a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c0fed5b89dffe90b768e65f72" ON "harvests" ("plotId") `);
        await queryRunner.query(`CREATE TABLE "password_resets" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "email" character varying NOT NULL, "isUsed" boolean NOT NULL DEFAULT false, "expiresAt" TIMESTAMP NOT NULL, "userId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4816377aa98211c1de34469e742" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9b34edd5264effbbc875c266a9" ON "password_resets" ("token") `);
        await queryRunner.query(`ALTER TABLE "farms" ADD CONSTRAINT "FK_39f1ebfd7501e560552cff6760a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "climate_practices" ADD CONSTRAINT "FK_792b10a244ed0868b0690b53dfa" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "plots" ADD CONSTRAINT "FK_b7ebad14dbd4432cb87c0d92a95" FOREIGN KEY ("farmId") REFERENCES "farms"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "harvests" ADD CONSTRAINT "FK_3c0fed5b89dffe90b768e65f726" FOREIGN KEY ("plotId") REFERENCES "plots"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "password_resets" ADD CONSTRAINT "FK_d95569f623f28a0bf034a55099e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "password_resets" DROP CONSTRAINT "FK_d95569f623f28a0bf034a55099e"`);
        await queryRunner.query(`ALTER TABLE "harvests" DROP CONSTRAINT "FK_3c0fed5b89dffe90b768e65f726"`);
        await queryRunner.query(`ALTER TABLE "plots" DROP CONSTRAINT "FK_b7ebad14dbd4432cb87c0d92a95"`);
        await queryRunner.query(`ALTER TABLE "climate_practices" DROP CONSTRAINT "FK_792b10a244ed0868b0690b53dfa"`);
        await queryRunner.query(`ALTER TABLE "farms" DROP CONSTRAINT "FK_39f1ebfd7501e560552cff6760a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9b34edd5264effbbc875c266a9"`);
        await queryRunner.query(`DROP TABLE "password_resets"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c0fed5b89dffe90b768e65f72"`);
        await queryRunner.query(`DROP TABLE "harvests"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7ebad14dbd4432cb87c0d92a9"`);
        await queryRunner.query(`DROP TABLE "plots"`);
        await queryRunner.query(`DROP TYPE "public"."plots_croptype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_792b10a244ed0868b0690b53df"`);
        await queryRunner.query(`DROP TABLE "climate_practices"`);
        await queryRunner.query(`DROP TYPE "public"."climate_practices_sourceofknowledge_enum"`);
        await queryRunner.query(`DROP TYPE "public"."climate_practices_perceivedbenefit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."climate_practices_practicetype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39f1ebfd7501e560552cff6760"`);
        await queryRunner.query(`DROP TABLE "farms"`);
        await queryRunner.query(`DROP TYPE "public"."farms_region_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
