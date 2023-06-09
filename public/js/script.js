
let inputTask = document.querySelector(".insert-input-simple")
let inputBtn = document.querySelector(".insert-button-simple")
let parentDiv = document.querySelector(".tasks-container")


inputBtn.addEventListener("click", () => {

    if (inputTask.value != "") {
        //* creation de tach
        let tachContainer = document.createElement("div")
        tachContainer.classList.add("tach")
        parentDiv.appendChild(tachContainer)
        //* creation des input where text showing
        let readinput = document.createElement("input")
        readinput.classList.add("the-task")
        readinput.setAttribute("type", "text")
        readinput.setAttribute("maxlength", "50")
        readinput.readOnly = true
        tachContainer.appendChild(readinput)
        readinput.value = inputTask.value
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
        deleteTask.setAttribute("class", "fa-solid fa-trash")
        toolsDiv.appendChild(deleteTask)
        deleteTask.addEventListener("click", () => {
            parentDiv.removeChild(tachContainer)

        })
    } else {
        inputTask.value = 'This area cant be empty'
        inputTask.style.color = "orangered"
        inputTask.style.fontSize = '1.1vw'
        setTimeout(() => {
            inputTask.value = ''
            inputTask.style.color = ""
        }, 1500);


    }


})