import { ObjectType, Field } from '@nestjs/graphql';
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Notification } from './notification.entity';
import { Request } from './request.entity';

@Entity()
@ObjectType()
export class PropertyNotification extends Notification {
    @Column({name: 'property_id', nullable: true })
    @Field({ nullable: true })
    propertyId?: string;
    @ManyToOne(() => Request, (entity: Request) => entity.notifications, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'property_id', referencedColumnName: 'id' })
    request: Request;
}
