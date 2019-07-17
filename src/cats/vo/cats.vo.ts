import { IsEmail, IsNotEmpty, IsNumberString, IsNumber} from 'class-validator';

export class CatsVo {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;

    @IsNumber()
    number: number;

    @IsNumberString()
    numberString: string;
}
