import { describe, expect, it } from "@jest/globals";
import request from "supertest";

import { hashPassword } from "../config/crypt";
import { AppDataSource } from "../config/ORMConfig";
import { DemonAuth } from "../Entities/demonAuth";
import { app } from "../server";

describe("CRUD de operaciones en DemonAuth", () => {
  let userId: string;
  let URL = "/api/users";
  let respuesta: string;
  let commonHeaders = {};

  beforeAll(async () => {
    const userRepository = AppDataSource.getRepository(DemonAuth);
    const hashedPassword = hashPassword("password123");
    await userRepository.save({
      username: "testuser",
      password: hashedPassword,
      num_empleado: "123",
    });
    const response = await request(app)
      .post("/api/auth")
      .send({ username: "testuser", password: "password123" });

    respuesta = response.body.token;
    commonHeaders = {
      authorization: `Bearer ${respuesta}`,
    };
  });

  it("Debe crear un nuevo usuario", async () => {
    const response = await request(app).post(URL).set(commonHeaders).send({
      username: "newuser",
      num_empleado: "001",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.user).toBeDefined();
    userId = response.body.user.id;
  });

  it("Debe obtener todos los usuarios", async () => {
    const response = await request(app).get(URL).set(commonHeaders);

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBeGreaterThan(0);
  });

  it("Debe obtener un usuario por su ID", async () => {
    const response = await request(app)
      .get(`${URL}/${userId}`)
      .set(commonHeaders);

    expect(response.status).toBe(200);
    expect(response.body.user.id).toBe(userId);
  });

  it("Debe actualizar un usuario", async () => {
    const response = await request(app)
      .put(`${URL}/${userId}`)
      .send({ username: "updateduser" })
      .set(commonHeaders);

    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe("updateduser");
  });

  it("Debe eliminar un usuario", async () => {
    const response = await request(app)
      .delete(`${URL}/${userId}`)
      .set(commonHeaders);

    expect(response.status).toBe(200);
    expect(response.body.user).toBe(userId);
  });
});
