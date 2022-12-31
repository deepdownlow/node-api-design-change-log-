import app from "../../server";
import request from "supertest";

describe("/user", () => {
  it("should return 400 if password is missing", async () => {
    const res = await request(app)
      .post("/user")
      .send({ username: "hello" })
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(400);
  });

  it("should return 400 if username is missing", async () => {
    const res = await request(app)
      .post("/user")
      .send({ password: "password" })
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toBe(400);
  });
});
