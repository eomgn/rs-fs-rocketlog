import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import zod from "zod";

export class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const bodySchema = zod.object({
      delivery_id: zod.string().uuid(),
      description: zod.string(),
    });

    const { delivery_id, description } = bodySchema.parse(request.body);

    // recuperando delivery com id = o delivery_id passado em Delivery Logs
    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    });

    // condicional para verificar se o delivery existe
    if (!delivery) {
      throw new AppError("delivery not found", 404);
    }

    if (delivery?.status === "delivered") {
      throw new AppError("this order has already been delivered", 401);
    }

    // condicional para forçar o status a estar em 'processing'
    if (delivery.status === "processing") {
      throw new AppError("change status to shipped", 404);
    }

    // enviando log para o banco de dados com descrição e deliveryId
    await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.json();
  }

  async show(request: Request, response: Response) {
    const paramsSchema = zod.object({
      delivery_id: zod.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(request.params);

    const delivery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        // deliveryLogs: true,
        deliveryLogs: { select: { description: true, createdAt: true } }, // recuperando somente um dado especifico de logs
      },
    });

    if (request.user?.role === "customer" && delivery?.userId) {
      throw new AppError("the user can only view their deliveries", 401);
    }

    return response.json(delivery);
  }
}
