import { Injectable, UnauthorizedException } from '@nestjs/common';
import { cryptoString } from '../libs/lib';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string): Promise<any> {
    console.log('auth service validateUser', account, password);
    const data = await this.usersService.findOneByAccount(account);

    console.log('auth service validateUser data', data);

    const user = JSON.parse(JSON.stringify(data || {}));

    password = cryptoString(password);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // 登录
  async login(user: any) {
    console.log('login:', user);
    const validate = await this.validateUser(user.account, user.password);
    console.log('validate00000', user);
    if (!validate) {
      throw new UnauthorizedException();
    }
    const payload = {
      username: user.name,
      userId: user['id'],
      roles: user.roles,
      status: user.status,
      department: user.department,
      phone: user.phone,
      avatar: user.avatar,
      departmentName: user.departmentName,
      departmentId: user.departmentId,
      areaId: user.areaId,
    };
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.userId,
    };
  }

  // 登出
  async logout() {
    return {
      message: 'ok',
    };
  }
}
