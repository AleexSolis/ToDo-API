import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Logger,
  Req,
  Put,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import responses from 'src/responses/success';
import errors, { NotTypeError } from 'src/responses/error';
import { Request } from 'src/auth/entities';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionInterceptor } from 'src/interceptors/permission.interceptor';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  private service: TasksService;
  private logger = new Logger('TasksController');

  constructor(tasksService: TasksService) {
    this.service = tasksService;
  }

  @Post()
  @ApiResponse(responses.TASK_SUCCESS)
  @ApiResponse(errors.UNKNOWN_ERROR)
  @ApiResponse(errors.VALIDATION_ERROR)
  @ApiBearerAuth()
  @UseInterceptors(PermissionInterceptor)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() dto: CreateTaskDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const task = await this.service.create(dto);
      res.status(HttpStatus.CREATED).json(task);
    } catch (error) {
      this.logger.error(error.message);
      res.status(errors.UNKNOWN_ERROR.status).send();
    }
  }

  @Get()
  @ApiResponse(responses.TASKS_SUCCESS)
  @ApiResponse(errors.UNKNOWN_ERROR)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAll(@Res() res: Response, @Req() req: Request): Promise<void> {
    try {
      const tasks = await this.service.findAll(req.user.id);
      res.status(HttpStatus.CREATED).json(tasks);
    } catch (error) {
      this.logger.error(error.message);
      res.status(errors.UNKNOWN_ERROR.status).send();
    }
  }

  @Get(':id')
  @ApiResponse(responses.TASK_SUCCESS)
  @ApiResponse(errors.TASK_NOT_FOUND)
  @ApiResponse(errors.UNKNOWN_ERROR)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    try {
      const task = await this.service.findOne(id, req.user.id);
      if (task) {
        res.status(HttpStatus.CREATED).json(task);
      } else {
        res
          .status(errors.TASK_NOT_FOUND.status)
          .json(NotTypeError(errors.TASK_NOT_FOUND));
      }
    } catch (error) {
      this.logger.error(error.message);
      res.status(errors.UNKNOWN_ERROR.status).send();
    }
  }

  @Put(':id')
  @ApiResponse(responses.TASK_SUCCESS)
  @ApiResponse(errors.VALIDATION_ERROR)
  @ApiResponse(errors.TASK_NOT_FOUND)
  @ApiResponse(errors.UNKNOWN_ERROR)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const task = await this.service.findOne(id, req.user.id);
      if (task) {
        const updated = await this.service.update(id, dto);
        res.status(HttpStatus.OK).json(updated);
      } else {
        res
          .status(errors.TASK_NOT_FOUND.status)
          .json(NotTypeError(errors.TASK_NOT_FOUND));
      }
    } catch (error) {
      this.logger.error(error.message);
      res.status(errors.UNKNOWN_ERROR.status).send();
    }
  }

  @Delete(':id')
  @ApiResponse(responses.TASK_DELETE_SUCCESS)
  @ApiResponse(errors.TASK_NOT_FOUND)
  @ApiResponse(errors.UNKNOWN_ERROR)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    try {
      const task = await this.service.findOne(id, req.user.id);
      if (task) {
        await this.service.remove(id);
        res.status(HttpStatus.OK).send();
      } else {
        res
          .status(errors.TASK_NOT_FOUND.status)
          .json(NotTypeError(errors.TASK_NOT_FOUND));
      }
    } catch (error) {
      this.logger.error(error.message);
      res.status(errors.UNKNOWN_ERROR.status).send();
    }
  }
}
