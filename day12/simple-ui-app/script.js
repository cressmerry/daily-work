let todos = JSON.parse(localStorage.getItem("todos")) || [];
window.onload = function () {
  renderTodos();
};

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const minuteInput = document.querySelector(".task-duration-input-MM");
  const hourInput = document.querySelector(".task-duration-input-HH");
  const secondInput = document.querySelector(".task-duration-input-SS");
  const textInput = document.querySelector(".task-title-input");

  const text = textInput.value.trim();
  if (text === "") return;
  const duration = getDurationInSeconds();
  if (!duration) return;

  todos.push({ text, duration, completed: false });
  textInput.value = "";
  hourInput.value = "";
  minuteInput.value = "";
  secondInput.value = "";
  saveTodos();
  renderTodos();
}

function getDurationInSeconds() {
  const minuteInput = document.querySelector(".task-duration-input-MM");
  const hourInput = document.querySelector(".task-duration-input-HH");
  const secondInput = document.querySelector(".task-duration-input-SS");
  const hours = parseInt(hourInput.value || "0", 10);
  const minutes = parseInt(minuteInput.value || "0", 10);
  const seconds = parseInt(secondInput.value || "0", 10);
  const total =
    (Number.isFinite(hours) ? hours : 0) * 3600 +
    (Number.isFinite(minutes) ? minutes : 0) * 60 +
    (Number.isFinite(seconds) ? seconds : 0);
  return total > 0 ? total : 0;
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0s";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const parts = [];
  if (hrs) parts.push(`${hrs}h`);
  if (mins) parts.push(`${mins}m`);
  if (secs || parts.length === 0) parts.push(`${secs}s`);
  return parts.join(" ");
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function renderTodos() {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");
    li.innerHTML = `
    <span class="task-title-text">${todo.text}</span>
    <span class="task-duration-text">${formatDuration(todo.duration)}</span>
    <div>
    <button class="complete-button" onclick="toggleComplete(${index})">✔</button>
    <button class="remove-button"  onclick="deleteTodo(${index})">✖</button>
    </div>
    `;
    list.appendChild(li);
  });
}
