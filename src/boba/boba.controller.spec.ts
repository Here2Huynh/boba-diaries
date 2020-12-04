import { Test, TestingModule } from '@nestjs/testing';
import { BobaController } from './boba.resolver';

describe('BobaController', () => {
  let controller: BobaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BobaController],
    }).compile();

    controller = module.get<BobaController>(BobaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
