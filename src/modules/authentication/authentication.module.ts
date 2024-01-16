import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { UserRolesModule } from '../user_roles/user_roles.module';
import { RolesModule } from '../roles/roles.module';
import { LocalStrategy } from './strategies/local.strategy';
import { config } from '../../config';
import { SessionsModule } from '../sessions/sessions.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    UserRolesModule,
    RolesModule,
    SessionsModule,
    JwtModule,
    JwtModule.registerAsync({
      useFactory: async () => {
        return {
          secret: config.keys.jwtAccessTokenSecret,
          signOptions: {
            expiresIn: config.keys.jwtAccessTokenExpirationTime,
          },
        };
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
