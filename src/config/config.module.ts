import {Module} from '@nestjs/common';
// import {ConfigService} from './config.service';
import {ConfigService} from '@nestjs/config';

@Module({
    imports: [],
    providers: [
        ConfigService,
        // {
        //     provide: ConfigService,
        //     useValue: new ConfigService(`${join(__dirname, '../../src/config', process.env.NODE_ENV)}.env`),
        // }
    ],
    exports: [ConfigService],
})
export class ConfigModule {
}
