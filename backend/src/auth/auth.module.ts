// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule,
  ],
  providers: [GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
