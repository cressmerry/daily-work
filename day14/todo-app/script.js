let errorDiv;
let sortInfo = { sortOrder: 1, sorted: false };
let todos = JSON.parse(localStorage.getItem("todos")) || [];

window.addEventListener("DOMContentLoaded", function () {
  errorDiv = document.querySelector(".error-div");
  renderTodos();
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosForRender() {
  const indices = todos.map((_, i) => i);
  if (!sortInfo.sorted) return indices;
  return indices.sort(
    (i, j) => sortInfo.sortOrder * todos[i].text.localeCompare(todos[j].text),
  );
}

function validateInput(el) {
  const input = el || document.querySelector(".task-title-input");
  const value = input.value;
  if (value.trim() !== "") {
    errorDiv.innerText = "";
    errorDiv.style.display = "none";
  } else {
    errorDiv.innerText = "Invalid Title";
    errorDiv.style.display = "initial";
  }
}

function addTodo() {
  const dtInput = document.querySelector(".task-duration-input");
  const textInput = document.querySelector(".task-title-input");
  const urgencyInput = document.getElementById("urgency-level-input");
  const text = textInput.value.trim();
  const urgencyLevel = urgencyInput.value;

  if (text === "") {
    errorDiv.innerText = "Invalid Title";
    errorDiv.style.display = "initial";
    return;
  }

  const targetISO = getTargetISOFromInput();
  if (!targetISO) {
    errorDiv.innerText = "Invalid or past datetime";
    errorDiv.style.display = "initial";
    return;
  }
  errorDiv.style.display = "none";
  todos.push({ text, target: targetISO, urgencyLevel, completed: false });
  textInput.value = "";
  if (dtInput) dtInput.value = "";
  saveTodos();
  renderTodos();
}

function getTargetISOFromInput() {
  const dtInput = document.querySelector(".task-duration-input");
  if (!dtInput || !dtInput.value) return null;
  const target = new Date(dtInput.value);
  if (isNaN(target)) return null;
  const now = new Date();
  if (target.getTime() <= now.getTime()) return null;
  return target.toISOString();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}
function formatDateTimeISO(targetISO) {
  if (!targetISO) return { date: "No time set", time: "" };
  const target = new Date(targetISO);
  if (isNaN(target)) return { date: "Invalid time", time: "" };
  const dateOpts = { year: "numeric", month: "short", day: "numeric" };
  const timeOpts = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  return {
    date: target.toLocaleDateString(undefined, dateOpts),
    time: target.toLocaleTimeString(undefined, timeOpts),
  };
}
function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function toggleSort() {
  if (!sortInfo.sorted) {
    sortInfo.sorted = true;
    sortInfo.sortOrder = 1;
  } else if (sortInfo.sortOrder === 1) {
    sortInfo.sortOrder = -1;
  } else {
    sortInfo.sorted = false;
  }
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  const indices = getTodosForRender();
  
  indices.forEach((realIndex) => {
    const todo = todos[realIndex];
    const li = document.createElement("li");
    const dt = formatDateTimeISO(todo.target);
    if (todo.completed) li.classList.add("completed");
    if (todo.urgencyLevel === "high") li.classList.add("urgent");

    li.innerHTML = `
  <div class="todo-content">
    <div class="todo-top">
      <span class="task-title-text">${escapeHtml(todo.text)}</span>
      <span class="task-duration-text">
        <span class="date-part">${dt.date}</span>
        <span class="time-part">${dt.time}</span>
      </span>
      <span class="urgency-level">${todo.urgencyLevel}</span>
    </div>
    <div class="todo-bottom"></div>
  </div>
  <div class="todo-controls">
    <button class="complete-button" onclick="toggleComplete(${realIndex})">✔</button>
    <button class="remove-button" onclick="deleteTodo(${realIndex})">✖</button>
  </div>
`;

    list.appendChild(li);
  });
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
