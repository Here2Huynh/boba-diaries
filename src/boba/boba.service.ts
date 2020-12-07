import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boba } from './boba.entity';
import { Repository } from 'typeorm';
import { CreateBobaInput } from './create-boba.input';
import { v4 as uuid } from 'uuid';
import { UpdateBobaInput } from './update-boba.input';

@Injectable()
export class BobaService {
  constructor(
    @InjectRepository(Boba) private bobaRespository: Repository<Boba>,
  ) {}

  async getBobas(): Promise<Boba[]> {
    return this.bobaRespository.find();
  }

  async getBoba(id: string): Promise<Boba> {
    return this.bobaRespository.findOne({ id });
  }

  async createBoba(bobaInput: CreateBobaInput): Promise<Boba> {
    const { name, shop, rating, description } = bobaInput;

    const boba = this.bobaRespository.create({
      id: uuid(),
      name,
      shop,
      rating,
      description,
      date: new Date().toISOString(),
    });

    return this.bobaRespository.save(boba);
  }

  async updateBoba(id: string, bobaInput: UpdateBobaInput): Promise<Boba> {
    const foundBoba = await this.getBoba(id);

    for (const key in bobaInput) {
      if (bobaInput[key] !== foundBoba[key]) {
        foundBoba[key] = bobaInput[key];
      }
    }

    return this.bobaRespository.save(foundBoba);
  }

  // async deleteBoba() {}
}
