import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Media extends BaseEntity {
  @PrimaryColumn('uuid')
  mediaId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  mimeType: string;

  @Column()
  fileName: string;

  @Column({ nullable: true })
  originalName: string;

  @Column({ unique: true })
  path: string;
}
