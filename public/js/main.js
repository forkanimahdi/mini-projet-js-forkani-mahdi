let bodyAdvanced = document.querySelector(".advanced-body")
let main = document.querySelector("main")
let advancedCreation = document.querySelector(".button-creation")
let containerHeader = document.querySelector(".task-column")
let welcominText = document.querySelector(".welcoming-advanced")
let currentUserConnected = localStorage.getItem("Current User")
let savechange = document.querySelector("#savechange")
let gradiant1 = document.querySelector("#adv-gradiant1")
let gradiant2 = document.querySelector("#adv-gradiant2")
let resetTask = document.querySelector("#resetTask")
let advancedbodygradiant = localStorage.getItem("advancedbodygradiant")
bodyAdvanced.style.backgroundImage = advancedbodygradiant


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
    editTitle.setAttribute("title","Edit the task column's name")
    containerHeader.appendChild(editTitle)
    //* add task
    let addTask = document.createElement("i")
    addTask.setAttribute("class", "fa-sharp fa-solid fa-plus ms-3 type-task")
    addTask.setAttribute("title","Insert task")
    containerHeader.appendChild(addTask)
    //* column setting
    let settingColumn = document.createElement("i")
    settingColumn.setAttribute("class", "fa-solid fa-gear setting ms-3")
    settingColumn.setAttribute("title","Setting")
    containerHeader.appendChild(settingColumn)
    settingColumn.addEventListener('click', () => {
        if (settingColumn.classList.contains("setting")) {
            settingColumn.removeAttribute("class")
            settingColumn.setAttribute("class", "fa-solid fa-left-long leave")
            editTitle.style.display = 'none'
            addTask.style.display = 'none'
            headerTitle.style.display = 'none'
            containerHeader.style.display = "flex"
            containerHeader.style.alignItems = "center"
            containerHeader.style.justifyContent = "space-around"
            //* changing color of column
            let changeColor = document.createElement("i")
            changeColor.setAttribute("title","Change  Column's Color")
            changeColor.setAttribute("class", "fa-solid fa-palette")
            changeColor.style.position = "relative"
            let colorPalette = document.createElement("input")
            colorPalette.setAttribute('type',"color")
            colorPalette.style.position = "absolute"
            colorPalette.style.left = "0"
            colorPalette.style.left = "0"
            colorPalette.style.width = "100%"
            colorPalette.style.height = "100%"
            colorPalette.style.opacity = "0%"
            changeColor.appendChild(colorPalette)
            containerHeader.appendChild(changeColor)
            colorPalette.addEventListener("input", () => {
                taskContainer.style.backgroundColor = colorPalette.value
                taskContainer.setAttribute("data-background", colorPalette.value)

            })
            //* delete column 
            let deleteColumn = document.createElement("i")
            deleteColumn.setAttribute("class", "fa-solid fa-trash delete")
            containerHeader.appendChild(deleteColumn)
            deleteColumn.addEventListener("click", () => {
                let deletedTaskPosition = taskContainer.style.left
                let allContainers = main.querySelectorAll(".task-column")
                allContainers.forEach(element => {
                    let currentElementposition= element.style.left
                    currentElementposition = currentElementposition.slice(0,-2)

                    if (currentElementposition> deletedTaskPosition) {
                        element.style.left = (currentElementposition -21) +"vw"
                        containerPosition -= 21
                    }
                });
                taskContainer.remove()
            })
            //* clear chi7aja 
            let clearing = document.createElement("i")
            clearing.setAttribute("title","Clear")
            // clearing.setAttribute("class", "fa-solid fa-palette")          


        } else {
            let changeColor = containerHeader.querySelector(".fa-palette")
            let deleteColumn = containerHeader.querySelector(".fa-trash")

            settingColumn.removeAttribute("class")
            settingColumn.setAttribute("class", "fa-solid fa-gear ms-3 setting")
            editTitle.style.display = 'initial'
            addTask.style.display = 'initial'
            headerTitle.style.display = 'initial'
            containerHeader.style.display = "block"
            containerHeader.style.alignItems = ""
            containerHeader.style.justifyContent = ""
            containerHeader.removeChild(changeColor)
            containerHeader.removeChild(deleteColumn)



        }


    })

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
            settingColumn.style.display = 'none'
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
                    settingColumn.style.display = 'initial'
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
                settingColumn.style.display = 'initial'
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
                        taskInput.style.color = ""


                    }
                })
                //* delete task
                let deleteTask = document.createElement("i")
                deleteTask.setAttribute("class", "fa-solid fa-trash")
                toolsDiv.appendChild(deleteTask)
                deleteTask.addEventListener("click", () => {
                    let parent = taskDiv.parentElement

                    parent.removeChild(taskDiv)
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


//* changing color
savechange.addEventListener("click", () => {
    let advancedbodygradiant = `linear-gradient(180deg, ${gradiant1.value}, ${gradiant2.value})`
    bodyAdvanced.style.backgroundImage = advancedbodygradiant
    localStorage.setItem("advancedbodygradiant", advancedbodygradiant)

})
