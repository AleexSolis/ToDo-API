import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional()
  completedAt?: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
