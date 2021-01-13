import { Test, TestingModule } from '@nestjs/testing';
import { BobaRepository } from './boba.repository';
import { BobaService } from './boba.service';

const mockBoba = {
  id: '1',
  name: 'name',
  rating: '5',
};

const mockBobaRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
});

describe('BobaService', () => {
  let bobaService: BobaService;
  let bobaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BobaService,
        { provide: BobaRepository, useFactory: mockBobaRepository },
      ],
    }).compile();

    bobaService = module.get<BobaService>(BobaService);
    bobaRepository = module.get<BobaRepository>(BobaRepository);
  });

  describe('getBobas', () => {
    it(`return user's bobas`, async () => {
      bobaRepository.find.mockResolvedValue(['a', 'b', 'c']);

      const res = await bobaService.getBobas();
      expect(bobaRepository.find).toHaveBeenCalled();
      expect(res).toEqual(['a', 'b', 'c']);
    });
  });

  describe('getBoba', () => {
    it('return boba with provided ID', async () => {
      bobaRepository.findOne.mockResolvedValue(mockBoba);

      const res = await bobaService.getBoba('1');
      expect(bobaRepository.findOne).toHaveBeenCalledWith({ id: '1' });
      expect(res).toEqual(mockBoba);
    });
  });

  describe('createBoba', () => {
    //
  });
});
