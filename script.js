const addbtn = document.querySelector(".input button");
const input = document.querySelector(".input input");
const todolist = document.querySelector(".todo");
const deleteAll = document.querySelector(".footer button");


//enable/disable add btn
input.onkeyup = () => {
  let userdata = input.value; //getting user data 
  if(userdata.trim() != 0){ //if data are not only spaces
    addbtn.classList.add("active");//adding active class
  }
  else{
    addbtn.classList.remove("active");
  }
}

showTask()

//getting data to localstorage
addbtn.onclick = () => {
  let userdata = input.value;
  let getLocalStorage = localStorage.getItem("New todo");
  if(getLocalStorage == null){
    listArr = []; //blank list
  }
  else{
    listArr = JSON.parse(getLocalStorage); //transforming json string to js object
  }
  listArr.push(userdata);
  localStorage.setItem("New todo", JSON.stringify(listArr)); //transforming js object to json string
  showTask();
  addbtn.classList.remove("active");
}

//add data to list
function showTask(){
  let getLocalStorage = localStorage.getItem("New todo");
  if(getLocalStorage == null){
    listArr = []; //blank list
  }
  else{
    listArr = JSON.parse(getLocalStorage); //transforming json string to js object
  }
  const pendindNum = document.querySelector(".pending");
  pendindNum.textContent = listArr.length;

  if(listArr.length > 0){
    deleteAll.classList.add("active");
  }
  else{
    deleteAll.classList.remove("active");
  }
  let newLiTag = '';
  listArr.forEach((element,index) => {
    newLiTag += `<li>${element}<span onclick = "deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todolist.innerHTML = newLiTag; // add new li tag
  input.value = ""; //blank inputbox after adding
}

//delete the todo
function deleteTask(index){
  let getLocalStorage = localStorage.getItem("New todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index,1); // removing data by index

  //updating data
  localStorage.setItem("New todo", JSON.stringify(listArr)); //transforming js object to json string
  showTask();
}

deleteAll.onclick = () =>{
  listArr = []; 
  localStorage.setItem("New todo", JSON.stringify(listArr)); //transforming js object to json string
  showTask();
}