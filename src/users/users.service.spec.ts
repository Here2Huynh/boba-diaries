import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

const mockCredentials = {
  username: 'testUsername',
  password: 'testPassword',
};

const mockUserRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('UsersService', () => {
  let user: any;
  let userRepository: any;
  let userService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userService = module.get<UsersService>(UsersService);

    // userRepository.findOne = jest.fn();

    user = new User();
    user.salt = 'testSalt';
    user.validatePassword = jest.fn();
  });

  describe('validateUser', () => {
    it('returns user if user is valid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(true);

      const result = await userService.validateUser(mockCredentials);
      expect(result).toEqual(user);
    });

    it('returns null if password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(user);
      user.validatePassword.mockResolvedValue(false);

      const result = await userService.validateUser(mockCredentials);
      expect(user.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('returns null if username not found', async () => {
      userRepository.findOne.mockResolvedValue(null);
      user.validatePassword.mockResolvedValue(false);

      const result = await userService.validateUser(mockCredentials);
      expect(user.validatePassword).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('findUser', () => {
    it('returns user if userId is valid', async () => {
      userRepository.findOne.mockResolvedValue(user);

      const res = await userService.findUser('1234-123-123');
      expect(res).toEqual(user);
    });

    it('return null if userId is invalid', async () => {
      userRepository.findOne.mockResolvedValue(null);

      const res = await userService.findUser('1234-123-123');
      expect(res).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('calls bcrypt.hash and returns', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();

      const res = await userService.hashPassword('testPassword', 'testSalt');

      expect(bcrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
      expect(res).toEqual('testHash');
    });
  });

  describe('signUp', () => {
    it('throws HTTP exception if username exists', async () => {
      userService.validateUser = jest.fn().mockResolvedValue(null);
      expect(userService.signUp(mockCredentials)).rejects.toThrow(
        ConflictException,
      );
    });

    it('if username does not exist, create user entity', async () => {
      userService.validateUser = jest.fn().mockResolvedValue(null);
      userRepository.create.mockResolvedValue({});
      userService.hashPassword = jest.fn().mockResolvedValue('testHash');
      bcrypt.genSalt = jest.fn().mockResolvedValue('testSalt');
      userRepository.save.mockResolvedValue(mockCredentials);

      const res = await userService.signUp(mockCredentials);

      expect(userService.validateUser).toHaveBeenCalled();
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(userRepository.create).toHaveBeenCalled();
      expect(userService.hashPassword).toHaveBeenCalledWith(
        'testPassword',
        'testSalt',
      );
      expect(userRepository.save).toHaveBeenCalled();
      expect(res).toEqual(mockCredentials);
    });
  });

  describe('assignBobaToStudent', () => {
    it('returns user, if found matching user ', () => {
      //
    });

    it('returns not found exception, if not matching user', () => {
      //
    });
  });
});
