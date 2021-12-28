import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Res,
  HttpStatus,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionInterceptor } from 'src/interceptors/permission.interceptor';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import errors, { NotTypeError } from 'src/responses/error';
import responses from 'src/responses/success';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private service: UsersService;
  private logger = new Logger('UsersController');

  constructor(usersService: UsersService) {
    this.service = usersService;
  }

  @Get(':userId')
  @ApiResponse(responses.GET_USER_BY_ID_SUCCESS)
  @ApiResponse(errors.USER_NOT_FOUND)
  @ApiResponse(errors.UNAUTHORIZED)
  @ApiResponse(errors.UNKNOWN_ERROR)
  @ApiBearerAuth()
  @UseInterceptors(PermissionInterceptor)
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('userId') id: string,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.service.findOne(id);

      if (user) {
        delete user.password;
        res.status(HttpStatus.OK).json(user);
      } else {
        res
          .status(errors.USER_NOT_FOUND.status)
          .json(NotTypeError(errors.USER_NOT_FOUND));
      }
    } catch (error) {
      this.logger.error(error.message);
      res.status(errors.UNKNOWN_ERROR.status).send();
    }
  }

  @Put(':userId')
  @ApiResponse(responses.UPDATE_USER_SUCCESS)
  @ApiResponse(errors.VALIDATION_ERROR)
  @ApiResponse(errors.USER_NOT_FOUND)
  @ApiResponse(errors.UNAUTHORIZED)
  @ApiResponse(errors.UNKNOWN_ERROR)
  @ApiBearerAuth()
  @UseInterceptors(PermissionInterceptor)
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('userId') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.service.update(id, updateUserDto);
      delete user.password;
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.message);
      res.status(errors.UNKNOWN_ERROR.status).send();
    }
  }
}
