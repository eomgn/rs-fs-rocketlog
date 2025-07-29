import { Router } from "express";

const routes = Router();

// importando arquivos de rotas
import { usersRoutes } from "@/routes/users-routes";
import { sessionsRoutes } from "@/routes/sessions-routes";
import { deliveriesRoutes } from "@/routes/deliveries-routes";
import { deliveryLogsRoutes } from "@/routes/delivery-logs-routes";

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/deliveries", deliveriesRoutes);
routes.use("/delivery-logs", deliveryLogsRoutes);

export { routes };
