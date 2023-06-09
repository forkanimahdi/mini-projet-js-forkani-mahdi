

let inputTask = document.querySelector(".insert-input-simple")
let inputBtn = document.querySelector(".insert-button-simple")
let parentDiv = document.querySelector(".tasks-container")
let welcomingSimple = document.querySelector(".welcoming-simple");
let currentUserConnected = localStorage.getItem("Current User")
let bodysimple = document.body
let savechange = document.querySelector("#savechange")
let gradiant1 = document.querySelector("#gradiant1")
let gradiant2 = document.querySelector("#gradiant2")
let resetTask = document.querySelector("#resetTask")
let simplebodyGradiant = localStorage.getItem("simplebodyGradiant")
bodysimple.style.backgroundImage = simplebodyGradiant
welcomingSimple.textContent = `Welcome ${currentUserConnected.charAt(0).toUpperCase() + currentUserConnected.slice(1)} you are now using the simple TO DO list`
let previousTach = localStorage.getItem("tachContainer");
parentDiv.innerHTML = previousTach
let editingButton = parentDiv.querySelectorAll(".edit-task")
let completedButton = parentDiv.querySelectorAll(".task-done")
let deleteButton = parentDiv.querySelectorAll(".delete-task")


editingButton.forEach(element => {
    let readinput = element.parentElement.parentElement.firstElementChild
    element.addEventListener("click", () => {
        if (element.classList.contains("edit-task")) {
            element.removeAttribute("class")
            element.setAttribute("class", "fa-solid fa-check")
            readinput.readOnly = false
            readinput.focus()
        } else {
            element.removeAttribute("class")
            element.setAttribute("class", "fa-solid fa-pen edit-task")
            readinput.readOnly = true
        }
    });
});

completedButton.forEach(element => {
    let readinput = element.parentElement.previousElementSibling
    let tachContainer = element.parentElement.parentElement

    element.addEventListener('click', () => {

        if (element.classList.contains("task-done")) {
            element.removeAttribute("class")
            element.setAttribute("class", "fa-sharp fa-solid fa-rotate-left")
            tachContainer.style.backgroundColor = "green"
            readinput.style.textDecoration = "line-through"
            readinput.style.color = "#ce5a16"

        } else {
            element.removeAttribute("class")
            element.setAttribute("class", "fa-solid fa-circle-check task-done")
            tachContainer.style.backgroundColor = ""
            readinput.style.textDecoration = ""
            readinput.style.color = ""


        }
    })
});

deleteButton.forEach(element => {
    let tachContainer = element.parentElement.parentElement

    element.addEventListener("click", () => {
        parentDiv.removeChild(tachContainer)
        localStorage.setItem("tachContainer", parentDiv.innerHTML);


    })
});

function createTask() {
    if (inputTask.value != "") {
        //* creation de tach
        let tachContainer = document.createElement("div")
        tachContainer.classList.add("tach")
        parentDiv.appendChild(tachContainer)
        //* creation des input where text showing
        let readinput = document.createElement("input")
        readinput.classList.add("the-task")
        readinput.setAttribute("type", "text")
        readinput.setAttribute("value", inputTask.value)
        readinput.setAttribute("maxlength", "50")
        readinput.readOnly = true
        tachContainer.appendChild(readinput)
        inputTask.value = ""

        //* creation de tools
        let toolsDiv = document.createElement("div")
        toolsDiv.classList.add("tools")
        tachContainer.appendChild(toolsDiv)

        //* creation des icones

        //* edit the task
        let editTask = document.createElement("i")
        editTask.setAttribute("class", "fa-solid fa-pen edit-task")
        toolsDiv.appendChild(editTask)
        editTask.addEventListener("click", () => {
            if (editTask.classList.contains("edit-task")) {
                editTask.removeAttribute("class")
                editTask.setAttribute("class", "fa-solid fa-check")
                readinput.readOnly = false
                readinput.focus()
            } else {
                editTask.removeAttribute("class")
                editTask.setAttribute("class", "fa-solid fa-pen edit-task")
                readinput.readOnly = true


            }

        })
        //* task is completed
        let taskDone = document.createElement("i")
        taskDone.setAttribute("class", "fa-solid fa-circle-check task-done")
        toolsDiv.appendChild(taskDone)
        taskDone.addEventListener('click', () => {

            if (taskDone.classList.contains("task-done")) {
                taskDone.removeAttribute("class")
                taskDone.setAttribute("class", "fa-sharp fa-solid fa-rotate-left")
                tachContainer.style.backgroundColor = "green"
                readinput.style.textDecoration = "line-through"
                readinput.style.color = "#ce5a16"

            } else {
                taskDone.removeAttribute("class")
                taskDone.setAttribute("class", "fa-solid fa-circle-check task-done")
                tachContainer.style.backgroundColor = ""
                readinput.style.textDecoration = ""
                readinput.style.color = ""


            }
        })
        //* delete task
        let deleteTask = document.createElement("i")
        deleteTask.setAttribute("class", "fa-solid fa-trash delete-task")
        toolsDiv.appendChild(deleteTask)
        deleteTask.addEventListener("click", () => {
            parentDiv.removeChild(tachContainer)
            localStorage.setItem("tachContainer", parentDiv.innerHTML);


        })
        localStorage.setItem("tachContainer", parentDiv.innerHTML);

    } else {
        inputTask.setAttribute('placeholder', 'This area cant be empty')
        inputTask.style.color = "orangered"
        setTimeout(() => {
            inputTask.removeAttribute('placeholder', 'This area cant be empty')
            inputTask.setAttribute('placeholder', 'Insert Task Here')
            inputTask.value = ''
            inputTask.style.color = ""
        }, 1500);


    }

}

inputBtn.addEventListener("click", () => {
    createTask()
})

inputTask.addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        createTask()
    }
})


//~~ adddddddddddddddddddddddddddddddddddittional style

//* changing color
savechange.addEventListener("click", () => {
    let simplebodyGradiant = `linear-gradient(90deg, ${gradiant1.value}, ${gradiant2.value})`
    bodysimple.style.backgroundImage = simplebodyGradiant
    localStorage.setItem("simplebodyGradiant", simplebodyGradiant)

})
//* reset tasks
resetTask.addEventListener("click", () => {
    let confirming = confirm("Are you sure you want to reset tasks ? All data will be lost")
    if (confirming) {
        let allChildren = parentDiv.querySelectorAll('.tach')
        localStorage.removeItem("tachContainer");
        allChildren.forEach(element => {
            element.remove()
        });
    }
})
