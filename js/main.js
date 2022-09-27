
// Знаходжу всі елементи на сторінці
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList =  document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');



form.addEventListener('submit',addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

let tasks = []; 

if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
};

tasks.forEach((task) => {
    const cssClass = task.done ? "task-title task-title--done" : 'task-title';
    // Template для нової  задачі
    const taskTemplate = `<li id = "${task.id}" class="list-group-item d-flex justify-content-between task-item">
                                <span class="${cssClass}">${task.text}</span>
                                <div class="task-item__buttons">
                                    <button type="button" data-action="done" class="btn-action">
                                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                    </button>
                                    <button type="button" data-action="delete" class="btn-action">
                                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                    </button>
                                </div>
                            </li>`
    tasksList.insertAdjacentHTML('beforeend',taskTemplate);

})


checkEmptyList();


function addTask (event) {
     // Відміняє стандартне поводження в об'єкта event
     event.preventDefault();
     // Текст з поля вводу
     const taskText = taskInput.value;

     const newTask = {
        id: Date.now(),
        text: taskText,
        done:false
     }

    //  Add in array new tasks
     tasks.push(newTask);
    // Searching for checked task
     const cssClass = newTask.done ? "task-title task-title--done" : 'task-title';
     // Template для нової  задачі
     const taskTemplate = `<li id = "${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                                 <span class="${cssClass}">${newTask.text}</span>
                                 <div class="task-item__buttons">
                                     <button type="button" data-action="done" class="btn-action">
                                         <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                     </button>
                                     <button type="button" data-action="delete" class="btn-action">
                                         <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                     </button>
                                 </div>
                             </li>`
     // Додаю задачу на сторінку
     tasksList.insertAdjacentHTML('beforeend',taskTemplate);
     
     // Очищаємо поле для вводу задач і залишаємо фокус
     taskInput.value = '';
     // Фокус залигається на input
     taskInput.focus();
     checkEmptyList();
     saveToLocalStorage()
    
}

function deleteTask (event) {
   
    if(event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');

    const id = parentNode.id;
    const index = tasks.findIndex((task) => task.id === id);
    
    tasks.splice(index,1);
    parentNode.remove();
    checkEmptyList();
    saveToLocalStorage()


  
   
}

function doneTask (event) {
    if(event.target.dataset.action !== 'done') return;
   
    const parentNode = event.target.closest('li');
    parentNode.classList.toggle('task-title--done');
    // Search for id of task
    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id);

    task.done = !task.done;
    saveToLocalStorage();
}

function checkEmptyList() {
    if(tasks.length === 0 ){
     const emptyListHTML = `<li id ="emptyList" class="list-group-item empty-list">
                                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                                <div class="empty-list__title">Список справ порожній</div>
                            </li>`
    tasksList.insertAdjacentHTML('afterbegin',emptyListHTML);
    } 
    if(tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
    saveToLocalStorage();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}