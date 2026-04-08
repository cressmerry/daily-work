const fs = require("fs").promises;
const FILE = "./data/notes.json";

async function getNotes() {
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
}

  async function getNoteById(id) {
    const notes = await getNotes();
    return notes.find((note) => note.id == id);
  }

async function createNote(noteData) {
  const { title, content, completion_time, priority } = noteData;

  if (!title || !content || !completion_time || priority < 0 || priority > 30) {
    throw { statusCode: 400 };
  }

  const date = new Date(completion_time);
  if (isNaN(date.getTime()) || date < new Date()) {
    throw { statusCode: 400 };
  }

  const notes = await getNotes();
  const newNote = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim(),
    status: "created",
    created_at: new Date().toISOString(),
    completion_time,
    priority
  };

  notes.push(newNote);
  await saveNotes(notes);
  return newNote;
}

async function deleteNote(id) {
  const notes = await getNotes();
  const filtered = notes.filter((n) => n.id != id);
  if (filtered.length === notes.length) return false;
  await saveNotes(filtered);
  return true;
}

async function updateNote(id, updates) {
  const notes = await getNotes();
  const index = notes.findIndex((n) => n.id == id);
  if (index === -1) {
    throw { statusCode: 404 };
  }
  const existingNote = notes[index];
  if (existingNote.status === "closed") {
    throw { statusCode: 400 };
  }
  if ("created_at" in updates || "id" in updates) {
    throw { statusCode: 400 };
  }
  if (updates.status) {
    updates.status = updates.status.toLowerCase().trim();
  }
  notes[index] = { ...existingNote, ...updates };
  await saveNotes(notes);
  return notes[index];
}

async function saveNotes(notes) {
  await fs.writeFile(FILE, JSON.stringify(notes, null, 2));
}

module.exports = { getNotes, getNoteById, createNote, deleteNote, updateNote };
