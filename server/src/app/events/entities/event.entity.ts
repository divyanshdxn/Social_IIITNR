import { Page } from '../../pages/entities/pages.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EventDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ type: 'timestamptz', nullable: true })
  deadline: Date;

  @ManyToOne(() => Page, (page) => page.events)
  page: Page;

  @Column({ type: 'simple-array', nullable: true })
  media: string[];
}
