import { Router } from "express";

const deliveriesRoutes = Router();

// importando e utilizando controller
import { DeliveriesController } from "@/controllers/deliveries-controller";
const deliveriesController = new DeliveriesController();

// importando middleware
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

// aplicando o middleware a todas as rotas
deliveriesRoutes.use(ensureAuthenticated);

// rotas
deliveriesRoutes.post("/", deliveriesController.create);

export { deliveriesRoutes };
