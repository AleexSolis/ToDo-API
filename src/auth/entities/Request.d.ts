import { Request as Req } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

export interface Request extends Req {
  user: User;
}
