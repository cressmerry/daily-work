const service = require("../services/submissionService");

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await service.getSubmissions();
    res.json(submissions);
  } catch (error) {
    res.status(500).end();
  }
};

exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await service.getSubmissionById(req.params.id);
    if (!submission)
      return res.status(404).end();
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).end();
  }
};

exports.createSubmission = async (req, res) => {
  try {
    const newSubmission = await service.createSubmission(req.body);
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(error.statusCode || 500).end();
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const success = await service.deleteSubmission(req.params.id);
    success
      ? res.status(200).end()
      : res.status(404).end();
  } catch (error) {
    res.status(500).end();
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const updatedSubmission = await service.updateSubmission(
      req.params.id,
      req.body,
    );
    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(error.statusCode || 500).end();
  }
};
