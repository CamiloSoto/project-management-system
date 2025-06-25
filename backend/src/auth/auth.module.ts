import { Module } from '@nestjs/common';

import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import configuration from '../config/configuration';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { secret, expiration } = configService.jwt;
        return {
          secret,
          signOptions: { expiresIn: expiration || '15m' },
        };
      },
      inject: [configuration.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
