/* eslint-disable @typescript-eslint/no-unused-vars */
import { BobaType } from './boba.type';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql/dist';
import { BobaService } from './boba.service';
import { CreateBobaInput } from './create-boba.input';
import { UpdateBobaInput } from './update-boba.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';

@Resolver((of) => BobaType)
export class BobaResolver {
  constructor(private bobaService: BobaService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => BobaType)
  async boba(@Args('id') id: string) {
    return this.bobaService.getBoba(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [BobaType])
  async bobas() {
    return this.bobaService.getBobas();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => BobaType)
  async createBoba(@Args('createBobaInput') bobaInput: CreateBobaInput) {
    return this.bobaService.createBoba(bobaInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => BobaType)
  async updateBoba(
    @Args('id') id: string,
    @Args('updateBobaInput') bobaInput: UpdateBobaInput,
  ) {
    return this.bobaService.updateBoba(id, bobaInput);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => String)
  async deleteBoba(@Args('id') id: string) {
    return this.bobaService.deleteBoba(id);
  }
}
