import { Controller, Get, HttpStatus, Next, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PoetryService } from './poetry.service';

@Controller('poetry')
export class PoetryController {
    constructor(private readonly poetryService: PoetryService) {
    }

    @Get()
    getPoetry(
        @Res() res: Response,
        @Next() next: NextFunction,
    ) {
        this.poetryService.getPoetryList().subscribe(({ data }) => {
            res.status(HttpStatus.OK).json({ ...data });
        });
    }
}
