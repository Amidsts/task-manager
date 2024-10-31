import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './utils/auth.types';

@Injectable()
export class AuthService {
  private userRepository: Repository<User>;
 

  constructor(private dataSource: DataSource, private jwtService: JwtService) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async signUp(authCredentialDto: AuthCredentialDto): Promise<User> {
    try {
      const { username, password } = authCredentialDto;

      const salt = await bcrypt.genSalt();

      const user = new User();
      user.username = username;
      user.password = await bcrypt.hash(password, salt);
      user.salt = salt;
      await user.save();

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signin(authCredentialDto: AuthCredentialDto): Promise<
    | NotFoundException
    | {
        accesstoken: string;
        user: User;
      }
  > {
    try {
      const { username, password } = authCredentialDto;
      const user = await this.userRepository.findOne({ where: { username } });

      if (!user || !(await user.validatePassword(password))) {
        return new NotFoundException('Invalid credentials');
      }

      const payload: JwtPayload = { username };
      const accesstoken = this.jwtService.sign(payload);

      return { accesstoken, user };
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException(error.message);
    }
  }
}
