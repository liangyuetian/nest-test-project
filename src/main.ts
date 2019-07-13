import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
    const port = 4000;
    const app = await NestFactory.create(AppModule);
    // app.enableShutdownHooks(); // 监听应用程序关闭
    await app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    });
}

bootstrap();
