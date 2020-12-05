/* eslint-disable @typescript-eslint/no-unused-vars */
import { BobaType } from './boba.type';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql/dist';
import { BobaService } from './boba.service';
import { BobaInput } from './boba.input';

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
  async createBoba(@Args('createBobaInput') bobaInput: BobaInput) {
    return this.bobaService.createBoba(bobaInput);
  }

  @Mutation((returns) => BobaType)
  async updateBoba(
    @Args('id') id: string,
    @Args('updateBobaInput') bobaInput: BobaInput,
  ) {
    return this.bobaService.updateBoba(id, bobaInput);
  }
}
