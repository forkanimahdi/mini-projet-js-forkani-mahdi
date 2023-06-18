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
let logout = document.querySelector(".button-logout")


// let restoredData = localStorage.getItem('allTaskAdvanced')
// main.innerHTML = restoredData

let containerPosition = 1;


//* creatin de container
advancedCreation.addEventListener("click", () => {

    //* create container
    let taskContainer = document.createElement("div")
    taskContainer.classList.add("task-column")

    if (window.innerWidth <= 425) {
        taskContainer.setAttribute("ondragover", "event.preventDefault()")
        taskContainer.style.top = containerPosition + "vh"
        main.appendChild(taskContainer)
        containerPosition += 81
    } else {
        taskContainer.setAttribute("ondragover", "event.preventDefault()")
        taskContainer.style.left = containerPosition + "vw"
        main.appendChild(taskContainer)
        containerPosition += 21
    }
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
    editTitle.setAttribute("title", "Edit the task column's name")
    containerHeader.appendChild(editTitle)
    //* add task
    let addTask = document.createElement("i")
    addTask.setAttribute("class", "fa-sharp fa-solid fa-plus ms-3 type-task")
    addTask.setAttribute("title", "Insert task")
    containerHeader.appendChild(addTask)
    //* column setting
    let settingColumn = document.createElement("i")
    settingColumn.setAttribute("class", "fa-solid fa-gear setting ms-3")
    settingColumn.setAttribute("title", "Setting")
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
            changeColor.setAttribute("title", "Change  Column's Color")
            changeColor.setAttribute("class", "fa-solid fa-palette colorful")
            changeColor.style.position = "relative"
            let colorPalette = document.createElement("input")
            colorPalette.setAttribute('type', "color")
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
                let allContentWDataBg = main.innerHTML
                localStorage.setItem('allTaskAdvanced', allContentWDataBg)


            })
            //* delete column 
            let deleteColumn = document.createElement("i")
            deleteColumn.setAttribute("class", "fa-solid fa-trash delete")
            containerHeader.appendChild(deleteColumn)
            deleteColumn.addEventListener("click", () => {
                let allContainers = main.querySelectorAll(".task-column")
                for (let index = 0; index < allContainers.length; index++) {
                    let element = allContainers[index];
                    if (window.innerWidth <= 425) {
                        let deletedTaskPosition = parseInt(taskContainer.style.top)
                        let currentElementposition = element.style.top
                        currentElementposition = currentElementposition.slice(0, -2)
                        console.log(currentElementposition);

                        if (currentElementposition > deletedTaskPosition) {
                            element.style.top = (currentElementposition - 81) + "vh"
                            containerPosition -= 81
                        }
                    } else {
                        let deletedTaskPosition = taskContainer.style.left
                        let currentElementposition = element.style.left
                        currentElementposition = currentElementposition.slice(0, -2)

                        if (currentElementposition > deletedTaskPosition) {
                            element.style.left = (currentElementposition - 21) + "vw"
                            containerPosition -= 21
                        }
                    }
                    
                }
                taskContainer.remove()

                
                let allContentWoColumn = main.innerHTML
                localStorage.setItem('allTaskAdvanced', allContentWoColumn)
            })
            //* clear verified tasks 
            let clearing = document.createElement("i")
            clearing.setAttribute("class", "fa-solid fa-list-check clear-verified")
            clearing.setAttribute("title", "Clear verified tasks")
            containerHeader.appendChild(clearing)
            clearing.addEventListener("click", () => {
                let allCompletedTasks = taskContainer.querySelectorAll(".reset-task")
                allCompletedTasks.forEach(element => {
                    let divDone = element.parentElement.parentElement
                    taskContainer.removeChild(divDone)
                    let allContentWcleared = main.innerHTML
                    localStorage.setItem('allTaskAdvanced', allContentWcleared)
                });


            })



        } else {
            let changeColor = containerHeader.querySelector(".fa-palette")
            let deleteColumn = containerHeader.querySelector(".fa-trash")
            let clearVerified = containerHeader.querySelector(".clear-verified")

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
            containerHeader.removeChild(clearVerified)
        }
    })

    //* modification de titre
    function edititle() {
        if (editTitle.classList.contains("edit-tittle")) {
            editTitle.removeAttribute("class")
            editTitle.setAttribute("class", "fa-solid fa-check")
            headerTitle.readOnly = false
            headerTitle.value = ""
            headerTitle.focus()

        } else {
            editTitle.removeAttribute("class")
            editTitle.setAttribute("class", "fa-solid fa-pen edit-tittle")
            headerTitle.readOnly = true
            if (headerTitle.value == "") {
                headerTitle.value = "Task Title"
            }


            let allContentWDone = main.innerHTML
            localStorage.setItem('allTaskAdvanced', allContentWDone)


        }
    }
    editTitle.addEventListener("click", () => {
        edititle()

    })
    headerTitle.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            edititle()
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
            insertTask.addEventListener('keyup', (event) => {
                if (event.key === "Enter") {

                }
            })

            //* creation de task
        } else {
            let insertTask = containerHeader.querySelector(".header-task-area")

            //* if the input is filed
            creation()
            function creation() {
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
                                    let allContentWDrag = main.innerHTML
                                    localStorage.setItem('allTaskAdvanced', allContentWDrag)
                                }
                            }
                        });
                    });
                    taskContainer.appendChild(taskDiv)

                    //* creation de task area
                    let taskInput = document.createElement('input')
                    taskInput.classList.add("task-area")
                    taskInput.setAttribute('maxlength', "15")
                    taskInput.setAttribute('value', insertTask.value)
                    taskInput.readOnly = true
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
                            editTask.setAttribute("class", "fa-solid fa-check done-editing-task")
                            taskInput.readOnly = false
                            taskInput.focus()
                        } else {
                            editTask.removeAttribute("class")
                            editTask.setAttribute("class", "fa-solid fa-pen edit-task")
                            taskInput.readOnly = true
                            let allContentWEdit = main.innerHTML
                            localStorage.setItem('allTaskAdvanced', allContentWEdit)
                        }

                    })
                    //* task is completed
                    let taskDone = document.createElement("i")
                    taskDone.setAttribute("class", "fa-solid fa-circle-check task-done")
                    toolsDiv.appendChild(taskDone)
                    taskDone.addEventListener('click', () => {

                        if (taskDone.classList.contains("task-done")) {
                            taskDone.removeAttribute("class")
                            taskDone.setAttribute("class", "fa-sharp fa-solid fa-rotate-left reset-task")
                            taskDiv.style.backgroundColor = "green"
                            taskInput.style.textDecoration = "line-through"
                            taskInput.style.color = "white"
                            let allContentWDone = main.innerHTML
                            localStorage.setItem('allTaskAdvanced', allContentWDone)

                        } else {
                            taskDone.removeAttribute("class")
                            taskDone.setAttribute("class", "fa-solid fa-circle-check task-done")
                            taskDiv.style.backgroundColor = ""
                            taskInput.style.textDecoration = ""
                            taskInput.style.color = ""
                            let allContentWoDone = main.innerHTML
                            localStorage.setItem('allTaskAdvanced', allContentWoDone)
                        }
                    })
                    //* delete task
                    let deleteTask = document.createElement("i")
                    deleteTask.setAttribute("class", "fa-solid fa-trash delete-task")
                    toolsDiv.appendChild(deleteTask)
                    deleteTask.addEventListener("click", () => {
                        let parent = taskDiv.parentElement
                        parent.removeChild(taskDiv)
                        let allContainersWithoutDeleted = main.innerHTML
                        localStorage.setItem('allTaskAdvanced', allContainersWithoutDeleted)
                    })

                    containerHeader.removeChild(insertTask)
                    let allContainersWithTask = main.innerHTML
                    localStorage.setItem('allTaskAdvanced', allContainersWithTask)


                    //*if the input is empty
                } else {
                    inputTask.setAttribute('placeholder', 'This area cant be empty')
                    insertTask.style.color = "orangered"
                    setTimeout(() => {
                        inputTask.removeAttribute('placeholder', 'This area cant be empty')
                        inputTask.setAttribute('placeholder', 'Insert Task Here')
                        insertTask.value = ''
                        insertTask.style.color = ""
                    }, 1500);
                }

            }
        }
    })

    let allTasksContainer = main.innerHTML
    localStorage.setItem('allTaskAdvanced', allTasksContainer)

})


//* changing color
savechange.addEventListener("click", () => {
    let advancedbodygradiant = `linear-gradient(180deg, ${gradiant1.value}, ${gradiant2.value})`
    bodyAdvanced.style.backgroundImage = advancedbodygradiant
    localStorage.setItem("advancedbodygradiant", advancedbodygradiant)

})


//* reset All 
resetTask.addEventListener("click", () => {
    let allContainersExisted = document.querySelectorAll(".task-column")
    allContainersExisted.forEach(element => {
        element.remove()
        containerPosition = 1;
        localStorage.removeItem('allTaskAdvanced')
    });
})

//* Log out 

logout.addEventListener("click", () => {
    localStorage.removeItem("isConnected")
});

