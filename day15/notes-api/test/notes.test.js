const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");
const fs = require("fs").promises;

const FILE = "./data/notes.json";

describe("Notes API Tests", () => {
  it("Test for successful GET /notes", async () => {
    const response = await request(app).get("/notes");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  it("Test for GET for a bad path", async () => {
    const response = await request(app).get("/bad-path");
    expect(response.status).to.equal(404);
  });

  it("Test for GET /notes/:id for non existent note", async () => {
    const response = await request(app).get(
      "/notes/" + Math.random() * (Date.now() - 1) + 1,
    );
    expect(response.status).to.equal(404);
  });

  it("Test for successful POST /notes", async () => {
    const response = await createPostRequest("Test", "Hello");

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("id");
    expect(response.body.title).to.equal("Test");
    expect(response.body.content).to.equal("Hello");
  });

  it("Test for POST /notes with empty title and content", async () => {
    const response = await createPostRequest("", "");

    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with no title", async () => {
    const response = await request(app)
      .post("/notes")
      .send({ content: "Content" });

    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with no content", async () => {
    const response = await request(app).post("/notes").send({ title: "Title" });

    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with neither title nor content", async () => {
    const response = await request(app).post("/notes").send({});

    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with blank title", async () => {
    const response = await createPostRequest("       ", "Task Content");
    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with blank content", async () => {
    const response = await createPostRequest("Task Title", "      ");
    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with blank title nor content", async () => {
    const response = await createPostRequest("         ", "        ");
    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with numeric title and content", async () => {
    const response = await createPostRequest(1, 1);
    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with numeric content", async () => {
    const response = await createPostRequest("Task Title", 1);
    expect(response.status).to.equal(400);
  });

  it("Test for POST /notes with numeric title", async () => {
    const response = await createPostRequest(1, "Task Content");
    expect(response.status).to.equal(400);
  });

  it("Test for successfull DELETE /notes/:id", async () => {
    const creationResponse = await request(app)
      .post("/notes")
      .send({ title: "Test Task 1", content: "Test Content" });
    const deletionResponse = await request(app).delete(
      "/notes/" + creationResponse.body.id,
    );
    expect(deletionResponse.status).to.equal(200);
  });

  it("Test for DELETE /notes/:id for non-existent id", async () => {
    const response = await request(app).delete(
      "/notes/" + Math.random() * (Date.now() - 1) + 1,
    );
    expect(response.status).to.equal(404);
  });
});
async function createPostRequest(title, content) {
  return await request(app).post("/notes").send({ title, content });
}
