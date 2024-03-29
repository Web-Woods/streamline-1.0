import { Field, ObjectType } from '@nestjs/graphql';
import { StreamLineEntity } from './streamline.entity';
import { Entity, Column, ManyToMany, JoinTable, OneToOne, OneToMany } from 'typeorm';
import { Property } from './property.entity';
import { RequestItem } from './request-items.entity';
import { StoreItemNotification } from './store-item-notification.entity';
import { Vendor } from './vendor.entity';

@Entity()
@ObjectType()
export class StoreItem extends StreamLineEntity {
  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  sku: string;

  @Column({ type: 'bigint', nullable: true })
  @Field({ nullable: true })
  stock: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  unit: string;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  price: number;

  @ManyToMany(() => Property, (property) => property.storeItems, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'store_item_properties',
    joinColumn: { name: 'store_item_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'property_id', referencedColumnName: 'id' },
  })
  @Field(() => [Property], { nullable: true })
  properties: Property[];

  @OneToOne(() => RequestItem, (entity: RequestItem) => entity.storeItem)
  requestItem: RequestItem;

  @OneToMany(() => StoreItemNotification, (entity: StoreItemNotification) => entity.storeItem)
  @Field(() => [StoreItemNotification], { nullable: true })
  notifications: StoreItemNotification[];

  @ManyToMany(() => Vendor, (vendor) => vendor.storeItems,
  {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @Field(() => [Vendor], { nullable: true })
  vendors: Vendor[];
}
