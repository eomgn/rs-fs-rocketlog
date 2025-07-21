import express from "express";

// importando express-async-errors
import "express-async-errors";

// importando error-handling
import { errorHandling } from "@/middlewares/error-handling";

const app = express();
app.use(express.json());

// utilizando error-handling
app.use(errorHandling);

export { app };
