import { Request, Response, NextFunction } from "express";

// importando classe de AppError que indica que foi gerado uma excessão esperada
import { AppError } from "@/utils/AppError";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    // erro para tratamento sendo gerado pela instancia de AppError, lancado esperadamente
    return response.status(error.statusCode).json({ message: error.message });
  }

  // erro mais generico caso não seja uma instancia de AppError
  return response.status(500).json({ message: error.message });
}
