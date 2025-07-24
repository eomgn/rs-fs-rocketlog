import { Request, Response } from "express";
import zod from "zod";
import { prisma } from "@/database/prisma"; // import PRISMA de database
import { compare } from "bcrypt";
import { AppError } from "@/utils/AppError";

export class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = zod.object({
      email: zod.string().email(),
      password: zod.string().min(6),
    });

    // desestruturando bodySchema
    const { email, password } = bodySchema.parse(request.body);

    // recuperando 'user' pelo primeiro 'email' encontrado do que foi passado
    const user = await prisma.user.findFirst({ where: { email } });

    // validando se o 'user' existe pelo e-mail passado e se não retornar uma uma excessão
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // utilizando o 'compare' do 'bcrypt' para comparar a senha passada com a que há no BD através de 'user'
    const passwordMatched = await compare(password, user.password);

    // validando se o 'password' passado é valido e par do 'email' e se não retornar uma uma excessão
    if (!passwordMatched) {
      throw new AppError("Invalid email or password", 401);
    }

    return response.json({ message: "ok sessions" });
  }
}
