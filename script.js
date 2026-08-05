const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTask.addEventListener("click", () => {
    const task = taskInput.value.trim();

    if(task === "") return;

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

function renderTasks(){

    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">✓</button>
                <button class="delete" onclick="deleteTask(${index})">🗑️</button>
            </div>
        `;

        taskList.appendChild(li);

    });

}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}