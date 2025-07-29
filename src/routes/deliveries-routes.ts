import { Router } from "express";

const deliveriesRoutes = Router();

// importando e utilizando controller
import { DeliveriesController } from "@/controllers/deliveries-controller";
const deliveriesController = new DeliveriesController();

import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";
const deliveriesStatusController = new DeliveriesStatusController();

// importando middleware
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

// aplicando o middleware a todas as rotas
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));

// rotas
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);

export { deliveriesRoutes };
