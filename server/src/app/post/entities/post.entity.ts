import { Profile } from 'src/app/profile/entities/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class Post extends BaseEntity {
  @PrimaryColumn({type:"uuid"})
  postId: string;

  @Column()
  caption: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.posts, { onDelete: 'CASCADE' })
  @JoinColumn()
  profile: Profile;

  @Column({ type: 'simple-array' })
  media: string[];
}
