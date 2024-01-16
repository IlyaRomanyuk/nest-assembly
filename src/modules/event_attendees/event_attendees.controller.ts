import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventAttendeesService } from './event_attendees.service';
import { CreateEventAttendeeDto } from './dto/create-event_attendee.dto';
import { UpdateEventAttendeeDto } from './dto/update-event_attendee.dto';

@Controller('event-attendees')
export class EventAttendeesController {
  constructor(private readonly eventAttendeesService: EventAttendeesService) {}

  @Post()
  create(@Body() createEventAttendeeDto: CreateEventAttendeeDto) {
    return this.eventAttendeesService.create(createEventAttendeeDto);
  }

  @Get()
  findAll() {
    return this.eventAttendeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventAttendeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventAttendeeDto: UpdateEventAttendeeDto) {
    return this.eventAttendeesService.update(+id, updateEventAttendeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventAttendeesService.remove(+id);
  }
}
