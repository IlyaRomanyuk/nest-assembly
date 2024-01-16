import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserRole } from '../../user_roles/entities/user_role.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'smallint', nullable: false, unique: true })
  public role: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  public name: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
