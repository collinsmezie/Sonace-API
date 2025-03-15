import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Unique(['latitude', 'longitude', 'created_by'])
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
  created_at: Date;

  @ManyToOne(() => User, (user) => user.pinnedLocations, { eager: true })
  created_by: User;
}