import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string; // This is the primary key

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date; // Automatically set when the entity is created

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date; // Automatically updated when the entity is updated
}