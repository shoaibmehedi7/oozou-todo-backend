import { ToDo } from "./../../entities/ToDo";
import { getCustomRepository } from "typeorm";
import { ToDoService } from "./../services/ToDoService";
import Container, { Service } from "typedi";
import { Result } from "../../models/Result";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
import { ToDoRepository } from "../repositories/ToDoRepository";
import UpdateToDoRequest from "../requests/todo/UpdateToDoRequest";
import CustomError from "../../models/CustomError";
import GetByIdRequest from "../requests/todo/GetByIdRequest";
@Service()
export class ToDoServiceImpl implements ToDoService {

  protected toDoRepository = getCustomRepository(ToDoRepository);

  async createToDo(request: CreateToDoRequest): Promise<Result> {
    let todo = new ToDo();
    todo.title = request.title;
    let res = await this.toDoRepository.save(todo);
    return Result.succesful(res);
  }

  async updateToDo(request: UpdateToDoRequest): Promise<Result> {
    let todo = await this.toDoRepository.findOneOrFail(request.id);
    todo.status = request.status;
    let res = await this.toDoRepository.save(todo);
    return Result.succesful(res);
  }


  async getToDoWithSubTasks(request: GetByIdRequest): Promise<Result> {
    let response = await this.toDoRepository.findOneOrFail(request.id, { relations: ["subTasks"] });
    return Result.succesful(response);
  }

  async getToDos(): Promise<Result> {
    let response = await this.toDoRepository.find();
    return Result.succesful(response);
  }
}
