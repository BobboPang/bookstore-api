import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: User): Promise<{ key: string }> {
    const validatedUser = await this.authService.validateUser(
      user.username,
      user.password,
    );
    if (!validatedUser) {
      return { key: null };
    }
    const key = await this.authService.login(validatedUser);
    return { key };
  }
}
