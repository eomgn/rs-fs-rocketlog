import { Router } from "express";

const sessionsRoutes = Router();

// importando e utilizando controller
import { SessionsController } from "@/controllers/sessions-controller";
const sessionsController = new SessionsController();

sessionsRoutes.post("/", sessionsController.create);

export { sessionsRoutes };
