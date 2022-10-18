import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiPath = 'api/v2';

  const config = new DocumentBuilder()
    .setTitle('Pokedex')
    .setDescription('Pokedex API description')
    .setVersion('2.0')
    .addTag('pokemons')
    .addServer('v2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(apiPath, app, document);

  app.setGlobalPrefix(apiPath);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT);
  console.log(`App running in port ${process.env.PORT}`);
}

bootstrap();
