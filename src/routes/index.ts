import { Router } from "express";

const routes = Router();

// importando arquivos de rotas
import { usersRoutes } from "@/routes/users-routes";
import { sessionsRoutes } from "@/routes/sessions-routes";
import { deliveriesRoutes } from "@/routes/deliveries-routes";

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/deliveries", deliveriesRoutes);

export { routes };
