import { Test, TestingModule } from '@nestjs/testing';
import { EventAttendeesService } from './event_attendees.service';

describe('EventAttendeesService', () => {
  let service: EventAttendeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventAttendeesService],
    }).compile();

    service = module.get<EventAttendeesService>(EventAttendeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
