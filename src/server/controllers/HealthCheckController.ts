import {JsonController, Get, Res} from "routing-controllers";
import { Response} from 'express';
import "reflect-metadata";

@JsonController()
export default class HealthCheckController {



  @Get("/checkHealth/")
  async checkHealth( @Res() response: Response) {
    return response
        .status(200)
        .send("Service is up and running");
  }
}