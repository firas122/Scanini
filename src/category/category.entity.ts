import { type } from "os";
import { product } from "src/product/product.entity";
import { productType } from "src/product/product.type";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, ObjectIdColumn, OneToMany, PrimaryColumn, Tree, TreeChildren, TreeParent } from "typeorm";

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

    @Column()
	products: string[]

   @ManyToOne(type => category,category =>category.children,{nullable:true})
   parent : category

   @OneToMany(type => category,category =>category.parent,{nullable:true})
   children : category[]
}