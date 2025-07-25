import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;

    // validando se no header há um authorization
    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    // desestruturando para remover o 'Bearer'
    const [, token] = authHeader.split(" ");

    //desestruturando pra uso do 'verify' pra recuperar o token de usuário e recebendo 'as TokenPayload' para reconhecer a tipagem
    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secrets
    ) as TokenPayload;

    // anexa o objeto user dentro da request com id e role e retorna next() para seguir.
    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token", 401);
  }
}

export { ensureAuthenticated };
