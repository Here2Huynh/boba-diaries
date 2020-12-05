import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Boba } from './boba.entity';
import { Repository } from 'typeorm';
import { CreateBobaInput } from './create-boba.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BobaService {
  constructor(
    @InjectRepository(Boba) private bobaRespository: Repository<Boba>,
  ) {}

  async getBobas(): Promise<Boba[]> {
    return this.bobaRespository.find();
  }

  async createBoba(createBobaInput: CreateBobaInput): Promise<Boba> {
    const { name, shop, rating, description } = createBobaInput;

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
}
