import { Request, Response } from "express";
import { prisma } from '@/database/prisma'
import zod from 'zod'

export class DeliveriesController {
  async create(request: Request, response: Response) {
    const bodySchema = zod.object({
      user_id: zod.string().uuid(),
      description: zod.string()
    })

    const { user_id, description } = await bodySchema.parse(request.body)

    await prisma.delivery.create({
      data: {
        userId: user_id,
        description
      }}
    )

    return response.status(201).json();
  }
}
