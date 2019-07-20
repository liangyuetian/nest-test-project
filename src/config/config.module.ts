import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
@Module({
    providers: [{
        provide: ConfigService,
        useValue: new ConfigService(`${path.join(__dirname, process.env.NODE_ENV)}.env`),
    }],
    exports: [ConfigService],
})
export class ConfigModule {
}
