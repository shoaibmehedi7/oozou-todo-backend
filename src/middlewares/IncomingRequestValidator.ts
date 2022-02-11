import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";

@Middleware({ type: "before" })
export class IncomingRequestValidator implements ExpressMiddlewareInterface {
  use(req: any, response: any, next: (err?: any) => any): void {
    // logger can be implemented here
    next();
  }
}
