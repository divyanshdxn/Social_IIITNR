import { Media } from 'src/app/media/entities/media.entity';
import { Page } from 'src/app/pages/entities/pages.entity';
import { Profile } from 'src/app/profile/entities/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class Post extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  postId: string;

  @Column()
  caption: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  profileUserId: string;

  @ManyToOne(() => Profile, (profile) => profile.posts, { onDelete: 'CASCADE' })
  profile: Profile;

  @Column({ type: 'simple-array' })
  media: string[];

  @ManyToOne(() => Page, (page) => page.posts, { nullable: true })
  page: Page;
  
  // Create a many to many relation from post to profile for storing post likes
  @ManyToOne(() => Profile, (profile) => profile.likes, { onDelete: 'CASCADE' })
  likes: Profile[];
}
