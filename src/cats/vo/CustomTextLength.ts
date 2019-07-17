import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextLength {
    validate(text: string, args: ValidationArguments) {
        return text.length > 1 && text.length < 10; // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return '这个是一个自定义验证，你出错了';
    }
}
