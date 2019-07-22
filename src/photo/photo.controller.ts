import { Controller, Get, HttpStatus, Next, Res } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { NextFunction, Response } from 'express';

@Controller('photo')
export class PhotoController {
    constructor(
        private readonly photoService: PhotoService,
    ) {
    }

    @Get('findAll')
    findAll(
        @Res() res: Response,
        @Next() next: NextFunction,
    ) {
        this.photoService.findAll('select * from user').then(data => {
            res.status(HttpStatus.OK).json({
                data,
            });
        });
    }
}
