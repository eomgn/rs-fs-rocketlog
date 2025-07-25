import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    // verificando se o usuário existe e está cadastrado
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    // verificando se a role do usuário que é existente (pois passou da validacao anterior)
    // tem role necessária para então estar realizando ações
    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next(); // next() para caso passar pelas validações
  };
}
