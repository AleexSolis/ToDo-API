import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { BcryptModule } from 'src/shared/bcrypt/bcrypt.module';

@Module({
  imports: [PrismaModule, BcryptModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
