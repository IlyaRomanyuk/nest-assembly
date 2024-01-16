import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EventAttendee } from '../../event_attendees/entities/event_attendee.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: true })
  summary: string | null;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  location: string | null;

  @Column({ name: 'time_start', type: 'timestamptz' })
  timeStart: Date;

  @Column({ name: 'time_end', type: 'timestamptz' })
  timeEnd: Date;

  @OneToMany(() => EventAttendee, (eventAttendee) => eventAttendee.event)
  eventAttendees: EventAttendee[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
  s;
}
