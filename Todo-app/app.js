//selectors
let todoAdderBtn = document.querySelector("#todoAdderInput");
let todoUserInp = document.querySelector("#todoMakerInput");
let todoListCont = document.querySelector("#activeTodosList");
let todoCompleteBtns = document.querySelectorAll(".todoCheckBtn");

//evt listenners
window.addEventListener("load", updateTodos);
todoAdderBtn.addEventListener("click", addTodo);
todoCompleteBtns.forEach((completedBtn) =>
  completedBtn.addEventListener("click", todoDone)
);

//function
function updateTodos() {
  let activeTodos = JSON.parse(localStorage.getItem("activeTodos"));
  if (!activeTodos) {
    localStorage.setItem("activeTodos", "[]");
    activeTodos = localStorage.getItem("activeTodos");
  }
  activeTodos = [...new Set(activeTodos)];
  todoListCont.replaceChildren();
  for (let todo of activeTodos) {
    let div = document.createElement("div");
    div.classList.add("todo");
    div.innerHTML = `<p>${todo}</p><input type="checkbox" name="" class="todoCheckBtn" />`;
    todoListCont.appendChild(div);
  }
  todoAdderBtn = document.querySelector("#todoAdderInput");
  todoUserInp = document.querySelector("#todoMakerInput");
  todoListCont = document.querySelector("#activeTodosList");
  todoCompleteBtns = document.querySelectorAll(".todoCheckBtn");

  todoCompleteBtns.forEach((completedBtn) =>
    completedBtn.removeEventListener("click", todoDone)
  );
  todoCompleteBtns.forEach((completedBtn) => {
    completedBtn.addEventListener("click", todoDone);
  });
}
function addTodo() {
  if (!todoUserInp.value) return;
  let div = document.createElement("div");
  div.classList.add("todo");
  div.innerHTML = `<p>${todoUserInp.value}</p><input type="checkbox" name="" class="todoCheckBtn" />`;
  todoListCont.appendChild(div);
  let activeTodos = JSON.parse(localStorage.getItem("activeTodos"));
  activeTodos.push(todoUserInp.value);
  activeTodos = [...new Set(activeTodos)];
  localStorage.setItem("activeTodos", JSON.stringify(activeTodos));
  updateTodos();
}
function todoDone(evt) {
  let activeTodos = JSON.parse(localStorage.getItem("activeTodos"));
  let todo = evt.target.previousElementSibling.innerText;
  let todoIndex = activeTodos.indexOf(evt.target.parentElement.innerText);
  activeTodos.splice(todoIndex, 1);
  let completedTodos = JSON.parse(localStorage.getItem("completedTodos"));
  if (!completedTodos) {
    localStorage.setItem("completedTodos", "[]");
    completedTodos = localStorage.getItem("completedTodos");
  }
  completedTodos = [...new Set(completedTodos)];
  completedTodos.push(todo);
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  localStorage.setItem("activeTodos", JSON.stringify(activeTodos));
  updateTodos();
}
