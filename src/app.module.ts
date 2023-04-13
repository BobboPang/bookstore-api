import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { BooksModule } from './books/books.module';
import configDefault from '../config/config.default';
@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      load: [configDefault],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('mysql.host'),
        port: +configService.get('mysql.port'),
        username: configService.get('mysql.username'),
        password: configService.get('mysql.password'),
        database: configService.get('mysql.database'),
        synchronize: configService.get('mysql.synchronize'),
        autoLoadEntities: true,
        keepConnectionAlive: true,
      }),
    }),
    // 静态资源模块
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/',
      },
      {
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads',
      },
    ),
    // 业务模块...
    AuthModule,
    UsersModule,
    AddressModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// @Module({
//   imports: [TypeOrmModule.forFeature([Users])],
//   controllers: [UsersController],
//   providers: [UsersService],
// })
// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Users]),
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '600s' }, // Token 有效期为 10 分钟
//     }),
//   ],
//   controllers: [UsersController],
//   providers: [UsersService, JwtStrategy],
//   exports: [UsersService],
// })
export class AppModule {}
