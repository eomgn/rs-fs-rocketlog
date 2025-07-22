import { Router } from "express";

const usersRoutes = Router();

// importando e utilizando controller
import { UsersController } from "@/controllers/users-controller";
const usersController = new UsersController();

// rotas
usersRoutes.post("/", usersController.create);

export { usersRoutes };
