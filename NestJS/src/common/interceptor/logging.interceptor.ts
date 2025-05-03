
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const method = req.method
    const url = req.originalUrl || req.url;

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => console.log(`${method} ${url} ${Date.now() - now}ms`)),
      );
  }
}
