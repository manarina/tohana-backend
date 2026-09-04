import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Roles } from '../../../common/constants/roles.enum';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
    @Field(() => Int)
    id!: number;

  @Column({ unique: true })
    @Index()
    @Field()
    email!: string;

  @Column()
    password!: string;

  @Column()
    @Field()
    name!: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.ADMIN,
  })
  @Field()
  role!: Roles;

  @Column({ nullable: true })
    @Field({ nullable: true })
    region!: string;

  @Column({ nullable: true })
    @Field({ nullable: true })
    district!: string;

  @Column({ default: true })
    @Field()
    isActive!: boolean;

  @Column({ nullable: true })
    @Field({ nullable: true })
    lastLogin!: Date;

  @CreateDateColumn()
    @Field()
    createdAt!: Date;

  @UpdateDateColumn()
    @Field()
    updatedAt!: Date;
}