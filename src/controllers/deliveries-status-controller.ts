import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import zod, { string } from "zod";

export class DeliveriesStatusController {
  async update(request: Request, response: Response) {
    // schema para validar a captura do id do usuário
    const paramsSchema = zod.object({
      id: string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    // schema para validar o status a ser passado
    const bodySchema = zod.object({
      status: zod.enum(["processing", "shipped", "delivered"]),
    });

    const { status } = bodySchema.parse(request.body);

    // atualizando bando de dados
    await prisma.delivery.update({
      data: {
        status: status,
      },
      where: { id },
    });

    return response.json();
  }
}
