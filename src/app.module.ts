import {CacheInterceptor, CacheModule, HttpModule, Module} from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {DatabaseModule} from './database/database.module';

import {CatsModule} from './cats/cats.module';
import {AuthGuard} from './guard/auth.guard';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {PhotoModule} from './photo/photo.module';
import {LoggerModule} from './logger/logger.module';
import {AssetModule} from './asset/asset.module';
// import {ConfigModule} from './config/config.module';
import {PoetryModule} from './poetry/poetry.module';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigService} from '@nestjs/config';

import {mysqlConfig} from './config/database.config';

@Module({
    imports: [
        ConfigModule,
        CatsModule,
        AuthModule,
        UsersModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        // GraphQLModule.forRoot({
        //     typePaths: ['./**/*.graphql'],
        // }),
        ConfigModule.forRoot({
            envFilePath: ['./config/.env'],
            isGlobal: true,
            load: [mysqlConfig],
        }),
        CacheModule.registerAsync({
            useFactory: () => {
                return {
                    ttl: 5, // seconds
                    max: 10, // 缓存中的最大项目数
                };
            },
        }),
        PhotoModule,
        LoggerModule,
        AssetModule,
        PoetryModule,
        DatabaseModule.forRoot(),
        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: 'localhost',
        //     port: 3306,
        //     username: 'root',
        //     password: '123456',
        //     database: 'nestjs',
        //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //     synchronize: true,
        // })
    ],
    controllers: [
        AppController
    ],
    providers: [
        AppService,
        ConfigService,
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
