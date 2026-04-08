const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");
const fs = require("fs").promises;
const path = require("path");

const FILE = path.join(__dirname, "../data/questions_db.json");

describe("Questions API", () => {
  beforeEach(async () => {
    await fs.writeFile(FILE, JSON.stringify([]));
  });

  it("should create a new question", async () => {
    const res = await request(app)
      .post("/questions")
      .send({ qText: "What is JavaScript?" });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("qId");
    expect(res.body.qText).to.equal("What is JavaScript?");
  });

  it("should return 400 for empty question text", async () => {
    const res = await request(app).post("/questions").send({ qText: "" });

    expect(res.status).to.equal(400);
  });

  it("should get all questions", async () => {
    await request(app).post("/questions").send({ qText: "Question 1" });

    const res = await request(app).get("/questions");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
  });

  it("should get a question by ID", async () => {
    const setup = await request(app)
      .post("/questions")
      .send({ qText: "Target Question" });
    const id = setup.body.qId;

    const res = await request(app).get(`/questions/${id}`);

    expect(res.status).to.equal(200);
    expect(res.body.qId).to.equal(id);
  });

  it("should update a question", async () => {
    const setup = await request(app)
      .post("/questions")
      .send({ qText: "Old Text" });
    const id = setup.body.qId;

    const res = await request(app)
      .put(`/questions/${id}`)
      .send({ qText: "New Text" });

    expect(res.status).to.equal(200);
    expect(res.body.qText).to.equal("New Text");
  });

  it("should delete a question", async () => {
    const setup = await request(app)
      .post("/questions")
      .send({ qText: "To Delete" });
    const id = setup.body.qId;

    const deleteRes = await request(app).delete(`/questions/${id}`);
    expect(deleteRes.status).to.equal(200);

    const checkRes = await request(app).get(`/questions/${id}`);
    expect(checkRes.status).to.equal(404);
  });
});
