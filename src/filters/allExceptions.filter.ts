import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const responseMessage = typeof exception.getResponse === 'function' ? exception.getResponse() : exception.message || 'Internal Server Error';

        response.status(statusCode).json({
            statusCode,
            ...responseMessage,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
