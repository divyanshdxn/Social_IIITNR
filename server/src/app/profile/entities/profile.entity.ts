import { Page } from 'src/app/pages/entities/pages.entity';
import { Post } from 'src/app/post/entities/post.entity';
import {
  Entity,
  Column,
  OneToMany,
  BaseEntity,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('profile')
export class Profile extends BaseEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @Column({ unique: true, length: 64 })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: false })
  photoUrl: string;

  @Column({ length: 1024 })
  bio: string;

  @OneToMany(() => Post, (post) => post.profile, { onDelete: 'SET NULL' })
  posts: Post[];

  @ManyToMany(() => Page, (page) => page.admins, { onDelete: 'SET NULL' })
  @JoinTable({
    joinColumn: { name: 'pages' },
    inverseJoinColumn: { name: 'profile' },
  })
  adminOfPages: Page[];

  // Create a many to many relation for storing liked posts
  @ManyToMany(() => Post, (post) => post.likes, { onDelete: 'SET NULL' })
  @JoinTable({
    joinColumn: { name: 'profile' },
    inverseJoinColumn: { name: 'post' },
  })
  likes: Post[];
}