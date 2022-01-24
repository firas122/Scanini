import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class langs{
    @ObjectIdColumn()
    _id: string

    @Column()
	fr: string

    @Column()
	en: string

   
    @Column()
	ar: string
}