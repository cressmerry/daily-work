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
  if (notes.findIndex(n => n.id == id) == -1) {
    return false;
  }
  const filtered = notes.filter((n) => n.id != id);
  await saveNotes(filtered);
  return true;
}

module.exports = { getNotes, getNoteById, createNote, deleteNote };
