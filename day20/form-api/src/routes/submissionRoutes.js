const express = require("express");
const router = express.Router();

const controller = require("../controllers/submissionController");
router.get("/", controller.getAllSubmissions);
router.get("/:id", controller.getSubmissionById);
router.post('/', controller.createSubmission);
router.delete('/:id', controller.deleteSubmission);
router.put('/:id', controller.updateSubmission);
module.exports = router;
