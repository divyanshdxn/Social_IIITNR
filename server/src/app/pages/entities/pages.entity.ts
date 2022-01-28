import { Profile } from 'src/app/profile/entities/profile.entity';
import { EventDetails } from '../../events/entities/event.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from 'src/app/post/entities/post.entity';

@Entity()
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => EventDetails, (event) => event.page)
  events: EventDetails[];

  @ManyToMany(() => Profile, (profile) => profile.adminOfPages, {
    onDelete: 'CASCADE',
  })
  admins: Profile[];

  @Column({ type: 'simple-array', nullable: true })
  media: string[];
  @OneToMany(() => Post, (post) => post.page)
  posts: Post[];
}
