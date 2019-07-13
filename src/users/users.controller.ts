import {
    Controller, Get, Post, HttpStatus, Req, Res, Next,
    OnModuleInit, // 主机模块初始化后调用
    OnApplicationBootstrap, // 应用程序完全启动并进行自举后调用
    OnModuleDestroy, // 就在Nest破坏主机模块之前进行清理（app.close()方法已被评估）
    OnApplicationShutdown, // 当应用程序被关闭时调用 在NestFactory.create后调用 app.enableShutdownHooks()
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Controller('users')
export class UserController implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy, OnApplicationShutdown {
    onModuleInit() {
        // 主机模块初始化后调用
        console.log('主机模块初始化后调用');
    }

    onApplicationBootstrap() {
        console.log('应用程序完全启动并进行自举后调用');
    }

    onModuleDestroy() {
        console.log('就在Nest破坏主机模块之前进行清理（app.close()方法已被评估）');
    }

    onApplicationShutdown(signal: string) {
        console.log('系统关闭时触发', signal); // e.g. "SIGINT"
        return Promise.resolve();
    }

    @Get()
    getAllUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        res.status(HttpStatus.OK).json([{
            id: 1, name: 'Test',
        }]);
    }

    @Get('/:id')
    getUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        console.log('getUser');
    }

    @Post()
    addUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        console.log('addUser');
    }

}
