import {
    Controller,
    UseGuards, Get, Post, HttpStatus, Param, Body, Req, Res, Next, SetMetadata, UseInterceptors,
    Query, CacheInterceptor,
    Headers, Header, UploadedFile,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { RolesGuard } from '../guard/roles.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { Cats } from './cats.decorator';
import { CatsVo } from './vo/cats.vo';
import { CustomLoggerService } from '../logger/custom.logger.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CatsService } from './cats.service';

// @UseInterceptors(CacheInterceptor) // 缓存接口
// @UseInterceptors(LoggingInterceptor)
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
    constructor(
        private readonly connection: Connection,
        private readonly catsService: CatsService,
    ) {

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
        // this.customLoggerService.log('cats 触发');
        // res.header({ // 设置headers
        //     qa: 12,
        // });
        // res.setHeader('Connection', 'keep-alive'); // 设置headers

        setTimeout(() => {
            CustomLoggerService.log('暂停1s');
            res.status(HttpStatus.OK).send({
                title: 'cats',
                path: '/',
                query,
            });
        }, 1000);
    }

    @Get('detail/:id')
    @SetMetadata('roles', ['admin', 'user'])
    getCat(
        @Param('id') id: string,
    ) {
        CustomLoggerService.log(`请求了cat/detail/:id接口，参数为: ${id}`);
        return `detail/${id}`;
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

    @Post('steam')
    @Header('cats', 'steam')
    async sendSteam(
        @Body() body,
        @Query() query,
        @Req() req: Request,
        @Res() res: Response,
        @Next() next: NextFunction,
    ) {
        // res.status(HttpStatus.OK).json({
        //     code: 1000,
        //     msg: '哈哈，保存成功',
        //     body,
        // });
        res.status(HttpStatus.OK).write('1', 'uft-8', (data) => {
            console.log('1', data);
        });
        setTimeout(() => {
            res.status(HttpStatus.OK).write('1000', 'uft-8', (data) => {
                console.log('1000', data);
            });
        }, 1000);
        setTimeout(() => {
            res.status(HttpStatus.OK).end();
        }, 2000);
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
        CustomLoggerService.debug('');
        res.status(HttpStatus.OK).json({
            msg: '上传成功 ',
        });
        // next((err) => {
        //     console.log('错了', err);
        // });
    }
}
