import { Module } from '@nestjs/common';
import { EventAttendeesService } from './event_attendees.service';
import { EventAttendeesController } from './event_attendees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventAttendee } from './entities/event_attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventAttendee])],
  controllers: [EventAttendeesController],
  providers: [EventAttendeesService],
  exports: [EventAttendeesService],
})
export class EventAttendeesModule {}
