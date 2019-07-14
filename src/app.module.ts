import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/users.controller';
import { CatsModule } from './cats/cats.module';
import { AuthGuard } from './guard/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [CatsModule, AuthModule, UsersModule],
    controllers: [AppController, UserController],
    providers: [AppService, {
        provide: 'APP_GUARD',
        useClass: AuthGuard,
    }],
})
export class AppModule {
}
