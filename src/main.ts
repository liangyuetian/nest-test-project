import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = 3000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        // disableErrorMessages: true, // 禁用详细错误
        // whitelist: true, // 剥离多余参数
        // forbidNonWhitelisted: true, // 存在多余参数时报错
        transform: true, // 启用转换
    }));
    // app.enableShutdownHooks(); // 监听应用程序关闭
    await app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
}

bootstrap();
