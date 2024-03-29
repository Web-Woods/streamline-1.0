import { User } from '../user.entity';
import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from './paginate-result.dto';

@ObjectType()
export class UserPage extends PaginateResult(User) {}