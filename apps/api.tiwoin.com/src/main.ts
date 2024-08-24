import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidatorOptions } from 'class-validator';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

class ValidationPipeOptions implements ValidatorOptions { }

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe(new ValidationPipeOptions()))
    const configService = app.get(ConfigService);
    await app.listen(configService.get('PORT') || '3000');
}
bootstrap();
