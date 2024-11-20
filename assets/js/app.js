document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");


    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => addTaskToList(task));


    function addTaskToList(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.style.marginLeft = "10px";
        removeButton.addEventListener("click", () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(removeButton);
        taskList.appendChild(li);
    }


    function saveTasks() {
        const tasks = Array.from(taskList.children).map((li) =>
            li.firstChild.nodeValue.trim()
        );
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }


    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        if (savedTasks.includes(taskText)) {
            alert("Essa tarefa já existe!");
            return;
        }

        addTaskToList(taskText);
        saveTasks();

        taskInput.value = "";
    });
});

