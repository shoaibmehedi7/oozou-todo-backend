import express from "express";
import logger from "morgan";
import "reflect-metadata";
import { getMetadataArgsStorage, useExpressServer } from "routing-controllers";
import { CustomErrorHandler } from "./middlewares/CustomErrorHandler";
import "reflect-metadata";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { routingControllersToSpec } from "routing-controllers-openapi";
import * as swaggerUiExpress from "swagger-ui-express";
import config from "./config/index";
import HealthCheckController from "./server/controllers/HealthCheckController";
import ToDoController from "./server/controllers/ToDoController";

export default class App {
  public app: express.Application;
  public port = config.applicationPort;

  constructor() {
    this.app = express();
    this.app.use(logger("dev"));
    const routingControllersOptions = {
      routePrefix: "/api/v1",
      defaultErrorHandler: false,
      classTransformer: true,
      cors: true,
      validation: { skipMissingProperties: true },
      controllers: [HealthCheckController,ToDoController],
      middlewares: [CustomErrorHandler]
    };
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: "#/components/schemas/",
    });

    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
        securitySchemes: {
          basicAuth: {
            scheme: "basic",
            type: "http",
          },
        },
      },
      info: {
        description: "Generated with `routing-controllers-openapi`",
        title: "OOZOU TODO API",
        version: "1.0.0",
      },
    });
    useExpressServer(this.app, routingControllersOptions);
    this.app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
    this.app.get("/", (_req, res) => {
      res.json(spec);
    });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
