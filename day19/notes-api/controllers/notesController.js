const service = require("../services/notesService");

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await service.getNotes();
    res.json(notes);
  } catch (error) {
    res.status(500).end();
  }
};

exports.getNoteById = async (req, res) => {
  const note = await service.getNoteById(req.params.id);
  if (!note) return res.status(404).end();
  res.status(200).json(note);
};

exports.createNote = async (req, res) => {
  try {
    const newNote = await service.createNote(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(error.statusCode || 500).end();
  }
};

exports.deleteNote = async (req, res) => {
  const success = await service.deleteNote(req.params.id);
  success ? res.status(200).end() : res.status(404).end();
};

exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await service.updateNote(req.params.id, req.body);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(error.statusCode || 500).end();
  }
};