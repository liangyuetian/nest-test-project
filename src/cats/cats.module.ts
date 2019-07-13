import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsMockController } from './cats.mock.controller';
// import { RolesGuard } from '../guard/roles.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

@Module({
    controllers: [CatsController],
    providers: [
        // {
        //     provide: 'APP_GUARD', // 生效在全局
        //     useClass: RolesGuard,
        // },
        {
            provide: 'APP_INTERCEPTOR', // 生效在全局
            useClass: LoggingInterceptor,
        },
        {
            provide: CatsController,
            useValue: CatsMockController,
        },
    ],
})
export class CatsModule {
}
