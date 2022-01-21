import ERROR_RESPONSES from "./errorReponses";
import supertest from "supertest";
import app from "./dev-server";
import NORMAL_RANGE_RESPONSE from "./db/normal-response.json";
import FIXED_RANGE_RESPONSE from "./db/fixed-response.json";

const request = supertest(app);

describe("Test endpoints", () => {
  afterAll((done) => {
    app.close();
    done();
  });

  it("should return [ 400 ] if no specific endpoint is requested with GET", async () => {
    const res = await request.get("/");

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual(ERROR_RESPONSES.error400.error);
    expect(res.body.message).toBe(ERROR_RESPONSES.error400.message);
    expect(res.body.success).toBe(false);
  });

  it("should return [ 204 ] on GET: /health", async () => {
    const res = await request.get("/health");

    expect(res.statusCode).toEqual(204);
  });

  it("should return [ 200 ] with a correct normal range json on GET: /normal-range", async () => {
    const res = await request.get("/normal-range");

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(NORMAL_RANGE_RESPONSE);
  });

  it("should return [ 200 ] with a correct fixed range json on GET: /fixed-range", async () => {
    const res = await request.get("/fixed-range");

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(FIXED_RANGE_RESPONSE);
  });

  it("should return [ 404 ] on GET to any other endpoints", async () => {
    const res1 = await request.get("/normal-range2");
    const res2 = await request.get("/healht");
    const res3 = await request.get("/anna");

    expect(res1.statusCode).toEqual(404);
    expect(res1.body.success).toBe(false);
    expect(res1.body.error).toEqual(ERROR_RESPONSES.error404.error);
    expect(res1.body.message).toEqual(ERROR_RESPONSES.error404.message);
    expect(res2.statusCode).toEqual(404);
    expect(res2.body.success).toBe(false);
    expect(res2.body.error).toEqual(ERROR_RESPONSES.error404.error);
    expect(res2.body.message).toEqual(ERROR_RESPONSES.error404.message);
    expect(res3.statusCode).toEqual(404);
    expect(res3.body.success).toBe(false);
    expect(res3.body.error).toEqual(ERROR_RESPONSES.error404.error);
    expect(res3.body.message).toEqual(ERROR_RESPONSES.error404.message);
  });

  it("should return [ 405 ] if POST method is used on request", async () => {
    const res = await request.post("/");
    const resHealth = await request.post("/health");
    const resNormal = await request.post("/normal-range");
    const resFixed = await request.post("/fixed-range");

    expect(res.statusCode).toEqual(405);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(res.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resHealth.statusCode).toEqual(405);
    expect(resHealth.body.success).toBe(false);
    expect(resHealth.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resHealth.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resNormal.statusCode).toEqual(405);
    expect(resNormal.body.success).toBe(false);
    expect(resNormal.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resNormal.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resFixed.statusCode).toEqual(405);
    expect(resFixed.body.success).toBe(false);
    expect(resFixed.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resFixed.body.message).toEqual(ERROR_RESPONSES.error405.message);
  });

  it("should return [ 405 ] if DELETE method is used on request", async () => {
    const res = await request.delete("/");
    const resHealth = await request.delete("/health");
    const resNormal = await request.delete("/normal-range");
    const resFixed = await request.delete("/fixed-range");

    expect(res.statusCode).toEqual(405);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(res.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resHealth.statusCode).toEqual(405);
    expect(resHealth.body.success).toBe(false);
    expect(resHealth.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resHealth.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resNormal.statusCode).toEqual(405);
    expect(resNormal.body.success).toBe(false);
    expect(resNormal.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resNormal.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resFixed.statusCode).toEqual(405);
    expect(resFixed.body.success).toBe(false);
    expect(resFixed.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resFixed.body.message).toEqual(ERROR_RESPONSES.error405.message);
  });

  it("should return [ 405 ] if PUT method is used on request", async () => {
    const res = await request.put("/");
    const resHealth = await request.put("/health");
    const resNormal = await request.put("/normal-range");
    const resFixed = await request.put("/fixed-range");

    expect(res.statusCode).toEqual(405);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(res.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resHealth.statusCode).toEqual(405);
    expect(resHealth.body.success).toBe(false);
    expect(resHealth.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resHealth.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resNormal.statusCode).toEqual(405);
    expect(resNormal.body.success).toBe(false);
    expect(resNormal.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resNormal.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resFixed.statusCode).toEqual(405);
    expect(resFixed.body.success).toBe(false);
    expect(resFixed.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resFixed.body.message).toEqual(ERROR_RESPONSES.error405.message);
  });

  it("should return [ 405 ] if PATCH method is used on request", async () => {
    const res = await request.patch("/");
    const resHealth = await request.patch("/health");
    const resNormal = await request.patch("/normal-range");
    const resFixed = await request.patch("/fixed-range");

    expect(res.statusCode).toEqual(405);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(res.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resHealth.statusCode).toEqual(405);
    expect(resHealth.body.success).toBe(false);
    expect(resHealth.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resHealth.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resNormal.statusCode).toEqual(405);
    expect(resNormal.body.success).toBe(false);
    expect(resNormal.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resNormal.body.message).toEqual(ERROR_RESPONSES.error405.message);
    expect(resFixed.statusCode).toEqual(405);
    expect(resFixed.body.success).toBe(false);
    expect(resFixed.body.error).toEqual(ERROR_RESPONSES.error405.error);
    expect(resFixed.body.message).toEqual(ERROR_RESPONSES.error405.message);
  });
});
