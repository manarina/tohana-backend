// src/modules/plots/entities/plot.entity.ts
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
import { Farm } from '../../farms/entities/farm.entity';
import { CropTypes } from '../../../common/constants/crops.enum';

@Entity('plots')
@ObjectType()
export class Plot {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string;

  @Column({
    type: 'enum',
    enum: CropTypes,
  })
  @Field(() => String)
  cropType!: CropTypes;

  @Column({ nullable: true })
  @Field({ nullable: true })
  cropVariety!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  surface!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  plantingDate!: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  harvestDate!: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  irrigationType!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  soilType!: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  slope!: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  expectedYield!: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  actualYield!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  soilTestDate!: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  soilPH!: number;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  notes!: string;

  @ManyToOne(() => Farm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'farmId' })
  @Field(() => Farm)
  farm!: Farm;

  @Column()
  @Index()
  farmId!: number;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;
}