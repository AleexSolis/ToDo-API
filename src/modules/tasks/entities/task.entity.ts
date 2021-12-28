import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tasks } from '@prisma/client';

export class Task implements Omit<Tasks, 'description' | 'completedAt'> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  completedAt?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;
}
