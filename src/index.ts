abstract class Item {
  protected id: number;
  protected text: string;

  constructor(text: string) {
    this.id = Date.now();
    this.text = text;
  }

  getId(): number {
    return this.id;
  }

  getText(): string {
    return this.text;
  }

  abstract display(): string;
}

class Task extends Item {
  private completed: boolean;

  constructor(text: string) {
    super(text);
    this.completed = false;
  }

  toggleComplete(): void {
    this.completed = !this.completed;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  display(): string {
    return `${this.completed ? "[✔] " : "[ ] "} ${this.text}`;
  }
}

class TodoList {
  private tasks: Task[];
  constructor() {
    this.tasks = [];
  }

  addTask(text: string): void {
    if (!text.trim()) return;
    this.tasks.push(new Task(text));
    UI.renderTasks(this.tasks);
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.getId() !== id);
    UI.renderTasks(this.tasks);
  }

  toggleTask = (id: number): void => {
    this.tasks.forEach((task) => {
      if (task.getId() === id) {
        task.toggleComplete();
      }
    });
    UI.renderTasks(this.tasks);
  };

  getTasks(): Task[] {
    return this.tasks;
  }
}

class UI {
  static renderTasks(tasks: Task[]): void {
    
    const taskList = document.getElementById("taskList") as HTMLUListElement;
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `
                  <span class="${
                    task.isCompleted() ? "completed" : ""
                  }" onclick="app.toggleTask(${task.getId()})">
                      ${task.getText()}
                  </span>
                  <button onclick="app.removeTask(${task.getId()})">❌</button>
              `;
      taskList.appendChild(li);
    });
  }
}

class App {
  private todoList: TodoList;

  constructor() {
    this.todoList = new TodoList();
    this.init();
  }

  private init(): void {
    const addTaskBtn = document.getElementById(
      "addTaskBtn"
    ) as HTMLButtonElement;
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;

    addTaskBtn.addEventListener("click", () => {
      this.todoList.addTask(taskInput.value);
      taskInput.value = "";
    });

    (window as any).app = this;
  }

  toggleTask(id: number): void {
    this.todoList.toggleTask(id);
  }

  removeTask(id: number): void {
    this.todoList.removeTask(id);
  }
}
new App();
