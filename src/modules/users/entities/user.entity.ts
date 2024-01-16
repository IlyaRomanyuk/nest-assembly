import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserRole } from '../../user_roles/entities/user_role.entity';
import { Session } from '../../sessions/entities/session.entity';
import { EventAttendee } from '../../event_attendees/entities/event_attendee.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  public login: string;

  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public email: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public phone: string | null;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => EventAttendee, (eventAttendee) => eventAttendee.user)
  eventAttendees: EventAttendee[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  private tempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    console.log(this.tempPassword, this.password, '-------');
    if (this.tempPassword !== this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
