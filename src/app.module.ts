import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './users/users.controller';
import { CatsModule } from './cats/cats.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
    imports: [CatsModule],
    controllers: [AppController, UserController],
    providers: [AppService, {
        provide: 'APP_GUARD',
        useClass: AuthGuard,
    }],
})
export class AppModule {
}
