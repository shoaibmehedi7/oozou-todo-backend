import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ToDo } from "./ToDo";

@Entity({ name : "SUB_TASK" })
export class SubTask extends BaseEntity{
    @Column({nullable: false })
    title: string;

    @Column({nullable: false })
    status: string;

    @ManyToOne(type => ToDo , toDo => toDo.subTask, {onDelete : 'CASCADE' } )
    toDo: any;
}




