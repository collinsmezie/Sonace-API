import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PinnedLocation } from 'src/pinned-locations/entities/pinned-location.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  postText: string;

  @Column({ nullable: true })
  markerImageUrl: string;

  @Column("text", { array: true })
  postUrls: string[]; // S3 URL of the file

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;

  @ManyToOne(() => PinnedLocation, (location) => location.id, { eager: true })
  location: PinnedLocation;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
