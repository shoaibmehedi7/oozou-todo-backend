import { Status, ToDo } from "./../../entities/ToDo";
import { getCustomRepository } from "typeorm";
import { ToDoService } from "./../services/ToDoService";
import Container, { Service } from "typedi";
import { Result } from "../../models/Result";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
import { ToDoRepository } from "../repositories/ToDoRepository";
import UpdateToDoRequest from "../requests/todo/UpdateToDoRequest";
import CustomError from "../../models/CustomError";
import GetByIdRequest from "../requests/todo/GetByIdRequest";
import { ErrorMessages } from "../../constants/ErrorMessages";
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
    let todo = await this.toDoRepository.findOneOrFail(request.id, { relations: ["subTasks"] });
    if(todo.status === Status.COMPLETED) throw  new CustomError( 403 , ErrorMessages.COMPLETED_RESTRICTED);
    if(todo.status === Status.PENDING && request.status === Status.PENDING) throw  new CustomError( 403 , ErrorMessages.ALREADY_PENDING);
    todo.subTasks.forEach((subTask) => {
      subTask.status = Status.COMPLETED;
    });
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
