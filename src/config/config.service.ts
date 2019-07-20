import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';

export interface EnvConfig {
    [key: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filePath: string) {
        const config = dotenv.parse(fs.readFileSync(filePath));
        // this.envConfig = this.validateInput(config);
        this.envConfig = config;
        dotenv.config({ path: filePath }); // 将环境变量复制到process.env上
        console.log('当前环境:', this.get('NODE_ENV'), process.env.PORT, this.get('PORT'));
    }

    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid(['development', 'production', 'test', 'provision'])
                .default('development'),
            PORT: Joi.number().default(3000),
            API_AUTH_ENABLED: Joi.boolean().required(),
            MYSQL_HOST: Joi.string().required().default('localhost'),
            MYSQL_USER: Joi.string().required().default('root'),
            MYSQL_PASSWORD: Joi.string().required(),
        });

        const { error, value: validatedEnvConfig } = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            // throw new Error(`Config validation error: ${error.message}`);
            console.log('error', error);
        }

        return validatedEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
