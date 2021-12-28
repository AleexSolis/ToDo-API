import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService: PrismaService = app.get(PrismaService);
  const config = new DocumentBuilder()
    .setTitle('ToDoList API')
    .setDescription(
      'This documentation was created to easy understand how to use API endpoints, from how to make the request to what they return.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.useGlobalPipes(new ValidationPipe());
  prismaService.enableShutdownHooks(app);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
