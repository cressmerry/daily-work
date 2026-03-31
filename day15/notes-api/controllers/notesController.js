const { request, response } = require("express");
const service = require("../services/notesService");

exports.getAllNotes = async (request, response) => {
  const notes = await service.getNotes();

  response.json(notes);
};

exports.getNoteById = async (request, response) => {
  const note = await service.getNoteById(request.params.id);
  if (!note) {
    return response.status(404).end();
  }
  return response.status(200).json(note);
};

exports.createNote = async (request, response) => {
  const body = request && request.body ? request.body : {};
  const titleRaw = body.title;
  const contentRaw = body.content;

  const title = typeof titleRaw === "string" ? titleRaw.trim() : "";
  const content = typeof contentRaw === "string" ? contentRaw.trim() : "";

  if (!title && !content) {
    return response.status(400).json({ error: "Title & content required" });
  }
  if (!title) {
    return response.status(400).json({ error: "Title required" });
  }
  if (!content) {
    return response.status(400).json({ error: "Content required" });
  }

  const newNote = await service.createNote(title, content);
  return response.status(201).json(newNote);
};

exports.deleteNote = async (request, response) => {
  const deletionSatus = await service.deleteNote(request.params.id);
  return deletionSatus
    ? response.status(200).end()
    : response.status(404).end();
};
