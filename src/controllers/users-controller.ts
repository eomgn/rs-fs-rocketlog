import { Request, Response } from "express";

// import PRISMA da pasta database
import { prisma } from "@/database/prisma";

// import BCRYPT
import { hash } from "bcrypt";

// import ZOD
import zod from "zod";

// import APPERROR
import { AppError } from "@/utils/AppError";

export class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = zod.object({
      name: zod.string().trim().min(3),
      email: zod.string().email(),
      password: zod.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    // recuperando primeiro 'email' encontrado do que foi passado
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    // agora verificando se o 'email' ja existe no banco e se sim retornar uma excessão
    if (userWithSameEmail) {
      throw new AppError("User with the same email already exists");
    }

    // criptografia password
    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // userWhitoutPassword = USUÁRIO SEM A SENHA --> o SPREAD OPERATOR é para retornar os demais dados
    const { password: _, ...userWhitoutPassword } = user;

    return response.json(userWhitoutPassword);
  }
}
