import { IsEmail, IsNotEmpty, IsNumberString, IsNumber, Validate } from 'class-validator';
import { CustomTextLength } from './CustomTextLength';

export class CatsVo {
    @Validate(CustomTextLength, {
        message: '哈哈',
    })
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

    @IsEmail({}, {
        message: '请输入电子邮箱',
    })
    email: string;

    @IsNumber()
    number: number;

    @IsNumberString()
    numberString: string;
}
