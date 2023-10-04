import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { RoleService } from 'src/roles/role.service';
import { CreateRoleInput, CreateRolesInput } from './dto/create.role';
import { UpdateRoleInput } from './dto/update.role';
import { Role } from './role.entity';
import { UserRoles } from './enum/role';
import { User } from 'src/users/user.entity';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @ResolveField(() => [User], { nullable: true })
  async users(@Parent() role: Role): Promise<User[] | null> {
    return role.users || null;
  }

  @Query(() => Role, { name: 'roleById' })
  async getRoleById(@Args('id') id: string): Promise<Role> {
    try {
      const role = await this.roleService.findRoleById(id);
      if (!role) {
        throw new Error(`Role with ID ${id} not found`);
      }
      return role;
    } catch (error) {
      throw new Error(`Error fetching role: ${error.message}`);
    }
  }

  @Query(() => Role, { name: 'roleByRoleName' })
  async getRoleByRoleName(
    @Args('roleName') roleName: UserRoles,
  ): Promise<Role> {
    try {
      const role = await this.roleService.findRoleByRolename(roleName);
      if (!role) {
        throw new Error(`Role with roleName ${roleName} not found`);
      }
      return role;
    } catch (error) {
      throw new Error(`Error fetching role: ${error.message}`);
    }
  }

  @Query(() => [Role], { name: 'roles' })
  async getRoles(): Promise<Role[]> {
    try {
      return await this.roleService.findAllRoles();
    } catch (error) {
      throw new Error(`Error fetching roles: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'createRole' })
  async createRole(@Args('input') input: CreateRoleInput): Promise<Role> {
    try {
      return await this.roleService.createRole(input);
    } catch (error) {
      throw new Error(`Error creating role: ${error.message}`);
    }
  }

  @Mutation(() => [Role], { name: 'createRoles' })
  async createRoles(@Args('inputs') input: CreateRolesInput): Promise<Role[]> {
    try {
      const roles: Role[] = await Promise.all(
        input.roles.map(async (roleData) => {
          const createdRole = await this.roleService.createRole(roleData);
          return createdRole;
        }),
      );
      return roles;
    } catch (error) {
      throw new Error(`Error creating roles: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'updateRole' })
  async updateRole(
    @Args('id') id: string,
    @Args('input') input: UpdateRoleInput,
  ): Promise<Role> {
    try {
      return await this.roleService.updateRole(id, input);
    } catch (error) {
      throw new Error(`Error updating role: ${error.message}`);
    }
  }

  @Mutation(() => Role, { name: 'deleteRole' })
  async deleteRole(@Args('id') id: string): Promise<Role> {
    try {
      return await this.roleService.deleteRole(id);
    } catch (error) {
      throw new Error(`Error deleting role: ${error.message}`);
    }
  }
}
