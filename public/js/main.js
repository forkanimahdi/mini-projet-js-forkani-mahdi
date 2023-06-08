let bodyAdvanced = document.querySelector(".task-column")
let main = document.querySelector("main")
let advancedCreation = document.querySelector(".button-creation")
let containerHeader = document.querySelector(".task-column")

let containerPosition = 1;


//* creatin de container
advancedCreation.addEventListener("click", () => {
    //* create container
    let taskContainer = document.createElement("div")
    taskContainer.classList.add("task-column")
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
    addTask.setAttribute("class", "fa-sharp fa-solid fa-plus ms-3")
    containerHeader.appendChild(addTask)
    //* color palette
    let changecolor = document.createElement("i")
    changecolor.setAttribute("class", "fa-sharp fa-solid fa-palette ms-3")
    containerHeader.appendChild(changecolor)

    //* modification de titre

    editTitle.addEventListener("click", () => {
        if (editTitle.classList.contains("edit-tittle")) {
            editTitle.removeAttribute("class")
            editTitle.setAttribute("class","fa-solid fa-check")
            headerTitle.readOnly = false
            headerTitle.focus()
        }else{
            editTitle.removeAttribute("class")
            editTitle.setAttribute("class", "fa-solid fa-pen edit-tittle")
            headerTitle.readOnly = true
            heade

        }

    })


})

