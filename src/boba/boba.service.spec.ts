import { Test, TestingModule } from '@nestjs/testing';
import { BobaService } from './boba.service';

describe('BobaService', () => {
  let service: BobaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BobaService],
    }).compile();

    service = module.get<BobaService>(BobaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
