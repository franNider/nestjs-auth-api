import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { RolesModule } from './role/role.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST')!,
        port: parseInt(configService.get<string>('DB_PORT')!),
        username: configService.get<string>('DB_USER')!,
        password: configService.get<string>('DB_PASSWORD')!,
        database: configService.get<string>('DB_NAME')!,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
