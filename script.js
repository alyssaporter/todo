const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');

const todos = [];

const themeManager = {
  init() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    themeToggle.addEventListener('click', () => this.toggle());
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.updateToggleIcon(theme);
  },

  toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  },

  updateToggleIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
};

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
themeManager.init();
