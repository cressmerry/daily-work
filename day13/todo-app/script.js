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
  let result = JSON.parse(JSON.stringify(todos));
  if (!sortInfo.sorted) return result;
  return result.sort((a, b) => {
    const order = a.text.localeCompare(b.text);
    return sortInfo.sortOrder * order;
  });
}

function validateInput(el) {
  const value = el.value;
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
  const urgencyInput = document.querySelector(".urgency-input");
  const text = textInput.value.trim();
  const isUrgent = !!(urgencyInput && urgencyInput.checked);

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

  todos.push({ text, target: targetISO, isUrgent, completed: false });
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

function formatRemainingOrISO(targetISO) {
  if (!targetISO) return "No time set";
  const target = new Date(targetISO);
  if (isNaN(target)) return "Invalid time";
  const now = new Date();
  const diff = Math.floor((target - now) / 1000);
  if (diff <= 0) return "Due";
  const hrs = Math.floor(diff / 3600);
  const mins = Math.floor((diff % 3600) / 60);
  const secs = diff % 60;
  const parts = [];
  if (hrs) parts.push(`${hrs}h`);
  if (mins) parts.push(`${mins}m`);
  if (secs && parts.length === 0) parts.push(`${secs}s`);
  return `in ${parts.join(" ")}`; // e.g. "in 1h 20m"
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function toggleSort() {
  sortInfo.sorted = !sortInfo.sorted;
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  let finalTodo = getTodosForRender();
  finalTodo.forEach((todo, renderIndex) => {
    const realIndex = todos.indexOf(todo);
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");
    if (todo.isUrgent) li.classList.add("urgent");

    li.innerHTML = `
    <span class="task-title-text">${todo.text}</span>
    <span class="task-duration-text">${formatRemainingOrISO(todo.target)}</span>
    <div>
      <button class="complete-button" onclick="toggleComplete(${realIndex})">✔</button>
      <button class="remove-button" onclick="deleteTodo(${realIndex})">✖</button>
    </div>
    `;
    list.appendChild(li);
  });
  saveTodos();
}

function formatTargetLocal(targetISO) {
  if (!targetISO) return "No time set";
  const target = new Date(targetISO);
  if (isNaN(target)) return "Invalid time";
  const opts = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return target.toLocaleString(undefined, opts);
}
