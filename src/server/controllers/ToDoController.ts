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

@JsonController('/todo')
export default class ToDoController {
  public todoService: ToDoService = Container.get(ToDoServiceImpl);


  @OpenAPI({ summary: 'GetAll todo' })
  @Get("/getAll/")
  async checkHealth( @Res() response: Response) {
    const result = await this.todoService.getToDos();
    return response.json(new SuccessResponse(result.getValue()));

  }

  @Post("/create/")
  async create(@Body({ required: true }) request: CreateToDoRequest, @Res() response: Response) {
    const result = await this.todoService.createToDo(request);
    return response.json(new SuccessResponse(result.getValue()));
  }

  @Post("/update/")
  async update(@Body({ required: true }) request: UpdateToDoRequest, @Res() response: Response) {
    const result = await this.todoService.updateToDo(request);
    return response.json(new SuccessResponse(result.getValue()));
  }
}