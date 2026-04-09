const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");
const fs = require("fs").promises;
const path = require("path");

const SUB_FILE = path.join(__dirname, "../data/submissions_db.json");
const Q_FILE = path.join(__dirname, "../data/questions_db.json");

describe("Submissions API", () => {
  let activeQId;

  beforeEach(async () => {
    await fs.writeFile(SUB_FILE, JSON.stringify([]));
    await fs.writeFile(Q_FILE, JSON.stringify([]));

    const qRes = await request(app)
      .post("/questions")
      .send({ qText: "Context Question" });
    activeQId = qRes.body.qId;
  });

  it("should create a submission with valid question IDs", async () => {
    const payload = {
      submissions: [{ qId: activeQId, submission: "Isolated Answer" }],
    };

    const res = await request(app).post("/submissions").send(payload);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
  });

  it("should fail if qId does not exist", async () => {
    const payload = {
      submissions: [{ qId: "invalid_id", submission: "Error expected" }],
    };

    const res = await request(app).post("/submissions").send(payload);

    expect(res.status).to.equal(400);
  });

  it("should retrieve a submission by ID", async () => {
    const setup = await request(app)
      .post("/submissions")
      .send({ submissions: [{ qId: activeQId, submission: "Test Get" }] });
    const subId = setup.body.id;

    const res = await request(app).get(`/submissions/${subId}`);

    expect(res.status).to.equal(200);
    expect(res.body.id).to.equal(subId);
  });

  it("should update an existing submission", async () => {
    const setup = await request(app)
      .post("/submissions")
      .send({ submissions: [{ qId: activeQId, submission: "Original" }] });
    const subId = setup.body.id;

    const res = await request(app)
      .put(`/submissions/${subId}`)
      .send({ submissions: [{ qId: activeQId, submission: "Updated" }] });

    expect(res.status).to.equal(200);
    expect(res.body.submissions[0].submission).to.equal("Updated");
  });

  it("should delete a submission", async () => {
    const setup = await request(app)
      .post("/submissions")
      .send({ submissions: [{ qId: activeQId, submission: "Delete" }] });
    const subId = setup.body.id;

    const res = await request(app).delete(`/submissions/${subId}`);
    expect(res.status).to.equal(200);

    const checkRes = await request(app).get(`/submissions/${subId}`);
    expect(checkRes.status).to.equal(404);
  });
});
