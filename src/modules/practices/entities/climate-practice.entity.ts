// src/modules/practices/entities/climate-practice.entity.ts
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
import { PracticeTypes, PerceivedBenefits, KnowledgeSources } from '../../../common/constants/practices.enum';

@Entity('climate_practices')
@ObjectType()
export class ClimatePractice {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column({
    type: 'enum',
    enum: PracticeTypes,
  })
  @Field(() => String)
  practiceType!: PracticeTypes;

  @Column({ nullable: true })
  @Field({ nullable: true })
  specificTechnique!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  surface!: number;

  @Column({ type: 'date' })
  @Field(() => String) // ✅ Utiliser String pour GraphQL
  adoptionDate!: Date;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  description!: string;

  @Column({
    type: 'enum',
    enum: PerceivedBenefits,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  perceivedBenefit!: PerceivedBenefits;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  yieldImprovement!: number;

  @Column({
    type: 'enum',
    enum: KnowledgeSources,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  sourceOfKnowledge!: KnowledgeSources;

  @Column({ default: true })
  @Field()
  isStillPracticed!: boolean;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  challenges!: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  satisfactionRating!: number; // Note de 1 à 5

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  recommendation!: string;

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