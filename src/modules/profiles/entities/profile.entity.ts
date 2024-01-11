import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'last_name', type: 'varchar', length: 50, nullable: true })
  public lastName: string | null;

  @Column({ name: 'first_name', type: 'varchar', length: 50, nullable: false })
  public firstName: string;

  @Column({ name: 'sur_name', type: 'varchar', length: 50, nullable: true })
  public surName: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  public gender: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  public birthday: Date | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  public jobTitle: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public email: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public phone: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public whatsapp: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  public telegram: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public instagram: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
