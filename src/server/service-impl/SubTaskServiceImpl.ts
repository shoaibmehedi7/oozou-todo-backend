import { ToDo } from "../../entities/ToDo";
import { getCustomRepository } from "typeorm";
import Container, { Service } from "typedi";
import { Result } from "../../models/Result";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
import { ToDoRepository } from "../repositories/ToDoRepository";
import UpdateToDoRequest from "../requests/todo/UpdateToDoRequest";
import { SubTaskService } from "../services/SubTaskService";
import { SubTaskRepository } from "../repositories/SubTaskRepository";
import { Status, SubTask } from "../../entities/SubTask";
import CreateSubTaskRequest from "../requests/subtask/CreateSubTaskRequest";
@Service()
export class SubTaskServiceImpl implements SubTaskService {
  protected subTaskRepository = getCustomRepository(SubTaskRepository);
  protected toDoRepository = getCustomRepository(ToDoRepository);

  async createSubTask(request: CreateSubTaskRequest): Promise<Result> {
    let subTask = new SubTask();
    subTask.title = request.title;
    let toDo = await this.toDoRepository.findOneOrFail(request.todo_id);
    subTask.toDo = toDo;

    let res = await this.subTaskRepository.save(subTask);
    return Result.succesful(res);
  }

  async updateSubTask(request: UpdateToDoRequest): Promise<Result> {
    let subTask = await this.subTaskRepository.findOneOrFail(request.id);
    subTask.status = request.status;
    let res = await this.subTaskRepository.save(subTask);

    let toDo = await this.subTaskRepository.findOneOrFail(res.id, {
      relations: ["toDo", "toDo.subTasks"],
    });
    let subtasks = toDo.toDo.subTasks;

    const counts = {
      completed: 0,
      pending: 0,
    };

    for (const num of subtasks) {
      console.log(num);
      if (num.status === "completed") {
        counts.completed++;
      } else {
        counts.pending++;
      }
    }

    // checking if all the subtasks are completed then the todo is completed too
    if (counts.completed === subtasks.length) {
      toDo.toDo.status = Status.COMPLETED;
      await this.toDoRepository.save(toDo.toDo);
    }
    // if one of the subtasks is pending from completed then the todo is pending from completed
    if (
      counts.completed === subtasks.length - 1 &&
      request.status === Status.PENDING
    ) {
      toDo.toDo.status = Status.PENDING;
      await this.toDoRepository.save(toDo.toDo);
    }
    console.log(counts);

    return Result.succesful(res);
  }
}
