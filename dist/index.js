"use strict";
class Item {
    constructor(text) {
        this.id = Date.now();
        this.text = text;
    }
    getId() {
        return this.id;
    }
    getText() {
        return this.text;
    }
}
class Task extends Item {
    constructor(text) {
        super(text);
        this.completed = false;
    }
    toggleComplete() {
        this.completed = !this.completed;
    }
    isCompleted() {
        return this.completed;
    }
    display() {
        return `${this.completed ? "[✔] " : "[ ] "} ${this.text}`;
    }
}
class TodoList {
    constructor() {
        this.toggleTask = (id) => {
            this.tasks.forEach((task) => {
                if (task.getId() === id) {
                    task.toggleComplete();
                }
            });
            UI.renderTasks(this.tasks);
        };
        this.tasks = [];
    }
    addTask(text) {
        if (!text.trim())
            return;
        this.tasks.push(new Task(text));
        UI.renderTasks(this.tasks);
    }
    removeTask(id) {
        this.tasks = this.tasks.filter((task) => task.getId() !== id);
        UI.renderTasks(this.tasks);
    }
    getTasks() {
        return this.tasks;
    }
}
class UI {
    static renderTasks(tasks) {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.innerHTML = `
                  <span class="${task.isCompleted() ? "completed" : ""}" onclick="app.toggleTask(${task.getId()})">
                      ${task.getText()}
                  </span>
                  <button onclick="app.removeTask(${task.getId()})">❌</button>
              `;
            taskList.appendChild(li);
        });
    }
}
class App {
    constructor() {
        this.todoList = new TodoList();
        this.init();
    }
    init() {
        const addTaskBtn = document.getElementById("addTaskBtn");
        const taskInput = document.getElementById("taskInput");
        addTaskBtn.addEventListener("click", () => {
            this.todoList.addTask(taskInput.value);
            taskInput.value = "";
        });
        window.app = this;
    }
    toggleTask(id) {
        this.todoList.toggleTask(id);
    }
    removeTask(id) {
        this.todoList.removeTask(id);
    }
}
new App();
