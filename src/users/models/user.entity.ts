import { Column, Entity, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
    
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn({unique:true})
    userId: string;

    @Column()
    firstName: string;

    @Column({ nullable: true})
    lastName: string;

    @Column({ nullable: true})
    picture: string;

    @Column({unique : true})
    email: string;

    @Column({ nullable: true})
    age: number;

    @Column()
    password?: string

    @Column({ nullable: true})
    accessToken: string;


    @Column({ unique: false,array:true,default:[]})
    scantrack: [string];

    @Column({ unique: false,array:true,default:[[]]})
    cards: [string[]];
}