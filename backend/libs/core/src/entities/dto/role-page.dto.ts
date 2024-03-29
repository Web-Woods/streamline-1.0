import { Role } from '../role.entity';
import { ObjectType } from '@nestjs/graphql';
import { PaginateResult } from './paginate-result.dto';

@ObjectType()
export class RolePage extends PaginateResult(Role) {}