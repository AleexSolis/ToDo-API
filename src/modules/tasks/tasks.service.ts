import { Injectable } from '@nestjs/common';
import { Task } from 'src/modules/tasks/entities/task.entity';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private prisma: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prisma = prismaService;
  }

  create({ userId, ...data }: CreateTaskDto): Promise<Task> {
    return this.prisma.tasks.create({
      data: {
        ...data,
        Users: {
          connect: { id: userId },
        },
      },
    });
  }

  findAll(userId: string): Promise<Task[]> {
    return this.prisma.tasks.findMany({ where: { userId } });
  }

  findOne(id: string, userId: string): Promise<Task> {
    return this.prisma.tasks.findFirst({ where: { id, userId } });
  }

  update(id: string, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.tasks.update({
      data,
      where: { id },
    });
  }

  remove(id: string): Promise<Task> {
    return this.prisma.tasks.delete({ where: { id } });
  }
}
