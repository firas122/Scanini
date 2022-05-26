import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "./models/user.entity";

export const CurrentUser = createParamDecorator(
    (_data, context: ExecutionContext): User => {
        if (context.getType() === 'http') {
            return context.switchToHttp().getRequest().user;
        }

        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req.user;
    },
);