import { EntityRepository, Repository } from 'typeorm';
import { Boba } from './boba.entity';

@EntityRepository(Boba)
export class BobaRepository extends Repository<Boba> {}
