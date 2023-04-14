import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuardUser } from './guards/local-auth.guard';
import { Log } from 'src/libs/utils';
import { Public } from './decorators/public.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Request() req) {
    console.log('user auth ctrl', req.body.user);
    // Log({ req, user: req.user });
    return this.authService.login(req.body.user);
  }
  // async login(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }
}
