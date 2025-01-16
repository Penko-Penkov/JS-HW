// Load tasks from localStorage
function loadTasks() {
    return JSON.parse(window.localStorage.getItem('tasks')) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function render(tasks) {
    const list = document.getElementById('myUL');
    list.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        li.textContent = task.title;
        if (task.completed) {
            li.classList.add('checked');
        }
        list.appendChild(li);

        const span = document.createElement('SPAN');
        const txt = document.createTextNode('\u00D7');
        span.className = 'close';
        span.appendChild(txt);
        li.appendChild(span);

        span.onclick = function() {
            const div = this.parentElement;
            div.style.display = 'none';
            tasks.splice(i, 1);
            saveTasks(tasks);
        };
    }
}

// Add a new task
function newElement() {
    const inputValue = document.getElementById('myInput').value;
    if (inputValue === '') {
        alert('You must write something!');
        return;
    }
    const tasks = loadTasks();
    tasks.push({ title: inputValue, completed: false });
    saveTasks(tasks);
    document.getElementById('myInput').value = '';
    render(tasks);
}

// Toggle task completion
document.querySelector('ul').addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        const tasks = loadTasks();
        const index = Array.from(ev.target.parentNode.children).indexOf(ev.target);
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
    }
}, false);

// Initial render
const tasks = loadTasks();
render(tasks);

// Save button event
document.querySelector('.save').addEventListener('click', () => {
    saveTasks(tasks);
});

// Load button event
document.querySelector('.load').addEventListener('click', () => {
    const tasks = loadTasks();
    render(tasks);
});

// Add button event
document.querySelector('.addBtn').addEventListener('click', newElement);
