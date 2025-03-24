import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Unique(['latitude', 'longitude', 'createdBy'])
@Entity('pinned_locations')
export class PinnedLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column('float')
  latitude: string;

  @Column('float')
  longitude: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.pinnedLocations, { eager: true })
  createdBy: User;
}