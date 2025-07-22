import { Request, Response, NextFunction } from "express";

// importando classe de AppError que indica que foi gerado uma excessão esperada
import { AppError } from "@/utils/AppError";

// import classe ZodError para tratamento de validação
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // tratamento de excessão
  if (error instanceof AppError) {
    // erro para tratamento sendo gerado pela instancia de AppError, lancado esperadamente
    return response.status(error.statusCode).json({ message: error.message });
  }

  // tratamento de validação
  if (error instanceof ZodError) {
    // erro gerado no tratamento de validação
    return response
      .status(400)
      .json({ message: "validation error", issues: error.format() });
  }

  // erro mais generico caso não seja uma instancia de AppError
  return response.status(500).json({ message: error.message });
}
