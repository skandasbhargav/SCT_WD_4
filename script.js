// script.js
document.addEventListener('DOMContentLoaded', () => {

    const taskTitle = document.getElementById('taskTitle');
    const taskDate = document.getElementById('taskDate');
    const taskTime = document.getElementById('taskTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    // Add Task
    addTaskBtn.addEventListener('click', () => {
        const title = taskTitle.value.trim();
        const date = taskDate.value;
        const time = taskTime.value;

        if (title === '' || date === '' || time === '') {
            alert('Please fill in all required fields!');
            return;
        }

        const task = {
            id: Date.now(),
            title,
            date,
            time,
            completed: false
        };

        tasks.push(task);
        displayTasks();

        // Clear form
        taskTitle.value = '';
        taskDate.value = '';
        taskTime.value = '';
    });

    // Display Tasks
    function displayTasks() {
        taskList.innerHTML = '';  // Clear task list

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            if (task.completed) li.classList.add('completed');

            li.innerHTML = `
                <div>
                    <h3>${task.title}</h3>
                    <small>Due: ${task.date} at ${task.time}</small>
                </div>
                <div class="task-controls">
                    <button onclick="toggleComplete(${task.id})">Complete</button>
                    <button onclick="editTask(${task.id})">Edit</button>
                    <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;

            taskList.appendChild(li);
        });
    }

    // Toggle Complete
    window.toggleComplete = (id) => {
        tasks = tasks.map(task => {
            if (task.id === id) task.completed = !task.completed;
            return task;
        });
        displayTasks();
    };

    // Edit Task
    window.editTask = (id) => {
        const task = tasks.find(t => t.id === id);

        // Fill the form with the task data
        taskTitle.value = task.title;
        taskDate.value = task.date;
        taskTime.value = task.time;

        // Remove the old task from the list after editing
        tasks = tasks.filter(t => t.id !== id);
    };

    // Delete Task
    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        displayTasks();
    };

});
