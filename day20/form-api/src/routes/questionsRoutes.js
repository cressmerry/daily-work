const express = require("express");
const router = express.Router();

const questionsController = require("../controllers/questionsController");

router.get("/", questionsController.getAllQuestions);
router.get("/:id", questionsController.getQuestionById);
router.post("/", questionsController.registerQuestion);
router.delete("/:id", questionsController.deleteQuestion);
router.put("/:id", questionsController.updateQuestion);
module.exports = router;
