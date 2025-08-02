import request from "supertest";

import { prisma } from "@/database/prisma";

import { app } from "@/app";

describe("UsersController", () => {
  let user_id: string;

  // método a ser executado após o teste
  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  // criando teste
  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "testuser@email.com",
      password: "123456",
    });

    expect(response.status).toBe(201); // verificando se retorna status "201"
    expect(response.body).toHaveProperty("id"); // verificando se há a propriedade "id"
    expect(response.body.name).toBe("Test User"); // verificando se o .name é exatamente "Test User"

    // capturando 'id' e passando para a variável 'user_id'
    user_id = response.body.id;
  });
});
