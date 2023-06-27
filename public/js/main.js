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


let restoredData = localStorage.getItem('allTaskAdvanced')

main.innerHTML = restoredData

let containerPosition = 1;

let restoredPosition = localStorage.getItem('updatedPosition')

containerPosition = restoredPosition

//* creatin de container
advancedCreation.addEventListener("click", () => {

    //* create container
    let taskContainer = document.createElement("div")
    taskContainer.classList.add("task-column")

    if (window.innerWidth <= 425) {
        taskContainer.setAttribute("ondragover", "event.preventDefault()")
        taskContainer.style.top = containerPosition + "rem"
        main.appendChild(taskContainer)
        containerPosition += 41
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
                let thePosition = containerPosition
                localStorage.setItem('updatedPosition', thePosition)



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
                        currentElementposition = currentElementposition.slice(0, -3)

                        if (currentElementposition > deletedTaskPosition) {
                            element.style.top = (currentElementposition - 41) + "rem"
                            containerPosition -= 41
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
                let thePosition = containerPosition
                localStorage.setItem('updatedPosition', thePosition)
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
                    let thePosition = containerPosition
                    localStorage.setItem('updatedPosition', thePosition)
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
            let thePosition = containerPosition
            localStorage.setItem('updatedPosition', thePosition)


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
                                    let thePosition = containerPosition
                                    localStorage.setItem('updatedPosition', thePosition)
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
                            let thePosition = containerPosition
                            localStorage.setItem('updatedPosition', thePosition)
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
                            let thePosition = containerPosition
                            localStorage.setItem('updatedPosition', thePosition)

                        } else {
                            taskDone.removeAttribute("class")
                            taskDone.setAttribute("class", "fa-solid fa-circle-check task-done")
                            taskDiv.style.backgroundColor = ""
                            taskInput.style.textDecoration = ""
                            taskInput.style.color = ""
                            let allContentWoDone = main.innerHTML
                            localStorage.setItem('allTaskAdvanced', allContentWoDone)
                            let thePosition = containerPosition
                            localStorage.setItem('updatedPosition', thePosition)
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
                        let thePosition = containerPosition
                        localStorage.setItem('updatedPosition', thePosition)
                    })

                    containerHeader.removeChild(insertTask)
                    let allContainersWithTask = main.innerHTML
                    localStorage.setItem('allTaskAdvanced', allContainersWithTask)
                    let thePosition = containerPosition
                    localStorage.setItem('updatedPosition', thePosition)


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
    let thePosition = containerPosition
    localStorage.setItem('updatedPosition', thePosition)

})


//* changing color
savechange.addEventListener("click", () => {
    if (window.innerWidth <= 425) {
        let advancedbodygradiant = `linear-gradient(90deg, ${gradiant1.value}, ${gradiant2.value})`
        bodyAdvanced.style.backgroundImage = advancedbodygradiant
        localStorage.setItem("advancedbodygradiant", advancedbodygradiant)
    } else {
        let advancedbodygradiant = `linear-gradient(180deg, ${gradiant1.value}, ${gradiant2.value})`
        bodyAdvanced.style.backgroundImage = advancedbodygradiant
        localStorage.setItem("advancedbodygradiant", advancedbodygradiant)
    }


})


//* reset All 
resetTask.addEventListener("click", () => {
    let confirming = confirm("Are you sure ? you will lose all Data !")
    if (confirming) {
        let allContainersExisted = document.querySelectorAll(".task-column")
        allContainersExisted.forEach(element => {
            element.remove()
            containerPosition = 1;
            localStorage.removeItem('allTaskAdvanced')
            localStorage.removeItem('updatedPosition')
        });
        localStorage.removeItem("advancedbodygradiant")
        bodyAdvanced.style.backgroundColor = ""
    }
})

//* Log out 

logout.addEventListener("click", () => {
    localStorage.removeItem("isConnected")
});



// *restored data function 
// let iconSetting = document.querySelectorAll(".setting")
// let iconInsertNew = document.querySelectorAll(".type-task")
// let iconEditTittle = document.querySelectorAll(".edit-tittle")
// let headerinput = document.querySelectorAll(".header-input")
// let iconchangeColor = document.querySelectorAll(".colorful")
// let iconSetting = document.querySelectorAll(".")
// let iconSetting = document.querySelectorAll(".")
// let iconSetting = document.querySelectorAll(".")

let tasks = document.querySelectorAll('.task-column')

tasks.forEach(element => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-tittle')) {
            let editTitle = e.target
            let headerTitle = e.target.previousElementSibling
            editTitle.removeAttribute("class")
            editTitle.setAttribute("class", "fa-solid fa-check done-editing")
            headerTitle.readOnly = false
            headerTitle.value = ""
            headerTitle.focus()
        } else if (e.target.classList.contains('done-editing')) {
            let editTitle = e.target
            let headerTitle = e.target.previousElementSibling
            editTitle.removeAttribute("class")
            editTitle.setAttribute("class", "fa-solid fa-pen edit-tittle")
            headerTitle.readOnly = true
            if (headerTitle.value == "") {
                headerTitle.value = "Task Title"
            }


            let allContentWDone = main.innerHTML
            localStorage.setItem('allTaskAdvanced', allContentWDone)
            let thePosition = containerPosition
            localStorage.setItem('updatedPosition', thePosition)
        } else if (e.target.classList.contains('type-task')) {
            let addTask = e.target
            let editTitle = addTask.previousElementSibling
            let headerTitle = editTitle.previousElementSibling
            let settingColumn = addTask.nextElementSibling
            let containerHeader = e.target.parentElement
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
        } else if (e.target.classList.contains('create-task')) {

            //* if the input is filed
            creation()
            function creation() {
                let addTask = e.target
                let editTitle = addTask.previousElementSibling
                let headerTitle = editTitle.previousElementSibling
                let settingColumn = addTask.nextElementSibling
                let insertTask = settingColumn.nextElementSibling
                let containerHeader = e.target.parentElement
                let taskContainer = containerHeader.parentElement

                if (insertTask.value != 0) {
                    addTask.removeAttribute("class")
                    addTask.setAttribute("class", "fa-sharp fa-solid fa-plus ms-3 type-task")
                    insertTask.remove()
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
                                    let thePosition = containerPosition
                                    localStorage.setItem('updatedPosition', thePosition)
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
                            editTask.setAttribute("class", "fa-solid fa-check")
                            taskInput.readOnly = false
                            taskInput.focus()
                        } else {
                            editTask.removeAttribute("class")
                            editTask.setAttribute("class", "fa-solid fa-pen edit-task")
                            taskInput.readOnly = true
                            let allContentWEdit = main.innerHTML
                            localStorage.setItem('allTaskAdvanced', allContentWEdit)
                            let thePosition = containerPosition
                            localStorage.setItem('updatedPosition', thePosition)
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
                            let thePosition = containerPosition
                            localStorage.setItem('updatedPosition', thePosition)

                        } else {
                            taskDone.removeAttribute("class")
                            taskDone.setAttribute("class", "fa-solid fa-circle-check task-done")
                            taskDiv.style.backgroundColor = ""
                            taskInput.style.textDecoration = ""
                            taskInput.style.color = ""
                            let allContentWoDone = main.innerHTML
                            localStorage.setItem('allTaskAdvanced', allContentWoDone)
                            let thePosition = containerPosition
                            localStorage.setItem('updatedPosition', thePosition)
                        }
                    })
                    //* delete task
                    let deleteTask = document.createElement("i")
                    deleteTask.setAttribute("class", "fa-solid fa-trash")
                    toolsDiv.appendChild(deleteTask)
                    deleteTask.addEventListener("click", () => {
                        let parent = taskDiv.parentElement
                        parent.removeChild(taskDiv)
                        let allContainersWithoutDeleted = main.innerHTML
                        localStorage.setItem('allTaskAdvanced', allContainersWithoutDeleted)
                        let thePosition = containerPosition
                        localStorage.setItem('updatedPosition', thePosition)
                    })

                    // containerHeader.removeChild(insertTask)
                    let allContainersWithTask = main.innerHTML
                    localStorage.setItem('allTaskAdvanced', allContainersWithTask)
                    let thePosition = containerPosition
                    localStorage.setItem('updatedPosition', thePosition)


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
        } else if (e.target.classList.contains('edit-task')) {
            let editTask = e.target
            let taskInput = editTask.parentElement.previousElementSibling
            editTask.removeAttribute("class")
            editTask.setAttribute("class", "fa-solid fa-check done-editing-task")
            taskInput.readOnly = false
            taskInput.focus()
        } else if (e.target.classList.contains('done-editing-task')) {
            let editTask = e.target
            let taskInput = editTask.parentElement.previousElementSibling
            editTask.removeAttribute("class")
            editTask.setAttribute("class", "fa-solid fa-pen edit-task")
            taskInput.readOnly = true
            let allContentWEdit = main.innerHTML
            localStorage.setItem('allTaskAdvanced', allContentWEdit)
            let thePosition = containerPosition
            localStorage.setItem('updatedPosition', thePosition)
        } else if (e.target.classList.contains('task-done')) {
            let taskDone = e.target
            let taskInput = taskDone.parentElement.previousElementSibling
            let taskDiv = taskInput.parentElement
            taskDone.removeAttribute("class")
            taskDone.setAttribute("class", "fa-sharp fa-solid fa-rotate-left reset-task")
            taskDiv.style.backgroundColor = "green"
            taskInput.style.textDecoration = "line-through"
            taskInput.style.color = "white"
            let allContentWDone = main.innerHTML
            localStorage.setItem('allTaskAdvanced', allContentWDone)
            let thePosition = containerPosition
            localStorage.setItem('updatedPosition', thePosition)
        } else if (e.target.classList.contains('reset-task')) {
            let taskDone = e.target
            let taskInput = taskDone.parentElement.previousElementSibling
            let taskDiv = taskInput.parentElement

            taskDone.removeAttribute("class")
            taskDone.setAttribute("class", "fa-solid fa-circle-check task-done")
            taskDiv.style.backgroundColor = ""
            taskInput.style.textDecoration = ""
            taskInput.style.color = ""
            let allContentWoDone = main.innerHTML
            localStorage.setItem('allTaskAdvanced', allContentWoDone)
            let thePosition = containerPosition
            localStorage.setItem('updatedPosition', thePosition)
        } else if (e.target.classList.contains('delete-task')) {
            let taskDiv = e.target.parentElement.parentElement
            let parent = taskDiv.parentElement
            parent.removeChild(taskDiv)
            let allContainersWithoutDeleted = main.innerHTML
            localStorage.setItem('allTaskAdvanced', allContainersWithoutDeleted)
            let thePosition = containerPosition
            localStorage.setItem('updatedPosition', thePosition)
        } else if (e.target.classList.contains("setting")) {
            let settingColumn = e.target
            let addTask = settingColumn.previousElementSibling
            let editTitle = addTask.previousElementSibling
            let headerTitle = editTitle.previousElementSibling
            let containerHeader = settingColumn.parentElement


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
                let taskContainer = changeColor.parentElement.parentElement
                taskContainer.style.backgroundColor = colorPalette.value
                taskContainer.setAttribute("data-background", colorPalette.value)
                let allContentWDataBg = main.innerHTML
                localStorage.setItem('allTaskAdvanced', allContentWDataBg)
                let thePosition = containerPosition
                localStorage.setItem('updatedPosition', thePosition)


            })
            //* delete column 
            let deleteColumn = document.createElement("i")
            deleteColumn.setAttribute("class", "fa-solid fa-trash delete")
            containerHeader.appendChild(deleteColumn)
            deleteColumn.addEventListener("click", () => {
                let allContainers = main.querySelectorAll(".task-column")
                let taskContainer = e.target.parentElement.parentElement
                for (let index = 0; index < allContainers.length; index++) {
                    let element = allContainers[index];
                    if (window.innerWidth <= 425) {
                        let deletedTaskPosition = parseInt(taskContainer.style.top)
                        let currentElementposition = element.style.top
                        currentElementposition = currentElementposition.slice(0, -3)

                        if (currentElementposition > deletedTaskPosition) {
                            element.style.top = (currentElementposition - 41) + "rem"
                            containerPosition -= 41
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
                let thePosition = containerPosition
                localStorage.setItem('updatedPosition', thePosition)
            })
            //* clear verified tasks 
            let clearing = document.createElement("i")
            clearing.setAttribute("class", "fa-solid fa-list-check clear-verified")
            clearing.setAttribute("title", "Clear verified tasks")
            e.target.parentElement.appendChild(clearing)
            clearing.addEventListener("click", () => {
                let taskContainer = e.target.parentElement.parentElement
                let allCompletedTasks = taskContainer.querySelectorAll(".reset-task")
                allCompletedTasks.forEach(element => {
                    let divDone = element.parentElement.parentElement
                    taskContainer.removeChild(divDone)
                    let allContentWcleared = main.innerHTML
                    localStorage.setItem('allTaskAdvanced', allContentWcleared)
                    let thePosition = containerPosition
                    localStorage.setItem('updatedPosition', thePosition)
                });


            })



        } else {
            // let changeColor = containerHeader.querySelector(".fa-palette")
            // let deleteColumn = containerHeader.querySelector(".fa-trash")
            // let clearVerified = containerHeader.querySelector(".clear-verified")

            // settingColumn.removeAttribute("class")
            // settingColumn.setAttribute("class", "fa-solid fa-gear ms-3 setting")
            // editTitle.style.display = 'initial'
            // addTask.style.display = 'initial'
            // headerTitle.style.display = 'initial'
            // containerHeader.style.display = "block"
            // containerHeader.style.alignItems = ""
            // containerHeader.style.justifyContent = ""
            // containerHeader.removeChild(changeColor)
            // containerHeader.removeChild(deleteColumn)
            // containerHeader.removeChild(clearVerified)
        }
    })



})
