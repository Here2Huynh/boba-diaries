/* eslint-disable @typescript-eslint/no-unused-vars */
import { BobaType } from './boba.type';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql/dist';
import { BobaService } from './boba.service';
import { CreateBobaInput } from './create-boba.input';

@Resolver((of) => BobaType)
export class BobaResolver {
  constructor(private bobaService: BobaService) {}

  @Query((returns) => [BobaType])
  bobas() {
    return this.bobaService.getBobas();
  }

  @Mutation((returns) => BobaType)
  createBoba(@Args('createBobaInput') createBobaInput: CreateBobaInput) {
    return this.bobaService.createBoba(createBobaInput);
  }
}
