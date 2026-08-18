import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

/**
 * Turns unexpected failures into a generic 500 so internal details (driver
 * messages, stack traces, connection strings) never reach the client, while
 * the real error is logged. Deliberate HttpExceptions pass through untouched.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const route = `${request?.method} ${request?.url}`;

    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          return throwError(() => error);
        }

        this.logger.error(`Unhandled error on ${route}: ${error?.message}`, error?.stack);

        return throwError(
          () => new InternalServerErrorException('Internal server error'),
        );
      }),
    );
  }
}
