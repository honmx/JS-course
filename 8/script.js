const getNextId = () => {
  return todos && todos.length > 0
    ? todos.reduce((acc, cur) => cur.id > acc ? cur.id : acc, 1) + 1
    : 1;
}

const getItemsFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

const setItemsToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const createAppTitle = (title) => {
  const appTitle = document.createElement("h2");
  appTitle.innerHTML = title;
  return appTitle;
}

const createTodoItemForm = () => {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const buttonWrapper = document.createElement("div");
  const button = document.createElement("button");

  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Добавить дело";

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  input.addEventListener("change", (e) => {
    if (!e.target.value) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });

  button.disabled = true;

  return {
    form,
    input,
    button
  };
}

const createTodoList = (items, key) => {
  const list = document.createElement("ul");
  list.classList.add("list-group");

  if (items && items.length > 0) {
    items.forEach(item => {
      const todoItem = createTodoItem({ name: item.name, done: item.done }, key);
      todoItem.item.dataset.id = item.id;
      list.append(todoItem.item);
    });
  }

  return list;
}

const createTodoItem = ({ name, done = false }, key) => {
  const item = document.createElement("li");
  const buttonGroup = document.createElement("div");
  const doneButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
  item.textContent = name;

  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить";

  if (done) item.classList.toggle("list-group-item-success");

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  doneButton.addEventListener("click", () => {
    item.classList.toggle("list-group-item-success");
    const todoObjectItem = todos.find(todo => todo.id === Number(item.dataset.id));
    todoObjectItem.done = !todoObjectItem.done;
    setItemsToLocalStorage(key, todos);
  });
  
  deleteButton.addEventListener("click", () => {
    item.remove();
    todos = todos.filter(todo => todo.id !== Number(item.dataset.id));
    setItemsToLocalStorage(key, todos);
  });
  
  return {
    item,
    doneButton,
    deleteButton
  };
}

const createTodoApp = (container, title = "Список дел", key) => {
  todos = getItemsFromLocalStorage(key) || [];

  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList(todos, key);

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemForm.form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!todoItemForm.input.value) return;

    const todoItem = createTodoItem({ name: todoItemForm.input.value }, key);
    
    const newTodoObject = { id: getNextId(), name: todoItemForm.input.value, done: false };
    todoItem.item.dataset.id = newTodoObject.id;
    todos.push(newTodoObject);

    setItemsToLocalStorage(key, todos);

    todoList.append(todoItem.item);
    todoItemForm.input.value = "";
  });
}

window.createTodoApp = createTodoApp;

let todos = [];