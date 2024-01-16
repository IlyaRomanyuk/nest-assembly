import { Injectable } from '@nestjs/common';
import { CreateEventAttendeeDto } from './dto/create-event_attendee.dto';
import { UpdateEventAttendeeDto } from './dto/update-event_attendee.dto';

@Injectable()
export class EventAttendeesService {
  create(createEventAttendeeDto: CreateEventAttendeeDto) {
    return 'This action adds a new eventAttendee';
  }

  findAll() {
    return `This action returns all eventAttendees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventAttendee`;
  }

  update(id: number, updateEventAttendeeDto: UpdateEventAttendeeDto) {
    return `This action updates a #${id} eventAttendee`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventAttendee`;
  }
}
