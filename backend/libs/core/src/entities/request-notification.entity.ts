import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Request } from './request.entity';
import { Notification } from './notification.entity';

@Entity()
@ObjectType()
export class RequestNotification extends Notification {
    
    @Column({ name: 'request_id', nullable: true })
    @Field({ nullable: true })
    requestId?: string;

    @ManyToOne(() => Request, (entity: Request) => entity.notifications)
    @JoinColumn({name: 'request_id', referencedColumnName: 'id'})
    request: Request;
    
}
