import { Result } from "../../models/Result";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
export interface ToDoService {
    getToDos: () => Promise<Result>;
    createToDo: (request: CreateToDoRequest) => Promise<Result>;
}