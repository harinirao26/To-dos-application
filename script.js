// Load tasks from localStorage on page load
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => createTaskElement(task.text, task.completed));
};

// Add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText, false);
  saveTasks();
  taskInput.value = "";
}

// Create task item in list
function createTaskElement(text, completed) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex flex-column align-items-start";

  const span = document.createElement("span");
  span.textContent = text;
  if (completed) span.classList.add("completed");

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "task-buttons";

  const completeBtn = document.createElement("button");
  completeBtn.className = "btn btn-success btn-sm";
  completeBtn.textContent = "Mark as Completed";
  completeBtn.onclick = () => {
    span.classList.toggle("completed");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  buttonGroup.appendChild(completeBtn);
  buttonGroup.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttonGroup);
  document.getElementById("taskList").appendChild(li);
}

// Save all tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("span").classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
