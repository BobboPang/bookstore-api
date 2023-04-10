import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: RedisService,
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');
        const redisStoreOptions = {
          url: redisUrl,
        };
        return new RedisService(redisStoreOptions);
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
