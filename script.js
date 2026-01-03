const input  = document.getElementById('todo-input');
const addBtn = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodoNode(todo, index) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : 'none';
        saveTodos();
    });

    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.textDecoration = todo.completed ? 'line-through' : 'none';

    // double click edit
    textSpan.addEventListener('dblclick', () => {
        const newText = prompt("Edit your todo", todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

function render() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        todoList.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text: text, completed: false });
    input.value = '';
    render();
    saveTodos();
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
render();
