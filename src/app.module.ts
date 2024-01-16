import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { UserRolesModule } from './modules/user_roles/user_roles.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { RolesModule } from './modules/roles/roles.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from './config/data-source';
import { EventsModule } from './modules/events/events.module';
import { EventAttendeesModule } from './modules/event_attendees/event_attendees.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    UsersModule,
    UserRolesModule,
    ProfilesModule,
    RolesModule,
    SessionsModule,
    EventsModule,
    EventAttendeesModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
