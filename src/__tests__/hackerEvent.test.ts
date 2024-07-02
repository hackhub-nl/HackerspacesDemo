import supertest from "supertest";
import { app } from "../app";

describe("organizer", () => {
  describe("get hacker event route", () => {
    describe("given the hacker event does not exist", () => {
      it("should return a 404", async () => {
        const id = "000";

        await supertest(app).get(`/api/hackerevents/${id}`).expect(404);
      });
    });
  });

  describe("created hacker event route", () => {
    describe("given the user is not logged in", () => {
      it("should return 403", async () => {
        const { statusCode } = await supertest(app).post("/api/hackerevents");

        expect(statusCode).toBe(403);
      });
    });
  });
});
