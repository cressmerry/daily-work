const { ulid } = require("ulid");
const fs = require("fs").promises;
const path = require("path");
const questionsService = require("./questionsService");

const FILE = path.join(__dirname, "../../data/submissions_db.json");

async function getSubmissions() {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    if (!data.trim()) return [];
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function validateAndSanitizeSubmissions(submissionArray) {
  const validQuestions = await questionsService.getQuestions();
  const validIds = new Set(validQuestions.map((q) => q.qId));

  return submissionArray.map((item) => {
    if (!validIds.has(item.qId)) {
      throw {
        statusCode: 400,
        message: `Invalid qId: ${item.qId}. Question does not exist.`,
      };
    }

    return {
      qId: item.qId,
      submission: item.submission,
    };
  });
}

async function createSubmission(submissionData) {
  const { submissions: submissionArray } = submissionData;
  if (!submissionArray || !Array.isArray(submissionArray)) {
    throw { statusCode: 400 };
  }

  const sanitizedSubmissions =
    await validateAndSanitizeSubmissions(submissionArray);

  const allSubmissions = await getSubmissions();
  const newEntry = {
    id: ulid(),
    submissions: sanitizedSubmissions,
  };

  allSubmissions.push(newEntry);
  await saveSubmissions(allSubmissions);
  return newEntry;
}

async function updateSubmission(id, updates) {
  const allSubmissions = await getSubmissions();
  const index = allSubmissions.findIndex((q) => q.id === id);
  if (index === -1) throw { statusCode: 404 };

  let finalSubmissions = allSubmissions[index].submissions;

  if (updates.submissions && Array.isArray(updates.submissions)) {
    finalSubmissions = await validateAndSanitizeSubmissions(
      updates.submissions,
    );
  }

  allSubmissions[index] = {
    id,
    submissions: finalSubmissions,
  };

  await saveSubmissions(allSubmissions);
  return allSubmissions[index];
}

async function getSubmissionById(id) {
  const allSubmissions = await getSubmissions();
  return allSubmissions.find((s) => s.id === id) || null;
}

async function deleteSubmission(id) {
  const allSubmissions = await getSubmissions();
  const filtered = allSubmissions.filter((s) => s.id !== id);
  if (filtered.length === allSubmissions.length) return false;
  await saveSubmissions(filtered);
  return true;
}

async function saveSubmissions(submissions) {
  await fs.writeFile(FILE, JSON.stringify(submissions, null, 2));
}

module.exports = {
  getSubmissions,
  createSubmission,
  deleteSubmission,
  updateSubmission,
  getSubmissionById
};
