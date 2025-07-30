import { Router } from "express";

const deliveryLogsRoutes = Router();

// importando e utilizando controller
import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
const deliveryLogsController = new DeliveryLogsController();

// importando middleware
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

// rotas
deliveryLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
);

deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveryLogsController.show
);

export { deliveryLogsRoutes };
