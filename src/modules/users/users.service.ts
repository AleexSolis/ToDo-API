import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from 'src/modules/users/entities/user.entity';
import { BcryptService } from 'src/shared/bcrypt/bcrypt.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private prisma: PrismaService;
  private bcrypt: BcryptService;

  constructor(prismaService: PrismaService, bcryptService: BcryptService) {
    this.prisma = prismaService;
    this.bcrypt = bcryptService;
  }

  async create({ password, ...user }: Prisma.UsersCreateInput): Promise<User> {
    const hash = await this.bcrypt.getHash(password);
    return this.prisma.users.create({
      data: { ...user, password: hash },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.users.findMany();
  }

  findOne(id: string): Promise<User> {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<User> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.prisma.users.update({
      where: { id },
      data: {
        ...dto,
        updateAt: new Date(),
      },
    });
  }

  remove(id: string): Promise<User> {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
