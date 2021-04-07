import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const ReqData = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const result: any = {
      ...request.params,
      ...request.body,
      ...request.query
    };

    if (request.user) {
      result.userId = request.user.userId;
    }

    return data ? result[data] : result;
  },
);