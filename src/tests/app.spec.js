const request = require("supertest");
const { app } = require("../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("Obtener respuesta erronea al recurso de bienvenida", () => {
  test("Respuesta 404 estado de la peticios", async () => {
    const response = await request(app)
    .get("/")
    .send();
    expect(response.statusCode).toBe;
  });

  test("Respuesta error no existe token", async () => {
    const response = await request(app)
    .get("/")
    .send();
    expect(response.body.error).toBe("No existe token en la peticion");
  });

  test("Respuesta error token invalido", async () => {
    const response = await request(app)
      .get("/")
      .set({
        token: "token",
      })
      .send();

    expect(response.body.error).toBe("Token invalido");
  });
});

describe("Obtener respuestas exitosas de bienvenida", () => {
  test("Respuesta 200 al registrar un usuario", async () => {
    const response = await request(app)
    .post("/api/user/register")
    .send({
      name: "Test 1",
      email: "test@gmail.com",
      password: "isabelmaria",
    });
    expect(response.statusCode).toBe;
  });

  test("Verificacion usuario registrado", async () => {
    const response = await request(app)
    .post("/api/user/register")
    .send({
      name: "Test 1",
      email: "test@gmail.com",
      password: "password",
    });

    const { message, id } = response.body;

    if (message) {
      expect(message).toBe("Correo ya se encuentra registrado");
    } else {
      expect(_id).toBeDefined();
    }
  });
});
