import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  public login: string;

  @Column({ type: 'varchar', nullable: false })
  public password: string;

  @Column({ nullable: false })
  public blocked: boolean;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public email: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public phone: string | null;

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
    if (this.tempPassword !== this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
