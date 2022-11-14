// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
let date = document.getElementById("date");

// onkeyup event
inputBox.onkeyup = () => {
  let userEnteredValue = [inputBox.value, date.value];
  if (userEnteredValue[0].trim() != 0 && userEnteredValue[1] != "") {
    //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};
date.onchange = () => {
  let userEnteredValue = [inputBox.value, date.value];
  if (userEnteredValue[0].trim() != 0 && userEnteredValue[1] != "") {
    //if the date value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};

showTasks(); //calling showTask function

addBtn.onclick = () => {
  //when user click on plus icon button
  let userEnteredValue = [inputBox.value, date.value]; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
  date.value = "";
};

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if (listArray.length > 0) {
    //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  } else {
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  // const date = new Date();
  // const options = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  listArray.forEach((element, index) => {
    newLiTag += `<li><div><span>${element[0]}</span><span class="time">${element[1]}</span></div><span class="icon" onclick="deleteTask(${index})"><img style="width:100%;max-width:20px;" title="إزالة" src="../png/delete.png" alt="delete"></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
    listArray = []; //create a blank array
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
};
