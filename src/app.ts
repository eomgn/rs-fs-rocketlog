import express from "express";

// importando express-async-errors
import "express-async-errors";

// importando arquivo de rotas
import { routes } from "@/routes/index";

// importando error-handling
import { errorHandling } from "@/middlewares/error-handling";

const app = express();
app.use(express.json());

// utilizando arquvoi de rotas
app.use(routes);

// utilizando error-handling
app.use(errorHandling);

export { app };
