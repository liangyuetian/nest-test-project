import { Body, Controller, Get, HttpStatus, Injectable, Next, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { AssetVo } from './vo/asset.vo';
import { InjectConnection } from '@nestjs/typeorm';

@Controller('asset')
export class AssetController {
    constructor(
        @InjectConnection('default')
        private readonly connection: Connection,
    ) {

    }

    @Post('/save')
    async saveAsset(
        @Body() body: AssetVo,
        @Req() req: Request,
        @Res() res: Response,
        @Next() next: NextFunction,
    ) {
        const {user, status } = body;
        const sql = `insert into asset(number,user,status) values('${body.number}','${user}',${status});`
        this.connection.query(sql).then(list => {
            res.status(HttpStatus.OK).json({
                code: 1000,
                msg: '哈哈，保存成功',
                body,
                list,
            });
        });
    }

    @Get('query')
    queryList(
        @Query() query,
        @Req() req: Request,
        @Res() res: Response,
        @Next() next: NextFunction,
    ) {
        this.connection.query('select * from asset').then(list => {
            res.status(HttpStatus.OK).json({
                code: 1000,
                msg: '',
                list,
            });
        });
    }
}
