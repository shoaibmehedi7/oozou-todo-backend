import { SubTask } from "./SubTask";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export enum Status {
  PENDING = "pending",
  COMPLETED = "completed"
}
@Entity({ name: "TO_DO" })
export class ToDo extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: string;

  @OneToMany((type) => SubTask, (subTask) => subTask.toDo, {
    eager: false,
    cascade: true,
  })
  subTasks: SubTask[];
}
