const express = require("express");
const router = express.Router();

const controller = require("../controllers/notesController");
router.get("/", controller.getAllNotes);
router.get("/:id", controller.getNoteById);
router.post('/', controller.createNote);
router.delete('/:id', controller.deleteNote);
router.put('/:id', controller.updateNote);
module.exports = router;
