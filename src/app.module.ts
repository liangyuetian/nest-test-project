import { Module } from '@nestjs/common';
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
        PhotoModule],
    controllers: [AppController, UserController],
    providers: [AppService, {
        provide: 'APP_GUARD',
        useClass: AuthGuard,
    }],
})
export class AppModule {
}
