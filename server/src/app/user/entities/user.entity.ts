import { Post } from "src/app/post/entities/post.entity";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("user_profile")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    userId!: string

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ nullable: false })
    passwordHash: string

    @Column({ nullable: false })
    firstName: string

    @Column({ nullable: true })
    lastName!: string

    @Column({ nullable: false, unique: true })
    photoUrl: string

    @Column({ type: "timestamp", nullable: false })
    createdAt: Date

    @Column({ type: "timestamp", nullable: false })
    updatedAt: Date

    @ManyToMany(type=>Post)
    posts:Post[]

    @ManyToMany(type=>Post)
    likedPosts:Post[]

}