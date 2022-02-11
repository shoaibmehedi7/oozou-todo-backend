import { Result } from "../../models/Result";
import CreateSubTaskRequest from "../requests/subtask/CreateSubTaskRequest";
import UpdateSubTaskRequest from "../requests/subtask/UpdateSubTaskRequest";
export interface SubTaskService {
    createSubTask: (request: CreateSubTaskRequest) => Promise<Result>;
    updateSubTask: (request: UpdateSubTaskRequest) => Promise<Result>;
}
