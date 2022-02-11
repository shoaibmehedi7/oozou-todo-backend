import {JsonController, Get, Res, Post, Body} from "routing-controllers";
import { Response} from 'express';
import "reflect-metadata";
import { SuccessResponse } from "../../models/SuccessResponse";
import CreateToDoRequest from "../requests/todo/CreateToDoRequest";
import { ToDoService } from "../services/ToDoService";
import Container from "typedi";
import { ToDoServiceImpl } from "../service-impl/ToDoServiceImpl";
import { OpenAPI } from "routing-controllers-openapi";
import UpdateToDoRequest from "../requests/todo/UpdateToDoRequest";
import GetByIdRequest from "../requests/todo/GetByIdRequest";
import { SubTaskServiceImpl } from "../service-impl/SubTaskServiceImpl";
import CreateSubTaskRequest from "../requests/subtask/CreateSubTaskRequest";
import UpdateSubTaskRequest from "../requests/subtask/UpdateSubTaskRequest";
import { SubTaskService } from "../services/SubTaskService";

@JsonController('/subtask')
export default class SubTaskController {
  public subTaskService: SubTaskService = Container.get(SubTaskServiceImpl);

  @Post("/create/")
  async create(@Body({ required: true }) request: CreateSubTaskRequest, @Res() response: Response) {
    const result = await this.subTaskService.createSubTask(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/update/")
  async update(@Body({ required: true }) request: UpdateSubTaskRequest, @Res() response: Response) {
    const result = await this.subTaskService.updateSubTask(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
  
}