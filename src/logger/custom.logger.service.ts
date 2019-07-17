import { Logger } from '@nestjs/common';

// 自定义日志记录器
export class CustomLoggerService extends Logger {
    error(message: any, trace?: string, context?: string): void {
        console.log('日志记录系统', message, trace);
        super.error(message, trace);
    }
}
