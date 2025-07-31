import request from "supertest";

import { app } from "@/app";

describe("UsersController", () => {
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
  });
});
