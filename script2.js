const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

    // Load tasks from localStorage or return empty array
function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

    // Save tasks to localStorage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

    // Render the list of tasks in the DOM
function renderTasks() {
    const tasks = loadTasks();
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text';
    span.title = 'Toggle Complete';
    span.addEventListener('click', () => {
        toggleComplete(index);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Delete Task';
    deleteBtn.addEventListener('click', () => {
        deleteTask(index);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    });
}

    // Add new task
function addTask(text) {
    const tasks = loadTasks();
    tasks.push({ text: text.trim(), completed: false });
    saveTasks(tasks);
    renderTasks();
}

    // Toggle completed status
function toggleComplete(index) {
    const tasks = loadTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    renderTasks();
}

    // Delete a task
function deleteTask(index) {
    const tasks = loadTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

    // Handle form submission
form.addEventListener('submit', e => {
    e.preventDefault();
    const taskText = input.value;
    if (taskText.trim() !== '') {
        addTask(taskText);
        input.value = '';
    }
});

    // Initial render
renderTasks();