import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

  @Column("text", { array: true })
  post_urls: string[]; // S3 URL of the file

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;

  @ManyToOne(() => PinnedLocation, (location) => location.id, { eager: true })
  location: PinnedLocation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
