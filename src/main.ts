import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { CustomLoggerService } from './logger/custom.logger.service';

declare const module: any;

async function bootstrap() {
    const port = 3789;
    const app = await NestFactory.create(AppModule, {
        // logger: false, // 关闭默认日志
    });
    app.use(compression()); // 开启gzip
    app.useLogger(app.get(CustomLoggerService));
    app.useGlobalPipes(new ValidationPipe({
        // disableErrorMessages: true, // 禁用详细错误
        // whitelist: true, // 剥离多余参数
        // forbidNonWhitelisted: true, // 存在多余参数时报错 需要和whiteList同时使用
        transform: true, // 启用转换
        transformOptions: {
            strategy: 'exposeAll', // 所有的属性都进行转换
            enableImplicitConversion: true, // 根据TS的反射类型进行转换
        },
    }));
    // app.enableShutdownHooks(); // 监听应用程序关闭
    await app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
