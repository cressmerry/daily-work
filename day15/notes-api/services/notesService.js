const fs = require("fs").promises;

const FILE = "./data/notes.json";
async function getNotes() {
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
}

async function getNoteById(id) {
  const notes = await getNotes();
  const note = notes.find((note) => note.id == id);
  return note;
}

async function createNote(title, content) {
  const notes = await getNotes();
  const newNote = {
    id: Date.now(),
    title,
    content,
    status: "created",
    createdAt: new Date().toISOString(),
  };

  notes.push(newNote);
  await saveNotes(notes);
  return newNote;
}

async function saveNotes(notes) {
  await fs.writeFile(FILE, JSON.stringify(notes, null, 2));
}

async function deleteNote(id) {
  const notes = await getNotes();
  const initialLength = notes.length;
  const filtered = notes.filter((n) => n.id != id);
  if (filtered.length === initialLength) return false;
  await saveNotes(filtered);
  return true;
}

async function updateNote(id, updates) {
  const notes = await getNotes();
  const index = notes.findIndex((n) => n.id == id);
  if (index === -1) {
    return { statusCode: 404, msg: "Note not found" };
  }
  const validationError = validateUpdate(notes[index], updates);
  if (validationError) return validationError;
  if (updates.status) updates.status = updates.status.toLowerCase().trim();
  notes[index] = { ...notes[index], ...updates };
  await saveNotes(notes);
  return { statusCode: 200, data: notes[index] };
}

function validateUpdate(existingNote, updates) {
  if (existingNote.status === "closed") {
    return { statusCode: 400, msg: "Cannot update a closed note" };
  }
  if ("createdAt" in updates || "id" in updates) {
    return {
      statusCode: 400,
      msg: "Cannot update createdAt field",
    };
  }
  return null;
}

module.exports = { getNotes, getNoteById, createNote, deleteNote, updateNote };
