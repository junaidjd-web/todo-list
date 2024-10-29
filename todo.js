// Access input and text container elements
let input = document.getElementById("inp");
let text = document.querySelector(".text");

// Load tasks from Local Storage on page load
window.onload = loadTasks;

// Function to load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Function to add a new task
function Add() {
    if (input.value === "") {
        alert("Please enter a task");
    } else {
        let taskText = input.value;
        addTaskToDOM(taskText);
        saveTaskToLocalStorage(taskText);
        input.value = ""; // Clear input field
    }
}

// Function to add task to the DOM
function addTaskToDOM(taskText) {
    let newEle = document.createElement("ul");
    newEle.innerHTML = `${taskText} 
        <svg aria-label="Delete task" xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
        </svg>`;
    
    text.appendChild(newEle);

    // Add delete event listener to the SVG icon
    newEle.querySelector("svg").addEventListener("click", () => {
        newEle.remove();
        deleteTaskFromLocalStorage(taskText);
    });
}

// Function to save task to Local Storage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to delete task from Local Storage
function deleteTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
