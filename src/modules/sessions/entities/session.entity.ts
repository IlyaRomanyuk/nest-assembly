import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'refresh_token', type: 'varchar', nullable: false })
  public refreshToken: string;

  @Column({ name: 'expires_in', type: 'bigint', nullable: true })
  public expiresIn: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
