import { Result } from "../../models/Result";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
import GetByIdRequest from "../requests/todo/GetByIdRequest";
import UpdateToDoRequest from "../requests/todo/UpdateToDoRequest";
export interface ToDoService {
    getToDos: () => Promise<Result>;
    getToDoWithSubTasks: (request: GetByIdRequest) => Promise<Result>;
    createToDo: (request: CreateToDoRequest) => Promise<Result>;
    updateToDo: (request: UpdateToDoRequest) => Promise<Result>;
}