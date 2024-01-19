// Selecting relevant HTML elements using querySelector
const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message");
const searchForm = document.querySelector(".search");

// Function to update the message displaying the number of pending tasks
function updateMessage() {
    const textLength = tasks.children.length;
    messageSpan.textContent = `You have ${textLength} pending tasks.`;
}

// Initial call to updateMessage function
updateMessage();

// Event listener for the task addition form submission
addForm.addEventListener("submit", event => {
    event.preventDefault();
    // Get the value from the input field, trim any leading or trailing spaces
    const value = addForm.task.value.trim();

    // Check if the input value is not empty
    if (value.length) {
        // Add a new task to the tasks list with the given value
        tasks.innerHTML += `<li><span>${value}</span>
                            <i class="bi bi-trash-fill delete"></i>
                            </li >`;

        // Reset the form and update the message
        addForm.reset();
        updateMessage();
    }
});

// Event listener for task deletion
tasks.addEventListener("click", event => {
    // Check if the clicked element has the "delete" class
    if (event.target.classList.contains("delete")) {
        // Remove the parent element (task) of the clicked delete button
        event.target.parentElement.remove();
        // Update the message
        updateMessage();
    }
});

// Event listener for clearing all tasks
clearAll.addEventListener("click", event => {
    // Get all task elements and remove each one
    const taskElements = tasks.querySelectorAll("li");
    taskElements.forEach(element => {
        element.remove();
    });
    // Update the message
    updateMessage();
});

// Function to filter tasks based on a search word
function searchFilter(word) {
    // Hide tasks that do not contain the search word
    Array.from(tasks.children)
        .filter(task => {
            return !task.textContent.toLowerCase().includes(word);
        })
        .forEach(task => {
            task.classList.add("hide");
        });

    // Show tasks that contain the search word
    Array.from(tasks.children)
        .filter(task => {
            return task.textContent.includes(word);
        })
        .forEach(task => {
            task.classList.remove("hide");
        });
}

// Event listener for keyup event in the search input
searchForm.addEventListener("keyup", event => {
    // Get the trimmed and lowercase version of the search word
    const word = searchForm.task.value.trim().toLowerCase();
    // Call the searchFilter function with the search word
    searchFilter(word);
});

// Event listener for click event on the search form (reset button)
searchForm.addEventListener("click", event => {
    // Check if the clicked element has the "reset" class
    if (event.target.classList.contains("reset")) {
        // Reset the search form and get the trimmed search word
        searchForm.reset();
        const word = searchForm.task.value.trim();
        // Call the searchFilter function with the search word
        searchFilter(word);
    }
});
