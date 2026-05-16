const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const todos = [];

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'empty-state';
    emptyMessage.textContent = 'No todos yet. Add one above to get started.';
    todoList.appendChild(emptyMessage);
    return;
  }

  todos.forEach((todo, index) => {
    const item = document.createElement('li');
    item.className = 'todo-item';

    const checkbox = document.createElement('input');
    checkbox.className = 'todo-checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', event => {
      event.stopPropagation();
      todos[index].completed = checkbox.checked;
      renderTodos();
    });

    const text = document.createElement('p');
    text.className = 'todo-text';
    text.textContent = todo.text;
    if (todo.completed) {
      text.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', event => {
      event.stopPropagation();
      todos.splice(index, 1);
      renderTodos();
    });

    item.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    });

    item.append(checkbox, text, deleteButton);
    todoList.appendChild(item);
  });
}

todoForm.addEventListener('submit', event => {
  event.preventDefault();

  const value = todoInput.value.trim();
  if (value === '') {
    return;
  }

  todos.push({ text: value, completed: false });
  todoInput.value = '';
  todoInput.focus();
  renderTodos();
});

renderTodos();
