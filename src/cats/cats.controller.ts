import {
    Controller,
    UseGuards, Get, Post, HttpStatus, Param, Body, Req, Res, Next, SetMetadata, UseInterceptors,
    Query,
    Headers, Header, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import { RolesGuard } from '../guard/roles.guard';
import { Request, Response, NextFunction } from 'express';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { Cats } from './cats.decorator';
import { CatsVo } from './vo/cats.vo';

// @UseInterceptors(LoggingInterceptor)
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
    constructor(private readonly connection: Connection) {

    }

    @Get()
    @SetMetadata('roles', ['admin'])
    getCats(
        @Query() query: CatsVo,
        @Req() req: Request,
        @Res() res: Response,
        @Next() next: NextFunction) {
        // res.status(HttpStatus.OK).json({
        //     title: 'cats',
        //     path: '/',
        //     query,
        // });
        res.status(HttpStatus.OK).send({
            title: 'cats',
            path: '/',
            query,
        });
    }

    @Get('/:id')
    @SetMetadata('roles', ['admin', 'user'])
    getCat(@Param('id') id: string) {
        console.log(id);
        return `哈哈，这是一个${id}`;
    }

    @Post()
    @Header('age', 'application')
    async saveParams(
        @Cats('参数？？') cats: any,
        @Body() body,
        @Query() query,
        @Req() req: Request,
        @Res() res: Response) {
        // 只在 x-www-form-urlencoded可以正常接收到参数
        res.status(HttpStatus.OK).json({
            code: 1000,
            msg: '哈哈，保存成功',
            body,
            query,
            cats,
        });
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(
        @UploadedFile() file,
        @Req() req: Request,
        @Res() res: Response,
        @Next() next: NextFunction,
    ) {
        // console.log('file', file);
        // console.log('file-req', req);
        res.status(HttpStatus.OK).json({
            msg: '上传成功',
        });
        // next((err) => {
        //     console.log('错了', err);
        // });
    }
}
