import { Post } from 'src/app/post/entities/post.entity';
import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
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

  @OneToMany((type) => Post, (post) => post.profile)
  @JoinColumn()
  posts: Post[];
}
