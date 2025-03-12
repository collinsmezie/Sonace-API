import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PinnedLocation } from '../../pinned-locations/entities/pinned-location.entity';
import { Post } from '../../posts/entities/post.entity';

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

  @OneToMany(() => PinnedLocation, (location) => location.created_by)
  pinnedLocations: PinnedLocation[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

}