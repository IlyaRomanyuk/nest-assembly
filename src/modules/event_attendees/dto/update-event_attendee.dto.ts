import { PartialType } from '@nestjs/mapped-types';
import { CreateEventAttendeeDto } from './create-event_attendee.dto';

export class UpdateEventAttendeeDto extends PartialType(CreateEventAttendeeDto) {}
