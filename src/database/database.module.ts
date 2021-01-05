import {DynamicModule, Global, Module} from '@nestjs/common';
import {DatabaseController} from './database.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {mysqlConfig} from '../config/database.config';
import {join} from 'path';

@Module({
    // imports: [
    //     // TypeOrmModule.forRoot({
    //     //     type: 'mysql',
    //     //     host: 'localhost',
    //     //     port: 3306,
    //     //     username: 'root',
    //     //     password: '123456',
    //     //     database: 'nestjs',
    //     //     // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     //     synchronize: true,
    //     // }),
    //     TypeOrmModule.forRootAsync({
    //         useFactory: async (configService: ConfigService) => {
    //             return {
    //                 type: 'mysql',
    //                 host: 'localhost',
    //                 port: 3306,
    //                 username: 'root',
    //                 password: '123456',
    //                 database: 'nestjs',
    //                 entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //                 synchronize: true,
    //             };
    //         }
    //     }),
    // ],
    // controllers: [DatabaseController],
    // exports: [
    //     TypeOrmModule
    // ],
})
export class DatabaseModule {
    static forRoot(): DynamicModule {
        const config = mysqlConfig()
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: config.host,
                    port: config.port,
                    username: config.username,
                    password: config.password,
                    database: config.database,
                    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    entities: config.entities,
                    synchronize: true,
                }),
            ],
            exports: [
                TypeOrmModule,
            ]
        };
    }
}
