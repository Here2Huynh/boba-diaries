import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async signUp(userInput: CreateUserInput): Promise<CreateUserInput> {
    const { username, password } = userInput;

    const user = this.authRepository.create({
      username,
      password,
    });

    return this.authRepository.save(user);
  }
}
