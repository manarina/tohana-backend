// src/modules/harvests/entities/harvest.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Plot } from '../../plots/entities/plot.entity';

@Entity('harvests')
@ObjectType()
export class Harvest {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  season!: string; // SAISON_DES_PLUIES, SAISON_SECHE, HORS_SAISON

  @Column({ type: 'date' })
  @Field(() => String)
  harvestDate!: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  quantity!: number; // en kg

  @Column({ nullable: true })
  @Field({ nullable: true })
  unit!: string; // KG, TONNES, SACS

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  yieldPerHectare!: number; // kg/ha (calculé automatiquement)

  @Column({ nullable: true })
  @Field({ nullable: true })
  quality!: string; // PREMIUM, STANDARD, BASIQUE

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  salePrice!: number; // Prix de vente en Ariary/kg

  @Column({ nullable: true })
  @Field({ nullable: true })
  buyer!: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  totalRevenue!: number; // Revenu total (calculé automatiquement)

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  notes!: string;

  @ManyToOne(() => Plot, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plotId' })
  @Field(() => Plot)
  plot!: Plot;

  @Column()
  @Index()
  plotId!: number;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;
}