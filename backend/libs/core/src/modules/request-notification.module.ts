import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestItemNotification } from '../entities/request-item-notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestItemNotification])],
  // providers: [RequestResolver, RequestService],
  // exports: [RequestService],
})
export class RequestNotificationModule {}
