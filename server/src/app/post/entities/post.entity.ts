import { User } from "src/app/user/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    postId: string

    @Column()
    caption: string

    @Column({ type: "bytea", nullable: true })
    media: Buffer

    @Column({nullable:true})
    mimeType: string

    @Column({ type: "timestamp", nullable: false })
    createdAt: Date

    @Column({ type: "timestamp", nullable: false })
    updatedAt: Date

    @OneToOne(type => User)
    user: User

    @ManyToMany(type => User)
    likes: User[]

}
