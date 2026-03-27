let tasks = [];
window.onload = function () {
  let saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
};

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value;
  if (taskText === "") return;
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = `
            ${tasks[i]}
            <button onclick="deleteTask(${i})">❌</button>
        `;

    li.onclick = function () {
      li.classList.toggle("completed");
    };
    list.appendChild(li);
  }
}
