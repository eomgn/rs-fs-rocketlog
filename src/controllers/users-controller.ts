import { Request, Response } from "express";

export class UsersController {
  create(request: Request, response: Response) {
    return response.status(200).json({ message: "API ok!" });
  }
}
