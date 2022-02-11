import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { ToDo } from "./ToDo";

export enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
}
@Entity({ name: "SUB_TASK" })
export class SubTask extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: string;

  @ManyToOne((type) => ToDo, (toDo) => toDo.subTasks, {
    eager: false,
    onDelete: "CASCADE",
  })
  toDo: ToDo;
}
