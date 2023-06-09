let bodyAdvanced = document.querySelector(".advanced-body")
let main = document.querySelector("main")
let advancedCreation = document.querySelector(".button-creation")
let containerHeader = document.querySelector(".task-column")
// let allInsertTask = document.querySelectorAll(".header-task-area")



let containerPosition = 1;


//* creatin de container
advancedCreation.addEventListener("click", () => {
    //* create container
    let taskContainer = document.createElement("div")
    taskContainer.classList.add("task-column")
    taskContainer.setAttribute("ondragover", "event.preventDefault()")
    taskContainer.style.left = containerPosition + "vw"
    main.appendChild(taskContainer)
    containerPosition += 21
    //* create container header
    let containerHeader = document.createElement("div")
    containerHeader.classList.add("div-add-tasks")
    taskContainer.appendChild(containerHeader)
    //* create header input
    let headerTitle = document.createElement("input")
    headerTitle.classList.add("header-input")
    headerTitle.setAttribute("type", "text")
    headerTitle.setAttribute("maxlength", "15")
    headerTitle.setAttribute("value", "Task Tittle")
    headerTitle.readOnly = true
    containerHeader.appendChild(headerTitle)
    //* edit icon
    let editTitle = document.createElement("i")
    editTitle.setAttribute("class", "fa-solid fa-pen edit-tittle")
    containerHeader.appendChild(editTitle)
    //* add task
    let addTask = document.createElement("i")
    addTask.setAttribute("class", "fa-sharp fa-solid fa-plus ms-3 type-task")
    containerHeader.appendChild(addTask)
    //* color palette
    let changecolor = document.createElement("i")
    changecolor.setAttribute("class", "fa-sharp fa-solid fa-palette ms-3")
    containerHeader.appendChild(changecolor)

    //* modification de titre

    editTitle.addEventListener("click", () => {
        if (editTitle.classList.contains("edit-tittle")) {
            editTitle.removeAttribute("class")
            editTitle.setAttribute("class", "fa-solid fa-check")
            headerTitle.readOnly = false
            headerTitle.focus()
        } else {
            editTitle.removeAttribute("class")
            editTitle.setAttribute("class", "fa-solid fa-pen edit-tittle")
            headerTitle.readOnly = true


        }

    })

    //* creation de taches

    addTask.addEventListener('click', () => {
        //*creation de task de l input
        if (addTask.classList.contains("type-task")) {
            let insertTask = document.createElement("input")
            insertTask.classList.add("header-task-area")
            insertTask.setAttribute("type", "text")
            insertTask.setAttribute("maxlength", "15")
            insertTask.setAttribute("placeholder", "Insert task here or press esc to cancel")
            addTask.removeAttribute("class")
            addTask.setAttribute("class", "fa-solid fa-check create-task")
            addTask.style.transition = "0.5s "
            editTitle.style.display = 'none'
            changecolor.style.display = 'none'
            headerTitle.style.display = 'none'
            containerHeader.appendChild(insertTask)
            insertTask.focus()
            //* cancel task input using esc button
            insertTask.addEventListener('keyup', (event) => {
                if (event.key === "Escape") {
                    containerHeader.removeChild(insertTask)
                    addTask.removeAttribute("class")
                    addTask.setAttribute("class", "fa-sharp fa-solid fa-plus ms-3 type-task")
                    addTask.style.transition = "0s ease"
                    editTitle.style.display = 'initial'
                    changecolor.style.display = 'initial'
                    headerTitle.style.display = 'initial'
                }
            })

            //* creation de task
        } else {
            let insertTask = containerHeader.querySelector(".header-task-area")
            //* if the input is filed
            if (insertTask.value != 0) {
                addTask.removeAttribute("class")
                addTask.setAttribute("class", "fa-sharp fa-solid fa-plus ms-3 type-task")
                // insertTask.style.display = 'none'
                addTask.style.transition = "0s ease"
                editTitle.style.display = 'initial'
                changecolor.style.display = 'initial'
                headerTitle.style.display = 'initial'
                //*creation de task div
                let taskDiv = document.createElement("div")
                taskDiv.classList.add("task-div")
                taskDiv.setAttribute("draggable", "true")
                // ! Draaaaaaaaaaaaaaaaaaaaag aaaaaaaaaaaaaaaaaaaand DDDDDDDDDDDroooooooooooooopp
                taskDiv.addEventListener("dragstart", (e) => {
                    e.target.classList.add("is-dragging")
                })
                taskDiv.addEventListener("dragend", (e) => {
                    e.target.classList.remove("is-dragging");
                });
                let droppables = bodyAdvanced.querySelectorAll(".task-column")
                droppables.forEach((zone) => {
                    zone.addEventListener("dragover", (e) => {
                        e.preventDefault();

                        let draggingTask = document.querySelector(".is-dragging");

                        if (draggingTask) {
                            let taskContainer = draggingTask.parentElement;
                            console.log(zone);
                            if (taskContainer !== zone) {

                                zone.appendChild(draggingTask);
                                //         //     }else{
                                //         //         console.log('xxx');
                            }
                        }
                    });
                });





                taskContainer.appendChild(taskDiv)
                //* creation de task area
                let taskInput = document.createElement('input')
                taskInput.classList.add("task-area")
                taskInput.setAttribute('maxlength', "15")
                taskInput.readOnly = true
                taskInput.value = insertTask.value
                taskDiv.appendChild(taskInput)
                //* icon div de task
                let toolsDiv = document.createElement("div")
                toolsDiv.classList.add("tools-div")
                taskDiv.appendChild(toolsDiv)
                //* edit the task
                let editTask = document.createElement("i")
                editTask.setAttribute("class", "fa-solid fa-pen edit-task")
                toolsDiv.appendChild(editTask)
                editTask.addEventListener("click", () => {
                    if (editTask.classList.contains("edit-task")) {
                        editTask.removeAttribute("class")
                        editTask.setAttribute("class", "fa-solid fa-check")
                        taskInput.readOnly = false
                        taskInput.focus()
                    } else {
                        editTask.removeAttribute("class")
                        editTask.setAttribute("class", "fa-solid fa-pen edit-task")
                        taskInput.readOnly = true


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
                        taskDiv.style.backgroundColor = "green"
                        taskInput.style.textDecoration = "line-through"
                        taskInput.style.color = "white"

                    } else {
                        taskDone.removeAttribute("class")
                        taskDone.setAttribute("class", "fa-solid fa-circle-check task-done")
                        taskDiv.style.backgroundColor = ""
                        taskInput.style.textDecoration = ""

                    }
                })
                //* delete task
                let deleteTask = document.createElement("i")
                deleteTask.setAttribute("class", "fa-solid fa-trash")
                toolsDiv.appendChild(deleteTask)
                deleteTask.addEventListener("click", () => {
                    taskContainer.removeChild(taskDiv)

                })


                containerHeader.removeChild(insertTask)

                //*if the input is empty
            } else {
                insertTask.value = 'This area cant be empty'
                insertTask.style.color = "orangered"
                insertTask.style.fontSize = '1.1vw'
                setTimeout(() => {
                    insertTask.value = ''
                    insertTask.style.color = ""
                }, 1500);
            }
        }
    })
})



