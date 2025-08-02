import request from "supertest";

import { app } from "@/app";

describe("SessionsController", () => {
  it("should authenticate a and get access token", async () => {
    // criando um usuário
    const user = await request(app).post("/users").send({
      name: "Auth User Test",
      email: "authtestuser@email.com",
      password: "123456",
    });

    // criando sessão para verificar a atuenticacao
    const sessions = await request(app).post("/sessions").send({
      email: "authtestuser@email.com",
      password: "123456",
    });

    expect(sessions.status).toBe(200);
    expect(sessions.body.token).toEqual(expect.any(String)); //para verificar se o token é uma string
  });
});
