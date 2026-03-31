import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RoleService } from './role/role.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('NestJS API')
  .setDescription('API con autenticación y roles')
  .setVersion('1.0')
  .addBearerAuth() // 🔥 importante para JWT
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  const roleService = app.get(RoleService);


  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
