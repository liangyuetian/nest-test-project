import { Controller, UseGuards, Get, Post, HttpStatus, Param, Body, Req, Res, Next, SetMetadata, UseInterceptors } from '@nestjs/common';
import { RolesGuard } from '../guard/roles.guard';
import { Request, Response, NextFunction } from 'express';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

// @UseInterceptors(LoggingInterceptor)
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
    @Get()
    @SetMetadata('roles', ['admin'])
    getCats(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        return res.status(HttpStatus.OK).json({
            title: 'cats',
            path: '/',
        });
        // res.status(HttpStatus.CREATED).send();
    }

    @Get('/:id')
    @SetMetadata('roles', ['admin', 'user'])
    getCat(@Param('id') id: string) {
        console.log(id);
        return `哈哈，这是一个${id}`;
    }

    @Post()
    async saveParams(@Body() params, @Req() req: Request, @Res() res: Response) {
        // 只在 x-www-form-urlencoded可以正常接收到参数
        console.log(params);
        console.log(req.body);
        res.status(HttpStatus.OK).json({
            code: 1000,
            msg: '哈哈，保存成功',
            body: params,
        });
    }
}
