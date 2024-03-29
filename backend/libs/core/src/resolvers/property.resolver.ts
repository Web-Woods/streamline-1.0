import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
  ResolveReference,
} from '@nestjs/graphql';
import { PropertyService } from '../services/property.service';
import { Property } from '../entities/property.entity';
import { CreatePropertyInput } from '../entities/dto/create.property';
import { UpdatePropertyInput } from '../entities/dto/update.property';
import { PropertyPage } from '../entities/dto/property-page.dto';

@Resolver(() => Property)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  // @ResolveField(() => RequestItem, { nullable: true })
  // async requestItems(
  //   @Parent() property: Property,
  // ): Promise<RequestItem[] | null> {
  //   return property.requestItems ?? null;
  // }

  @Query(() => Property, { name: 'property' })
  async getPropertyById(@Args('id') id: string): Promise<Property> {
    try {
      const property = this.propertyService.findPropertyById(id);
      if (!property) {
        throw new Error(`Property with ID ${id} not found`);
      }
      return property;
    } catch (error: any) {
      throw new Error(`Error fetching property: ${error.message}`);
    }
  }

  @Query(() => PropertyPage, { name: 'properties' })
  async getProperties(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 10 }) pageSize: number,
  ): Promise<PropertyPage> {
    try {
      const skip = (page - 1) * pageSize;
      const properties = await this.propertyService.findAllProperties(
        skip,
        pageSize,
      );
      const propertyPage: PropertyPage = {
        data: properties,
        totalItems: properties.length,
      };
      return propertyPage;
    } catch (error: any) {
      throw new Error(`Error fetching Properties: ${error.message}`);
    }
  }

  @Mutation(() => Property, { name: 'createProperty' })
  async createProperty(
    @Args('input') input: CreatePropertyInput,
  ): Promise<Property | null> {
    try {
      return await this.propertyService.createProperty(input);
    } catch (error: any) {
      throw new Error(`Error creating property: ${error.message}`);
    }
  }

  @Mutation(() => Property, { name: 'updateProperty' })
  async updateProperty(
    @Args('id') id: string,
    @Args('input') input: UpdatePropertyInput,
  ): Promise<Property | null> {
    try {
      return await this.propertyService.updateProperty(id, input);
    } catch (error: any) {
      throw new Error(`Error updating property: ${error.message}`);
    }
  }

  @Mutation(() => Property, { name: 'deleteProperty' })
  async deleteProperty(@Args('id') id: string): Promise<Property | null> {
    try {
      return await this.propertyService.deleteProperty(id);
    } catch (error: any) {
      throw new Error(`Error deleting property: ${error.message}`);
    }
  }

  /**
   * required by graphql federation
   */
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.propertyService.findPropertyById(reference.id);
  }
}
