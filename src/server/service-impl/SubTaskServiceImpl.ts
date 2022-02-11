import { ToDo } from "../../entities/ToDo";
import { getCustomRepository } from "typeorm";
import Container, { Service } from "typedi";
import { Result } from "../../models/Result";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
import { ToDoRepository } from "../repositories/ToDoRepository";
import UpdateToDoRequest from "../requests/todo/UpdateToDoRequest";
import { SubTaskService } from "../services/SubTaskService";
import { SubTaskRepository } from "../repositories/SubTaskRepository";
import { SubTask } from "../../entities/SubTask";
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
    return Result.succesful(res);
  }
}
