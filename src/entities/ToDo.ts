import { Column, Entity } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name : "TO_DO" })
export class ToDo extends BaseEntity{
    @Column({nullable: false })
    title: string;
}




