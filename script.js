// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    /**
     * Function to add a new task to the list and optionally save it to localStorage
     * @param {string} taskText - The text content of the task
     * @param {boolean} save - Whether to save the task to localStorage (default: true)
     */
    function addTask(taskText = null, save = true) {
        // If taskText not passed (e.g., from input), get it from input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        // Validate input
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the <li> element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Set up event listener to remove task
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append remove button to the list item
        li.appendChild(removeBtn);

        // Append list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save the task to localStorage if needed
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    /**
     * Event listener for clicking the "Add Task" button
     */
    addButton.addEventListener('click', () => {
        addTask();
    });

    /**
     * Event listener for pressing "Enter" inside the input field
     */
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    /**
     * Function to save a task to localStorage
     * @param {string} taskText
     */
    function saveTaskToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Function to remove a task from localStorage
     * @param {string} taskText
     */
    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Function to load and display tasks from localStorage
     */
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(taskText => {
            addTask(taskText, false); // Load tasks without saving again
        });
    }
});
