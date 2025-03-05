import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PinnedLocation } from 'src/pinned-locations/entities/pinned-location.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  media_url: string; // S3 URL of the image or video

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;

  @ManyToOne(() => PinnedLocation, (location) => location.id, { eager: true })
  location: PinnedLocation;
}
