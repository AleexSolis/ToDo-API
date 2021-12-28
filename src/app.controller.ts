import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'src/auth/entities';
import { Login } from 'src/auth/entities/Login';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import errors from 'src/responses/error';
import responses from 'src/responses/success';
import { AppService } from './app.service';

@ApiTags('Auth')
@Controller()
export class AppController {
  private service: AppService;
  private auth: AuthService;
  private logger = new Logger('AppController');

  constructor(appService: AppService, authService: AuthService) {
    this.service = appService;
    this.auth = authService;
  }

  @Get()
  @ApiResponse(responses.WELCOME_MESSAGE)
  getAPI(): string {
    return this.service.getMessage();
  }

  @Post('register')
  @ApiResponse(responses.REGISTER_SUCCESS)
  @ApiResponse(errors.REGISTER_EMAIL_USERNAME_EXISTS)
  @ApiResponse(errors.UNKNOWN_ERROR)
  async register(
    @Body() dto: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const user = await this.service.register(dto);
      delete user.password;
      res.status(HttpStatus.OK).json(user);
    } catch (error) {
      // Prisma error unique constraint.
      if (error.code === 'P2002') {
        res
          .status(errors.REGISTER_EMAIL_USERNAME_EXISTS.status)
          .json(errors.REGISTER_EMAIL_USERNAME_EXISTS);
      }
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Post('login')
  @ApiBody({ type: Login })
  @ApiResponse(responses.LOGIN_SUCCESS)
  @ApiResponse(errors.LOGIN_EMAIL_NOT_FOUND)
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const session = await this.auth.login(req.user);
      res.status(HttpStatus.OK).json(session);
    } catch (error) {
      this.logger.error(error.message);
      res.status(HttpStatus.UNAUTHORIZED).send(error.message);
    }
  }

  @Get('profile')
  @ApiResponse(responses.PROFILE_SUCCESS)
  @ApiResponse(errors.UNAUTHORIZED)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const profile = { ...req.user };
      delete profile.password;
      res.status(HttpStatus.OK).json(profile);
    } catch (error) {
      this.logger.error(error.message);
      res.status(HttpStatus.UNAUTHORIZED).send(error.message);
    }
  }
}
