// Get references to input elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const prioritySelect = document.getElementById("priority-select");

function addTask() {
    // Get the value of the due date input
    const dueDate = document.getElementById("due-date").value;
    
    // Check if the input box is empty
    if (inputBox.value == '') {
        alert("Write Something!");
    } else {
        // Create a new list item
        const li = document.createElement("li");
        // Set priority and due date attributes
        li.setAttribute("data-priority", prioritySelect.value);
        li.setAttribute("data-due-date", dueDate);
        // Set the inner HTML of the list item to the input box value and due date
        li.innerHTML = inputBox.value + (dueDate ? ` (Due: ${dueDate})` : '');
        // Append the list item to the list container
        listContainer.appendChild(li);
        // Create a span element for the delete button
        const span = document.createElement("span");
        // Set the inner HTML of the span to the Unicode character for the multiplication sign
        span.innerHTML = "\u00d7";
        // Append the span to the list item
        li.appendChild(span);
    }

    // Clear the input box and due date input
    inputBox.value = '';
    document.getElementById("due-date").value = '';
    // Sort the tasks by priority
    sortByPriority();
    // Save the data to local storage
    saveData();
}

// Add event listener to the list container for checking off and deleting tasks
listContainer.addEventListener("click", function (e) {
    // Toggle the 'checked' class if the list item is clicked
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    // Remove the task if the span (delete button) is clicked
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Save the list data to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Load the list data from local storage
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// Sort the tasks by priority
function sortByPriority() {
    // Convert the list container's children to an array
    const tasks = Array.from(listContainer.children);
    // Sort the tasks based on their priority attribute
    tasks.sort((a, b) => {
        const priorityA = a.getAttribute("data-priority");
        const priorityB = b.getAttribute("data-priority");
        const priorityOrder = ["high", "medium", "low"];
        return priorityOrder.indexOf(priorityA) - priorityOrder.indexOf(priorityB);
    });
    // Clear the list container
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }
    // Append the sorted tasks back to the list container
    tasks.forEach((task) => {
        listContainer.appendChild(task);
    });
}

// Show the tasks when the page loads
showTask();
