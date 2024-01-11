import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './src/modules/users/users.module';
import { UsersModule } from './users/users.module';
import { UsersModule } from './modules/users/users.module';
import { UserRolesModule } from './modules/user_roles/user_roles.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { RolesModule } from './modules/roles/roles.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [UsersModule, UserRolesModule, ProfilesModule, RolesModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
