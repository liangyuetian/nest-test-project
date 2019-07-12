import { Controller, Get, Post, HttpStatus, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Controller('users')
export class UserController {
    @Get()
    getAllUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        res.status(HttpStatus.OK).json([{
            id: 1, name: 'Test',
        }]);
    }

    @Get('/:id')
    getUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        console.log('getUser');
    }

    @Post()
    addUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        console.log('addUser');
    }
}
