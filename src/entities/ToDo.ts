import { SubTask } from './SubTask';
import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity({ name: "TO_DO" })
export class ToDo extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  status: string;

  @OneToMany(
    (type) => SubTask,
    (subTask) => subTask.toDo,
    {
      eager: false,
      cascade: true,
    }
  )
  subTask: SubTask[];
}
