import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;
}