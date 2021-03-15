//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todolist");
const deleteAllBtn = document.querySelector(".footer button")

inputBox.onkeyup = () =>{
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() != 0){ //if user values aren't only spaces
        addBtn.classList.add("active"); //activates the add button
    }
    else {
        addBtn.classList.remove("active"); //unactivates the add button
    }
}
showTasks(); //calling showTasks function

// if user click on the add button
addBtn.onclick= () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    if(getLocalStorage == null){
        listArr = []; //creating blank array
    }
    else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
}

// function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    if(getLocalStorage == null){
        listArr = []; //creating blank array
    }
    else{
        listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = listArr.length; //passing the length value in pending pendingNum
    let newLiTag = '';
    listArr.forEach((element, index) => {
            newLiTag += `<li>${element}<span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank 
}

//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    //after removing the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
}

//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = []; //empty listArr
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling showTasks function
}