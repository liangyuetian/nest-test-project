import { IsEmail, IsNotEmpty, IsNumberString, IsNumber, Validate, MaxLength } from 'class-validator';

export class AssetVo {
    @IsNotEmpty()
    @MaxLength(20)
    number: string;

    @IsNotEmpty()
    @MaxLength(20)
    user: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;
}
