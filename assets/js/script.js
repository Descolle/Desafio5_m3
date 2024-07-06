let taskList = [];

const input = document.querySelector("#input");
const btn = document.querySelector("#add");
const containerTask = document.querySelector("#containerTask");
const total = document.getElementById("total"); // Capturamos el elemento donde se muestra el total de tareas
const complete = document.getElementById("complete"); // Capturamos el elemento donde se muestra el número de tareas completadas

btn.addEventListener("click", addTask);

input.addEventListener("input", disableButton);
function addTask() {
  const task = {
    id: Date.now(), // Corrected to call Date.now()
    title: input.value.trim(),
    complete: false,
  };

  taskList.unshift(task); //con esto todas las tasks se pondrán en línea dentro del TaskList
  input.value = "";

  renderList();
  disableButton(); // deshabilita el botón
}

function renderList() {
  containerTask.innerHTML = ""; // Limpiamos el contenedor de tareas

  taskList.forEach((task) => {
    containerTask.appendChild(createElementLi(task));
  });

  addEventListeners();

  countTask();

  saveTask();
}

function createElementLi(task) {
  const li = document.createElement("li"); // Creamos un elemento de lista
  li.className = "task"; // Le añadimos la clase 'task' para estilos
  li.innerHTML = `
      <p>${task.title}</p>
      <input type="checkbox" class="check" ${task.complete ? "checked" : ""} idTask="${task.id}">
      <button id="btnDelete" idTask="${task.id}">Eliminar</button>
    `;
  return li; // Retornamos el elemento de lista
}

function addEventListeners() {
  const btnsEliminar = document.querySelectorAll("#btnDelete");
  // Añadimos el evento click a cada botón de eliminar
  btnsEliminar.forEach((btnDelete) => {
    btnDelete.addEventListener("click", () => {
      deleteTask(btnDelete.getAttribute("idTask"));
    });
  });
  const checks = document.querySelectorAll(".check");
  checks.forEach((check) => {
    check.addEventListener("change", () => {
      checkTask(check.getAttribute("idTask"));
    });
  });
}

function countTask() {
  total.innerText = taskList.length; // Actualizamos el total de tareas
  complete.innerText = taskList.filter((task) => task.complete).length; // Contamos y actualizamos las tareas completadas
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== parseInt(id));
  renderList();
}

function checkTask(id) {
  taskList.forEach((task) => {
    if (task.id === parseInt(id)) {
      task.complete = !task.complete;
    }
  });
  renderList(); // Moved outside the loop
}

function disableButton() {
  if (input.value.trim() === "") {
    btn.disabled = true;
  } else {
    btn.disabled = false;
  }
}

function saveTask() {
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem('taskList'));
  if (tasks) {
    taskList = tasks;
    renderList();
  }
}

loadTask();
countTask();
disableButton();

