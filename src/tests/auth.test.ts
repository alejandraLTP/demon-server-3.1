import { describe, expect, it } from "@jest/globals";
import request from "supertest";

import app from "../app";
import { hashPassword } from "../config/crypt";
import { AppDataSource } from "../config/ORMConfig";
import { DemonAuth } from "../Entities/demonAuth";

describe("Auth Controller", () => {
  beforeAll(async () => {
    const userRepository = AppDataSource.getRepository(DemonAuth);
    const hashedPassword = hashPassword("password123");
    await userRepository.save({
      username: "testuser",
      password: hashedPassword,
      num_empleado: "123",
    });
  });

  it("Debe autenticar un usuario", async () => {
    const response = await request(app)
      .post("/api/auth")
      .send({ username: "testuser", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("No debe autenticar un usuario con contraseña incorrecta", async () => {
    const response = await request(app)
      .post("/api/auth")
      .send({ username: "testuser", password: "wrongpassword" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("USUARIO_O_CONTRASENA_INVALIDOS");
  });
});
