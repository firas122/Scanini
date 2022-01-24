import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    userId: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column({ nullable: true })
    isSubscribed?: boolean;

    @Column({ nullable: true })
    password?: string
}