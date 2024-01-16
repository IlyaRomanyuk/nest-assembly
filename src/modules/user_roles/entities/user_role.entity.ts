import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'user_id', type: 'int', nullable: false })
  public userId: number;

  @Column({ name: 'role_id', type: 'int', nullable: false })
  public roleId: number;

  @Column({ name: 'profile_id', type: 'int', nullable: true })
  public profileId: number | null;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Profile, (profile) => profile.userRoles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
