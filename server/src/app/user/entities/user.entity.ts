import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_profile")
export class User {

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

}