const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");
const fs = require("fs").promises;

const FILE = "./data/notes.json";

describe("Notes API Tests", () => {
  it("Test for successful GET /notes", async () => {
    const response = await createGetRequest("/notes");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  it("Test for GET for a bad path", async () => {
    const response = await createGetRequest("/bad-path");
    expect(response.status).to.equal(404);
  });

  it("Test for GET /notes/:id for non existent note", async () => {
    const response = await createGetRequest(
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

  it("Test for DELETE /notes/:id without passing an id", async () => {
    const response = await request(app).delete("/notes/");
    expect(response.status).to.equal(404);
  });

  it("Test for successfull PUT /notes/:id", async () => {
    const creationResponse = await createPostRequest(
      "Test Task 1",
      "Test Content",
    );
    const updationResponse = await createPutRequest(
      "/notes/" + creationResponse.body.id,
      { status: "closed" },
    );
    expect(updationResponse.status).to.equal(200);
    const getResponse = await createGetRequest(
      "/notes/" + creationResponse.body.id,
    );
    expect(getResponse.body.status).to.equal("closed");
  });

  it("Test for PUT /notes/:id for non-existent id", async () => {
    const updationResponse = await createPutRequest(
      "/notes/" + Math.random() * (Date.now() - 1) + 1,
      { status: "closed" },
    );
    expect(updationResponse.status).to.equal(404);
  });

  it("Test for PUT /notes/:id passed with no id", async () => {
    const updationResponse = await createPutRequest("/notes/", {
      status: "closed",
    });
    expect(updationResponse.status).to.equal(404);
  });

  it("Test for PUT /notes/:id trying to set status: 'created'", async () => {
    const creationResponse = await createPostRequest(
      "Test Task 1",
      "Test Content",
    );
    let updationResponse = await createPutRequest(
      "/notes/" + creationResponse.body.id,
      { status: "closed" },
    );

    updationResponse = await createPutRequest(
      "/notes/" + creationResponse.body.id,
      { status: "created" },
    );

    expect(updationResponse.status).to.equal(400);
    expect(updationResponse.body.error).to.equal("Cannot update a closed note");
    const getResponse = await createGetRequest(
      "/notes/" + creationResponse.body.id,
    );
    expect(getResponse.body.status).to.equal("closed");
  });

  it("Test for PUT /notes/:id trying to update createdAt field", async () => {
    const creationResponse = await createPostRequest(
      "Test Task 1",
      "Test Content",
    );
    const updationResponse = await createPutRequest(
      "/notes/" + creationResponse.body.id,
      { createdAt: new Date().toISOString() },
    );
    expect(updationResponse.status).to.equal(400);
    expect(updationResponse.body.error).to.equal(
      "Cannot update createdAt field",
    );
  });
});

async function createPutRequest(path, body) {
  return await request(app).put(path).send(body);
}

async function createGetRequest(path) {
  return await request(app).get(path);
}

async function createPostRequest(title, content) {
  return await request(app).post("/notes").send({ title, content });
}
