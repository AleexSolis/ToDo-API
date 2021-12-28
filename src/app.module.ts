import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
// import { TasksModule } from './modules/tasks/tasks.module';
import { BcryptModule } from './shared/bcrypt/bcrypt.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, BcryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
