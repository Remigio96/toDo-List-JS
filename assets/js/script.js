//Variables
const inputTarea = document.querySelector("#nuevaTarea");
const btnAgregar = document.querySelector("#btnAgregar");
const listaTareas = document.querySelector("#listaTareas");
const totalTareas = document.querySelector("#totalTareas");
const tareasRealizadas = document.querySelector("#tareasRealizadas");

//Datos iniciales
let tareas = [
  { id: Date.now(), descripcion: "Ordenar habitación", completada: true },
  { id: Date.now() + 1, descripcion: "Estudiar para la prueba", completada: false },
  { id: Date.now() + 2, descripcion: "Pasear al perro", completada: false }
];

//Renderizar lista
function renderTareas() {
  listaTareas.innerHTML = "";
  for (let tarea of tareas) {
    listaTareas.innerHTML += `
          <tr>
            <td>${tarea.id}</td>
            <td class="${tarea.completada ? 'text-decoration-line-through text-success' : ''}">
              ${tarea.descripcion}
            </td>
            <td>
              <input type="checkbox" ${tarea.completada ? 'checked' : ''} onclick="toggleCompletada(${tarea.id})">
            </td>
            <td>
              <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${tarea.id})"><i class="bi bi-dash-lg"></i></button>
            </td>
          </tr>
        `;
  }
  actualizarResumen();
}

//Agregar tarea
btnAgregar.addEventListener("click", () => {
  const descripcion = inputTarea.value.trim();
  if (descripcion === "") {
    alert("Por favor escribe una tarea");
    return;
  }
  const nuevaTarea = {
    id: Date.now(),
    descripcion: descripcion,
    completada: false
  };
  tareas.push(nuevaTarea);
  inputTarea.value = "";
  renderTareas();
});

//Eliminar tarea
function eliminarTarea(id) {
  tareas = tareas.filter(t => t.id !== id);
  renderTareas();
}

//Marcar como completada
function toggleCompletada(id) {
  const tarea = tareas.find(t => t.id === id);
  if (tarea) {
    tarea.completada = !tarea.completada;
    renderTareas();
  }
}

//Actualizar resumen
function actualizarResumen() {
  totalTareas.textContent = tareas.length;
  tareasRealizadas.textContent = tareas.filter(t => t.completada).length;
}

//Inicializar
renderTareas();
