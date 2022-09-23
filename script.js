// for(let i=0; i<localStorage.length; i++) {
//     const tasksContainer = document.querySelector(".tasks-container");
//     let key1 = localStorage.key(i);
//     // console.log(`${key1}: ${localStorage.getItem(key1)}`);
//     console.log((localStorage.item1))
//     // localStorage[key].forEach(a=>{
        
//     // })

//     tasksContainer.prepend(JSON.parse(localStorage[key1]));
//   }


// localStorage.clear()




const taskTrackerTemplateElement = document.querySelector(".task-tracker-template");
const taskItemElement = document.querySelector(".task-tracker-template .task-item");
const checkbox = document.querySelector('[type="checkbox"]');
const taskTitleInput = document.querySelector(".task-title");
const taskContentInput = document.querySelector(".task-content");
const closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", close);
closeBtn.addEventListener("click", hideTitleAndClose);
taskContentInput.addEventListener("focus", showTitleAndClose);
taskContentInput.addEventListener("keydown", e => newListItem(e, taskTrackerTemplateElement));
checkbox.addEventListener("change", e => lineThrough(checkbox));

//clear all the value in the input after close
function close(){
    let flag = 0;
    
    if(taskTrackerTemplateElement.children[0].value) flag=1;
    else{
        let index=0;
        while(taskTrackerTemplateElement.children[1].children[index]){
            if(taskTrackerTemplateElement.children[1].children[index].children[1].value)    flag=1;
            index++;
        }
    }
    if(flag){
        createNewTask();
        taskTrackerTemplateElement.children[0].value = "";
        taskTrackerTemplateElement.children[1].children[0].children[0].checked = false;
        lineThrough(taskTrackerTemplateElement.children[1].children[0].children[0]);
        taskTrackerTemplateElement.children[1].children[0].children[1].value = "";
    
        while(taskTrackerTemplateElement.children[1].children[1]){
            taskTrackerTemplateElement.children[1].children[1].remove();
        }
    }
   

   
}
let i = 0;
let item;
//creates a new task and prepend it to tasks-container
function createNewTask(){
    const tasksContainer = document.querySelector(".tasks-container");
    const newTask = taskTrackerTemplateElement.cloneNode(true);
    newTask.classList.add("task");

    const textInputs = newTask.querySelectorAll(".task-content");
    textInputs.forEach(textInput => {
        textInput.addEventListener("keydown", e => newListItem(e, newTask));
    })

    const checkboxes = newTask.querySelectorAll('[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", e => lineThrough(checkbox))
    })
  
    // item = `item${i++}`
    // localStorage.item1 = JSON.stringify(newTask);
    // console.log((newTask))

    tasksContainer.prepend(newTask);
    
}

//adds a new input when enter is pressed
function newListItem(e, targetPlace){
    if(e.key == "Enter"){
        const taskItemsDiv = targetPlace.querySelector(".task-items");
        const taskItemDiv = document.createElement("div");
        taskItemDiv.classList.add("task-item");
        const checkboxInput = document.createElement("input");
        checkboxInput.setAttribute("type", "checkbox");
        checkboxInput.addEventListener("change", e => lineThrough(checkboxInput))
        const textInput = document.createElement("input");
        textInput.setAttribute("type", "text");
        textInput.classList.add("task-content");
        textInput.setAttribute("tabindex", "-1");
        textInput.addEventListener("keydown", e => newListItem(e, targetPlace));
        
        taskItemDiv.append(checkboxInput);
        taskItemDiv.append(textInput);
        
        if(e.target.parentElement.nextElementSibling != null){
            taskItemsDiv.insertBefore(taskItemDiv, e.target.parentElement.nextElementSibling);
        }
        else
            taskItemsDiv.append(taskItemDiv);
    }
    // if(e.key == "ArrowUp"){
    //     if(e.target.parentElement.nextElementSibling){
    //         e.target.parentElement.nextElementSibling.focus();
    //     }
    // }
}


function lineThrough(checkbox){
    if(checkbox.checked) checkbox.nextElementSibling.style.textDecoration = "line-through";
    else checkbox.nextElementSibling.style.textDecoration = null;
}

// function modifyDisplay(place){
//     if(place == taskContentInput) taskTitleInput.style.display = "block";
//     else taskTitleInput.style.display = "none";
// }
function showTitleAndClose(){
    taskTitleInput.style.display = "block";
    closeBtn.style.display = "block";
    taskTrackerTemplateElement.style.paddingBottom = "50px";
}
function hideTitleAndClose(){
    taskTitleInput.style.display = "none";
    closeBtn.style.display = "none";
    taskTrackerTemplateElement.style.paddingBottom = "0";
}



