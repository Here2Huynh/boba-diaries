import {
  Injectable,
  UnauthorizedException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { SignInUserInput } from './signin-user.input';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private authRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(userInput: CreateUserInput): Promise<CreateUserInput> {
    const { username, password } = userInput;

    const salt = await bcrypt.genSalt();

    const user = this.authRepository.create({
      id: uuid(),
      username,
      salt,
      password: await this.hashPassword(password, salt),
      bobas: [],
    });

    return this.authRepository.save(user);
  }

  async signIn(userSignIn: SignInUserInput): Promise<{ accessToken: string }> {
    const foundUser = await this.validateUserPassword(userSignIn);

    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: foundUser.username };
    const accessToken = this.jwtService.sign(payload);

    this.logger.debug(
      `Generated JWT for payload: ${JSON.stringify(accessToken)}`,
    );

    return { accessToken };
  }

  async validateUserPassword(userSignIn: SignInUserInput): Promise<User> {
    const { username, password } = userSignIn;

    const foundUser = await this.authRepository.findOne({ username });

    if (foundUser && (await foundUser.validatePassword(password))) {
      return foundUser;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async assignBobaToStudent(userId: string, bobaIds: string[]) {
    const foundUser = await this.authRepository.findOne({ id: userId });

    if (foundUser) {
      foundUser.bobas = [...foundUser.bobas, ...bobaIds];

      return this.authRepository.save(foundUser);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
