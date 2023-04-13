import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/users.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/keys';
// import { JwtStrategy } from './auth_bak/jwt.strategy';
import { BookCellModule } from './book-cell/book-cell.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddressModule } from './address/address.module';
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
    BookCellModule,
    AuthModule,
    UsersModule,
    AddressModule,
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
