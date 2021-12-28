import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Session } from 'src/auth/entities';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { BcryptService } from '../shared/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  private users: UsersService;
  private jwt: JwtService;
  private bcrypt: BcryptService;

  constructor(
    usersService: UsersService,
    jwtService: JwtService,
    bcrypt: BcryptService,
  ) {
    this.users = usersService;
    this.jwt = jwtService;
    this.bcrypt = bcrypt;
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.users.findByEmail(email);
    const { password, ...result } = user;
    const match = await this.bcrypt.compare(password, pass);
    if (user && match) {
      return result;
    }
    return null;
  }

  async login(user: User): Promise<Session> {
    delete user.password;
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwt.sign(payload),
      user,
    };
  }
}
