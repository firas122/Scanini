import { category } from "src/category/category.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class product{
    @ObjectIdColumn()
    _id: string

    @PrimaryColumn()
    id: string

    @Column()
	name: string

    @Column()
	description: string

    @Column()
	qrCode: string

    @Column()
	barCode: string

    @Column()
	isdeleted: boolean

    @Column()
	ispublished: boolean

    @Column()
	country: string

    @Column()
	manufacter: string

    @Column()
	restrictedcountries: string[]

    @Column()
	pictureURL: string

    @Column()
	createdAt: string

    @Column()
	updatedAt: string

    @Column()
	deletedAt: string

    @ManyToOne(() => category,category => category.products)
	category: category

    @Column()
	categoryId: string

    @Column()
	categoryname: string

}