const addBtn = document.querySelector(".AddItemBtn")
addBtn.addEventListener("click", addItem)
const events = document.querySelector(".AddedItems")

//Check for saved items in memory
document.addEventListener("load",getToDos)
//Check for saved items in memory
function getToDos(){
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos !== null){
        for(i = 0; i < todos.length; i++) {
            //        Create Items
            const newItem = document.createElement("div")
            newItem.classList.add("item")
            newItem.innerHTML = "<i class=\"fa-2x fa-solid delete fa-trash-can\"></i> <i class=\" fa-2x fa-solid completed fa-check\"></i> <h3 class='item-text'>" + todos[i] + "</h3>"
            newItem.addEventListener("click", handleClick)
            events.appendChild(newItem)
        }
    }
}

//Keyboard Enter Press
document.addEventListener("keydown", function(event){
    if(event.code === "Enter")
//        Enter key
        addItem()
})

function validate(newInput){
    if(newInput.value === "")
        return 0
    const items = document.querySelectorAll(".item-text")
    if(typeof items !== undefined)
        for(let i = 0; i < items.length; i++)
            if(items[i].textContent === newInput.value)
                return items[i]
    return 1
}
function recolor(item){
    item.parentElement.classList.remove("red")
}

function addItem(){
    const input = document.querySelector("#Item")

    //Validation
    let validationResult = validate(input)
    if(validationResult !== 1) {
        validationResult.parentElement.classList.add("red")
        setTimeout(function(){recolor(validationResult)},700)
        input.value = ""
    }
    else {
        localStorageAdd(input.value)
        const newItem = document.createElement("div")
        newItem.classList.add("item")
        newItem.innerHTML = "<i class=\"fa-2x fa-solid delete fa-trash-can\"></i> <i class=\" fa-2x fa-solid completed fa-check\"></i> <h3 class='item-text'>" + input.value + "</h3>"
        newItem.addEventListener("click", handleClick)
        events.appendChild(newItem)
//    Clear the text inside the input form
        input.value = ""
    }
}
function handleClick(event){
    if(event.target.classList[2] === "delete") {
        event.target.parentElement.remove()
    //Remove from local storage as well
        localStorageRemove(event.target.parentElement)
    }
    else if(event.target.classList[2] === "completed")
        event.target.parentElement.classList.add("done")
}

function localStorageAdd(todo){
    let todos
    if(localStorage.getItem('todos') === null)
        todos = []
    else
        todos = JSON.parse(localStorage.getItem("todos"))
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function localStorageRemove(item){
    let todos = JSON.parse(localStorage.getItem("todos"))
    for(i = 0; i < todos.length ; i++) {
        console.log(todos[i],item.textContent)
        if (todos[i].localeCompare(item.textContent)) {
            todos.splice(i, 1)
            break
        }
    }
    localStorage.setItem("todos",JSON.stringify(todos))
}


