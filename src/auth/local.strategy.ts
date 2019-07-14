import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        // 校验用户时自动调用
        // 该validate()方法值得一些讨论。对于jwt-strategy，Passport首先验证JWT的签名并解码JSON。
        // 然后它调用我们的validate()方法将解码的JSON作为其单个参数传递。
        // 根据JWT签名的工作方式，我们保证会收到我们之前签署并颁发给有效用户的有效令牌。

        // 我们可以在我们的validate()方法中进行数据库查找，以提取有关用户的更多信息，从而user在我们的网站中提供更丰富的对象Request。
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
