const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const messageSpan = document.querySelector(".message");
const searchForm = document.querySelector(".search");


function updateMessage() {
    const textLength = tasks.children.length;
    messageSpan.textContent = `You have ${textLength} pending tasks.`
}
updateMessage();

addForm.addEventListener("submit", event => {

    event.preventDefault();
    const value = addForm.task.value.trim();

    if (value.length) {
        console.log(value);
        tasks.innerHTML += `<li><span>${value}</span>
                            <i class="bi bi-trash-fill delete"></i>
                            </li >`;

        addForm.reset();
        updateMessage();

    }
});


tasks.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
        updateMessage()

    }
});

clearAll.addEventListener("click", event => {
    const taskElements = tasks.querySelectorAll("li");
    taskElements.forEach(element => {
        element.remove();
    });
    updateMessage()
});

function searchFilter(word) {

    Array.from(tasks.children)
        .filter(task => {
            return !task.textContent.toLowerCase().includes(word);
        })
        .forEach(task => {
            task.classList.add("hide");
        });


    Array.from(tasks.children)
        .filter(task => {
            return task.textContent.includes(word);
        })
        .forEach(task => {
            task.classList.remove("hide");
        });


}
searchForm.addEventListener("keyup", event => {
    const word = searchForm.task.value.trim().toLowerCase();
    console.log(word);
    searchFilter(word);
})

searchForm.addEventListener("click", event => {
    if (event.target.classList.contains("reset")) {
        searchForm.reset();
        const word = searchForm.task.value.trim();
        searchFilter(word);
    }
})