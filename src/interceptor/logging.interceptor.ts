import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // console.log('before...');

        const now = Date.now();
        // return next.handle().pipe(
        //     tap(() => console.log('after', Date.now() - now)), // 相当于do操作符
        // );
        const body = context.switchToHttp().getRequest().body;
        // console.log('interceptor', body);
        return next.handle().pipe(map(data => {
            // console.log('interceptor', data);
            return { data };
        }));
        // return next.handle().pipe(timeout(5000)) // 5秒后，请求处理将被取消。
    }
}
