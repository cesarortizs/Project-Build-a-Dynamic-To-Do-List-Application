// Search bar elements 

const searchBar = document.getElementById("searchBar");
const searchBarForm = document.getElementById("searchBarForm");

// To do list elements

const newTaskForm = document.getElementById("newTaskForm");
const newTaskFormNameInput = document.getElementById("newTaskFormNameInput");
const tasksContainer = document.getElementById("tasksContainer");

// Other elements

const singleTaskContainerList = document.getElementsByClassName("singleTaskContainer");
const tasksTotal = document.getElementById("tasksTotal");

// Utility variables

let originalArray;

searchBarForm.addEventListener("submit", (e)=>
{
    e.preventDefault();

    if (searchBar.value != "" && singleTaskContainerList.length != 0)
    {
        let newArray = originalArray.slice();

        newArray = newArray.filter((t)=>
        {
            return t.childNodes[1].textContent.includes(searchBar.value);
        })

        tasksContainer.innerHTML = "";

        newArray.forEach(function(item){
            tasksContainer.appendChild(item.cloneNode(true));
        });
    }

    else
    {
        tasksContainer.innerHTML = "";

        originalArray.forEach(function(item){
            tasksContainer.appendChild(item.cloneNode(true));
        });
    }
})

function createTaskOnDOM()
{
    let newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add("singleTaskContainer");

    let newTaskSpan = document.createElement('span');
    newTaskSpan.textContent = newTaskFormNameInput.value;
    newTaskSpan.classList.add("taskSpan");

    let newTaskCheckbox = document.createElement('input')
    newTaskCheckbox.setAttribute('type', 'checkbox');
    newTaskCheckbox.classList.add('taskCheckbox');

    let newTaskDeleteButton = document.createElement("button");
    newTaskDeleteButton.textContent = "Delete"
    newTaskDeleteButton.classList.add("taskDeleteButton", "btn", "btn-primary");

    newTaskContainer.appendChild(newTaskCheckbox);
    newTaskContainer.appendChild(newTaskSpan);
    newTaskContainer.append(newTaskDeleteButton);

    tasksContainer.append(newTaskContainer);

    tasksTotal.textContent = `Tasks number: ${singleTaskContainerList.length}`

    originalArray = [...document.querySelectorAll(".singleTaskContainer")].slice();
}

newTaskForm.addEventListener("submit", (e)=>
{
    e.preventDefault();

    if (!newTaskFormNameInput.value)
    {
        alert("Enter a name for your task");
    }

    else
    {
        createTaskOnDOM();
    }
})

tasksContainer.addEventListener("click", (e)=>
{
    if (e.target.classList.contains('taskCheckbox'))
    {
        e.target.nextElementSibling.style.textDecoration = "line-through"
    }

    else if (e.target.classList.contains('taskDeleteButton'))
    {
        tasksContainer.removeChild(e.target.closest("div"));
        tasksTotal.textContent = `Tasks number: ${singleTaskContainerList.length}`
        originalArray = [...document.querySelectorAll(".singleTaskContainer")].slice();
    }
})