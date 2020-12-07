/* eslint-disable @typescript-eslint/no-unused-vars */
import { BobaType } from './boba.type';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql/dist';
import { BobaService } from './boba.service';
import { CreateBobaInput } from './create-boba.input';
import { UpdateBobaInput } from './update-boba.input';

@Resolver((of) => BobaType)
export class BobaResolver {
  constructor(private bobaService: BobaService) {}

  @Query((returns) => BobaType)
  async boba(@Args('id') id: string) {
    return this.bobaService.getBoba(id);
  }

  @Query((returns) => [BobaType])
  async bobas() {
    return this.bobaService.getBobas();
  }

  @Mutation((returns) => BobaType)
  async createBoba(@Args('createBobaInput') bobaInput: CreateBobaInput) {
    return this.bobaService.createBoba(bobaInput);
  }

  @Mutation((returns) => BobaType)
  async updateBoba(
    @Args('id') id: string,
    @Args('updateBobaInput') bobaInput: UpdateBobaInput,
  ) {
    return this.bobaService.updateBoba(id, bobaInput);
  }
}
