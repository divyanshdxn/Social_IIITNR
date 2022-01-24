import { Profile } from 'src/app/profile/entities/profile.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: false })
  passwordHash: string;

  @PrimaryColumn()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: false })
  updatedAt: Date;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;
}
