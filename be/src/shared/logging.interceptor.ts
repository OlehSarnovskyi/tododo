import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        let status = 500;
        let response = 'Internal server error'

        status = error.status || 500;
        response = error.message || response;

        return throwError(
          () => new HttpException(response, status, { cause: error }),
        )
      })
    )
  }
}
