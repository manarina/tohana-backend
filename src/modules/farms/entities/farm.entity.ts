// src/modules/farms/entities/farm.entity.ts
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
import { User } from '../../users/entities/user.entity';
import { Regions } from '../../../common/constants/regions.enum';

@Entity('farms')
@ObjectType()
export class Farm {
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
    enum: Regions,
  })
  // ✅ Utiliser String au lieu de Regions
  @Field(() => String)
  region!: Regions;

  @Column()
  @Field()
  district!: string;

  @Column()
  @Field()
  commune!: string;

  @Column()
  @Field()
  village!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fokontany!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  gpsLatitude!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  gpsLongitude!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  totalSurface!: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phoneNumber!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  farmerGroup!: string;

  @Column({ default: false })
  @Field()
  isBeneficiary!: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  programAffiliation!: string;

  @Column({ type: 'text', nullable: true })
  @Field({ nullable: true })
  notes!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user!: User;

  @Column()
  @Index()
  userId!: number;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt!: Date;
}