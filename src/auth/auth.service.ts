import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return null;
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }

  async login(user: User): Promise<string> {
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    const redis = this.redisService.getClient();
    const key = uuidv4();
    await redis.set(key, token, 'EX', 600); // Token 有效期为 10 分钟
    return key;
  }

  async verifyToken(key: string): Promise<boolean> {
    const redis = this.redisService.getClient();
    const token = await redis.get(key);
    if (!token) {
      return false;
    }
    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      return false;
    }
  }
}
