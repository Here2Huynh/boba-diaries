import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BobaRepository } from './boba.repository';
import { BobaService } from './boba.service';

const mockBoba = {
  id: '1',
  name: 'name',
  rating: '5',
  shop: 'shop',
  description: 'test',
};

const mockBobaRepository = () => ({
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
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
    it('returns a boba entry once boba is created', async () => {
      bobaRepository.create.mockResolvedValue(mockBoba);

      const res = await bobaService.createBoba(mockBoba);
      expect(bobaRepository.create).toHaveBeenCalled();
      expect(bobaRepository.save).toHaveBeenCalled();
    });
  });

  describe('updateBoba', () => {
    it('returns the updated boba', async () => {
      mockBoba.rating = '9';
      bobaService.getBoba = jest.fn().mockResolvedValue(mockBoba);

      await bobaService.updateBoba('1', mockBoba);
      expect(bobaService.getBoba).toHaveBeenCalledWith('1');
      expect(bobaRepository.save).toHaveBeenCalledWith(mockBoba);
    });

    it('returns undefined if found no matching boba', async () => {
      bobaService.getBoba = jest.fn().mockResolvedValue(undefined);

      expect(bobaService.updateBoba('1', mockBoba)).rejects.toThrow(
        NotFoundException,
      );
    });

    describe('deleteBoba', () => {
      it('returns message if boba exists and gets deleted', async () => {
        bobaService.getBoba = jest.fn().mockResolvedValue(mockBoba);
        bobaRepository.delete = jest.fn().mockResolvedValue(true);

        const res = await bobaService.deleteBoba('12-34');
        expect(bobaService.getBoba).toHaveBeenCalledWith('12-34');
        expect(bobaRepository.delete).toHaveBeenCalledWith({ id: '12-34' });
        expect(res).toEqual(`Deleted boba: "name"`);
      });
    });

    describe('getManyBobas', () => {
      it(`return bobas by id's provided`, async () => {
        bobaRepository.find.mockResolvedValue([mockBoba]);

        const res = await bobaService.getManyBobas(['12-12', '21-21']);

        expect(bobaRepository.find).toHaveBeenCalledWith({
          where: {
            id: {
              $in: ['12-12', '21-21'],
            },
          },
        });
        expect(res).toEqual([mockBoba]);
      });
    });
  });
});
