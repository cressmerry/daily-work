const service = require("../services/questionsService");

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await service.getQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).end();
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await service.getQuestionById(req.params.id);
    if (!question) return res.status(404).end();
    res.status(200).json(question);
  } catch (error) {
    res.status(500).end();
  }
};

exports.registerQuestion = async (req, res) => {
  try {
    const newQuestion = await service.registerQuestion(req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(error.statusCode || 500).end();
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const success = await service.deleteQuestion(req.params.id);
    success
      ? res.status(200).end()
      : res.status(404).end();
  } catch (error) {
    res.status(500).end();
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const updatedQuestion = await service.updateQuestion(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(error.statusCode || 500).end();
  }
};
