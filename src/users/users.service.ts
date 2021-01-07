import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
// import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserInput } from './inputs/create-user.input';
import { UserLoginInput } from './inputs/signin-user.input';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  async signUp(userInput: CreateUserInput): Promise<CreateUserInput> {
    const { username, password, bobas } = userInput;

    const foundUser = await this.validateUser({ username, password });

    if (foundUser) {
      throw new HttpException(
        `Username "${username}" exist. Please try another username.`,
        HttpStatus.CONFLICT,
      );
    } else {
      const salt = await bcrypt.genSalt();

      const user = this.userRepository.create({
        id: uuid(),
        username,
        salt,
        password: await this.hashPassword(password, salt),
        bobas,
      });

      return this.userRepository.save(user);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUser(userLoginIn: UserLoginInput): Promise<User> {
    const { username, password } = userLoginIn;

    const foundUser = await this.userRepository.findOne({ username });

    if (foundUser && (await foundUser.validatePassword(password))) {
      return foundUser;
    } else {
      return null;
    }
  }

  async assignBobaToStudent(userId: string, bobaIds: string[]): Promise<User> {
    const foundUser = await this.findUser(userId);

    if (foundUser) {
      foundUser.bobas = [...new Set([...foundUser.bobas, ...bobaIds])];

      return this.userRepository.save(foundUser);
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async findUser(userId: string): Promise<User> {
    return this.userRepository.findOne({ id: userId });
  }
}
