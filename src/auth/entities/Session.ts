import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';

export class Session {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: User;
}
