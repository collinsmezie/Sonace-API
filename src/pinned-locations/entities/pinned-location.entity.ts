import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity('pinned_locations')
export class PinnedLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.pinnedLocations, { eager: true })
  created_by: User;
}
