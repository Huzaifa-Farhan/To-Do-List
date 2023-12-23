const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelect = document.getElementById("priority-select");

function addTask() {
    const dueDate = document.getElementById("due-date").value;
    
    if (inputBox.value == '') {
        alert("Write Something!");
    } else {
        const li = document.createElement("li");
        li.setAttribute("data-priority", prioritySelect.value);
        li.setAttribute("data-due-date", dueDate);
        li.innerHTML = inputBox.value + (dueDate ? ` (Due: ${dueDate})` : '');
        listContainer.appendChild(li);
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    inputBox.value = '';
    document.getElementById("due-date").value = '';
    sortByPriority();
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function sortByPriority() {
    const tasks = Array.from(listContainer.children);
    tasks.sort((a, b) => {
        const priorityA = a.getAttribute("data-priority");
        const priorityB = b.getAttribute("data-priority");
        const priorityOrder = ["high", "medium", "low"];
        return priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB);
    });
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    tasks.forEach((task) => {
        listContainer.appendChild(task);
    });
}

showTask();