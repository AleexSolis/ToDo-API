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
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import errors from 'src/responses/error';
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

  @Get(':id')
  @ApiResponse(responses.GET_USER_BY_ID_SUCCESS)
  @ApiResponse(errors.USER_NOT_FOUND)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const user = await this.service.findOne(id);
      delete user.password;
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Put(':id')
  @ApiResponse(responses.UPDATE_USER_SUCCESS)
  @ApiResponse(errors.USER_NOT_FOUND)
  @ApiResponse(errors.UNKNOWN_ERROR)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.service.update(id, updateUserDto);
      delete user.password;
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      this.logger.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
