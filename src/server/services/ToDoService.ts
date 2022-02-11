import { Result } from "../../models/Result";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
import UpdateToDoRequest from "../requests/todo/UpdateToDoRequest";
export interface ToDoService {
    getToDos: () => Promise<Result>;
    createToDo: (request: CreateToDoRequest) => Promise<Result>;
    updateToDo: (request: UpdateToDoRequest) => Promise<Result>;
}