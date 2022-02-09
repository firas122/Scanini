import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    userId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    picture: string;

    @Column({unique : true})
    email: string;

    @Column()
    age: number;

    @Column({ nullable: true })
    password?: string
}