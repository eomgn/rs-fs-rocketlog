import { Router } from "express";

const routes = Router();

// importando arquivos de rotas
import { usersRoutes } from "@/routes/users-routes";

routes.use("/users", usersRoutes);

export { routes };
