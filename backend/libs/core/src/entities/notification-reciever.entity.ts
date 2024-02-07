import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne } from 'typeorm';
import { StreamLineEntity } from './streamline.entity';
import { Notification } from './notification.entity';

@Entity()
@ObjectType()
export class NotificationReciever extends StreamLineEntity {
    @Column()
    @Field()
    recieverId: string;

    @Column()
    @Field({ defaultValue: false })
    isRead: boolean

    @ManyToOne(() => Notification, (entity: Notification) => entity.recievers)
    @Field(() => Notification, { nullable: true })
    notification?: Notification;
}