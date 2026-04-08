const { customAlphabet } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const FILE = path.join(__dirname, "../../data/questions_db.json");
const generateId = customAlphabet("0123456789", 10);

async function getQuestions() {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    if (!data.trim()) return [];
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function getQuestionById(qId) {
  const questions = await getQuestions();
  return questions.find((q) => q.qId === qId);
}

async function registerQuestion(questionData) {
  const { qText } = questionData;
  if (!qText || typeof qText !== "string" || !qText.trim()) {
    throw { statusCode: 400 };
  }

  const questions = await getQuestions();
  const newQuestion = {
    qId: generateId(),
    qText: qText.trim(),
  };

  questions.push(newQuestion);
  await saveQuestions(questions);
  return newQuestion;
}

async function updateQuestion(qId, updates) {
  const questions = await getQuestions();
  const index = questions.findIndex((q) => q.qId === qId);
  if (index === -1) throw { statusCode: 404 };

  const sanitizedText =
    updates.qText && typeof updates.qText === "string"
      ? updates.qText.trim()
      : questions[index].qText;

  questions[index] = {
    qId,
    qText: sanitizedText,
  };

  await saveQuestions(questions);
  return questions[index];
}

async function deleteQuestion(qId) {
  const questions = await getQuestions();
  const filtered = questions.filter((q) => q.qId !== qId);
  if (filtered.length === questions.length) return false;

  await saveQuestions(filtered);
  return true;
}

async function saveQuestions(questions) {
  await fs.writeFile(FILE, JSON.stringify(questions, null, 2));
}

module.exports = {
  getQuestions,
  getQuestionById,
  registerQuestion,
  deleteQuestion,
  updateQuestion,
};
