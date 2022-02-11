import { getCustomRepository } from 'typeorm';
import { ToDoService } from './../services/ToDoService';
import Container, {Service} from "typedi";
import {Result} from "../../models/Result";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
import { ToDoRepository } from '../repositories/ToDoRepository';
@Service()
export class ToDoServiceImpl implements ToDoService{
protected toDoRepository = getCustomRepository(ToDoRepository)
    async createToDo(request: CreateToDoRequest): Promise<Result> {
        return Result.succesful();
    }
    async getToDos(): Promise<Result> {
        let response = this.toDoRepository.find();
        return Result.succesful(response);
    }

}
