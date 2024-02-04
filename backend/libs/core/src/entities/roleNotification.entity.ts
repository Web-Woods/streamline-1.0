import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { StreamLineEntity } from './streamline.entity';

@Entity()
@ObjectType()
export class RoleNotification extends Notification {
    @Column({ nullable: true })
    @Field({ nullable: true })
    roleId?: string;



}
