//UI task
const form= document.querySelector('#task-form');
const taskList= document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');
loadEventListners();
function loadEventListners()
{//dom load event
    document.addEventListener('DOMContentLoaded',getTasks);
    form.addEventListener('submit',addTask);
    //remove task
    taskList.addEventListener('click',removeTask);
    //clear task
    clearBtn.addEventListener('click',clearTask); 
//filter task
filter.addEventListener('keyup',filterTask);
}
function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.forEach(function(task){
        const li=document.createElement('li');
        li.className='collection-item';
        li.appendChild(document.createTextNode(task));
        const link=document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li); 
    
     })
   
}
//add task
function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');

    }
     
    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li); 
    //store
    storeTaskInLocalStorage(taskInput.value);
    //clear input 
    taskInput.value="";
    e.preventDefault();

}
function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));

    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
   
}

//REMOVE TASK
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        e.target.parentElement.parentElement.remove();
        //remove from ls
        removeTaskFromLocalStorage( e.target.parentElement.parentElement);
    }
}
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
}
}
//clear task
function clearTask(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
        clearTaskFromLocalStorage();
    }
    function clearTaskFromLocalStorage()
    {
        localStorage.clear();
    }
}
//filter task
function filterTask(e)
{ const text=e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item')
.forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
        task.style.display="block";

    }
    else{
        task.style.display="none";
    }
});
}