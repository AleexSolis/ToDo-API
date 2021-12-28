import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'src/auth/entities';

@Injectable()
export class PermissionInterceptor implements NestInterceptor {
  private logger = new Logger('PermissionInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const userId = request.params?.userId || request.body?.userId;
    if (userId !== request.user.id && request.user.role !== 'ADMIN') {
      this.logger.error(
        `User ${request.user.id} is not authorized to access user ${userId}`,
      );
      throw new UnauthorizedException();
    }
    return next.handle();
  }
}
