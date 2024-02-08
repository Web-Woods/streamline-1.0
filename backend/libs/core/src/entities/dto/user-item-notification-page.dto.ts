import { PaginateResult } from './paginate-result.dto';
import { ObjectType } from '@nestjs/graphql';
import { RequestNotification } from '../request-notification.entity';
import { UserNotification } from '../user-notification.entity';

@ObjectType()
export class UserNotificationPage extends PaginateResult(UserNotification) {}