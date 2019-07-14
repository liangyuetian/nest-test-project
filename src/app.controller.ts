import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('api')
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(AuthGuard('local')) // 本地策略的默认名称为'local'
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
