const fs = require("fs").promises;
const FILE = "notes.json";

async function init() {
  try {
    await fs.access(FILE);
  } catch {
    await fs.writeFile(FILE, JSON.stringify([]));
  }
}

async function getNotes() {
  const data = await fs.readFile(FILE, "utf-8");
  return JSON.parse(data);
}

async function saveNotes(notes) {
  await fs.writeFile(FILE, JSON.stringify(notes, null, 2));
}

async function addNote(title, content) {
  if (!title || !title.trim()) {
    console.log(`Invalid Title
Usage: node app.js add "Title" "Content"`);
    return;
  }
  if (!content || !content.trim()) {
    console.log(`Invalid Content
Usage: node app.js add "Title" "Content"`);
    return;
  }
  const notes = await getNotes();
  const newNote = {
    id: Date.now(),
    title,
    content,
  };
  notes.push(newNote);
  await saveNotes(notes);

  displayLine("+", "=", "");
  displayLine("|", " ", "NOTE ADDED");
  displayLine("+", "=", "");
  displayNote(newNote);
  displayLine("+", "-", "");
}
function displayLine(extr, fill, msg) {
  console.log(extr + msg + fill.repeat(70 - msg.length) + extr);
}

function displayNote(note) {
  displayLine("|", " ", "");
  displayLine("|", " ", "===>|ID: " + note.id);
  displayLine("|", " ", "    |Title: " + note.title);
  displayLine("|", " ", "    |Content: " + note.content);
  displayLine("|", " ", "");
}

async function listNotes() {
  const notes = await getNotes();
  displayLine("+", "=", "");
  displayLine("|", " ", "NOTES");
  displayLine("+", "=", "");
  notes.map((note) => {
    displayNote(note);
  });
  displayLine("+", "=", "");
}

async function getNote(id) {
  const notes = await getNotes();
  const note = notes.find((n) => n.id == id);

  if (!note) return console.log("Note not found");
  displayLine("+", "=", "");
  displayLine("|", " ", "NOTE FOUND");
  displayLine("+", "=", "");
  displayNote(note);
  displayLine("+", "-", "");
}

async function updateNote(id, newContent) {
  if (!newContent || !newContent.trim()) {
    console.log(`Invalid Content
Usage: node app.js update <id> "New Content"`);
    return;
  }
  const notes = await getNotes();

  const updated = notes.map((n) =>
    n.id == id ? { ...n, content: newContent } : n,
  );

  await saveNotes(updated);
  console.log("Note updated");
}

async function deleteNote(id) {
  const notes = await getNotes();
  const filtered = notes.filter((n) => n.id != id);

  await saveNotes(filtered);
  console.log("Note deleted");
}

async function run() {
  await init();

  const [, , command, ...args] = process.argv;

  switch (command) {
    case "add":
      await addNote(args[0], args[1]);
      break;

    case "list":
      await listNotes();
      break;

    case "get":
      await getNote(args[0]);
      break;

    case "update":
      await updateNote(args[0], args[1]);
      break;

    case "delete":
      await deleteNote(args[0]);
      break;

    default:
      console.log(`\nUsage:
  node app.js add "Title" "Content"
  node app.js list
  node app.js get <id>
  node app.js update <id> "New Content"
  node app.js delete <id>\n`);
  }
}

run();
