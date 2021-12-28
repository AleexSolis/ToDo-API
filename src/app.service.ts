import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AppService {
  private user: UsersService;
  constructor(userService: UsersService) {
    this.user = userService;
  }

  getMessage(): string {
    return 'API Version 1.0';
  }

  register(user: CreateUserDto): Promise<User> {
    return this.user.create(user);
  }
}
