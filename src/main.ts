import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AllExceptionsFilter} from './common/filters/allExceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  // Swagger
  const options = new DocumentBuilder()
      .setTitle('Nest application')
      .setDescription('The API description')
      .setVersion('1.0')
      .addTag('nest')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Start server
  await app.listen(3000);
}
bootstrap();
