import {registerAs} from '@nestjs/config';
import {join} from 'path'

console.log(join(__dirname + '/../**/*.entity{.ts,.js}'));
export const mysqlConfig = registerAs('mysql', () => ({
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'nestjs',
    entities: [join(__dirname + '/../**/*.entity{.ts,.js}')],
    synchronize: true,
}));
