import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/users.controller';
import { CatsModule } from './cats/cats.module';
import { AuthGuard } from './guard/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PhotoModule } from './photo/photo.module';

@Module({
    imports: [CatsModule, AuthModule, UsersModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'nestjs',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        CacheModule.register({
            ttl: 5, // seconds
            max: 10, // 缓存中的最大项目数
        }),
        PhotoModule],
    controllers: [AppController, UserController],
    providers: [
        AppService,
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard,
        },
        { // 全局缓存每个端点
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {
}
