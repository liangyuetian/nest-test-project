import { createParamDecorator, Request } from '@nestjs/common';

export const Cats = createParamDecorator((data, req: Request) => {
    // data 为装饰器传的参数，req 是响应体
    return req.headers;
});
