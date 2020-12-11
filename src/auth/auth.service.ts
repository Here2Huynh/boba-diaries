import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { SignInUserInput } from './signin-user.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async signUp(userInput: CreateUserInput): Promise<CreateUserInput> {
    const { username, password } = userInput;

    const salt = await bcrypt.genSalt();

    const user = this.authRepository.create({
      username,
      salt,
      password: await this.hashPassword(password, salt),
    });

    return this.authRepository.save(user);
  }

  async signIn(userSignIn: SignInUserInput): Promise<string> {
    const foundUser = await this.validateUserPassword(userSignIn);

    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return 'signed in';
  }

  async validateUserPassword(userSignIn: SignInUserInput): Promise<string> {
    const { username, password } = userSignIn;

    const foundUser = await this.authRepository.findOne({ username });

    if (foundUser && (await foundUser.validatePassword(password))) {
      return foundUser.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
