import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from 'src/libs/lib';
import { JwtStrategyUser } from './strategies/jwt.strategy';
import { LocalStrategyUser } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'userjwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategyUser, JwtStrategyUser],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
