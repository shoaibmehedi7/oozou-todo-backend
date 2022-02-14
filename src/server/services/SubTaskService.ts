import { Result } from "../../models/Result";
import CreateSubTaskRequest from "../requests/subtask/CreateSubTaskRequest";
import UpdateSubTaskRequest from "../requests/subtask/UpdateSubTaskRequest";
import GetByIdRequest from "../requests/todo/GetByIdRequest";
export interface SubTaskService {
    getSubTasksByToDo: (request: GetByIdRequest) => Promise<Result>;
    createSubTask: (request: CreateSubTaskRequest) => Promise<Result>;
    updateSubTask: (request: UpdateSubTaskRequest) => Promise<Result>;
}
