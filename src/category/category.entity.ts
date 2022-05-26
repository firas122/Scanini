import { type } from "os";
import { product } from "src/product/product.entity";
import { productType } from "src/product/product.type";
import { Column, Entity, JoinTable, ObjectIdColumn, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class category{
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn({unique : true})
    id: string

    @Column({unique : true})
	name: string

    @Column()
	description: string

   
    @Column()
	createdAt: string

    @Column()
	updatedAt: string

    @Column()
	deletedAt: string

    @OneToMany(() => product,product => product._id)
    @JoinTable()
	products: product[]

}