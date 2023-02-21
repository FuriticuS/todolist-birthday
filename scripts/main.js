const tasks = [
    {
        id: Math.random(),
        name: 'task 1',
        date: '12.31.2000',
        completed: true,
        today: false,
    },
    {
        id: Math.random(),
        name: 'task 2',
        date: '15.10.2000',
        completed: false,
        today: true,
    },
    {
        id: Math.random(),
        name: 'task 3',
        date: '12.31.1999',
        completed: false,
        today: false,
    }
]

const nameFriend = document.getElementById('name-friend');
const dateFriend = document.getElementById('date-friend');
const addFriendsBtn = document.getElementById('add-friend');
const birthdayFriends = document.querySelector('.birthday-friends');
let arrayTasks = [];

//load page
window.addEventListener('load', init);

//initializing
function init() {
    //add localstorage on arrayTasks or []
    arrayTasks = tasks || [];

    console.log(arrayTasks);
    renderTasks(arrayTasks);
    completedTask(arrayTasks);
}

//render block birthday-friends
function renderTasks(tasks) {
    const fragmentOfElement = createTasksFragment(tasks);

    //create h2
    let birthdayFriendsHead = document.createElement('h2');
    birthdayFriendsHead.textContent = 'Дни рождения друзей:';

    //render h2 +  all tasks
    birthdayFriends.append(birthdayFriendsHead, fragmentOfElement);
}

//create tasks fragment
function createTasksFragment(tasks) {
    const fragment = document.createDocumentFragment();

    tasks.forEach(item => {
       fragment.append(createTasksElement(item))
    });
    return fragment;
}

//create tasks element
function createTasksElement({id, name, date, completed, today}){

    // create li + id + class for completed
    const li = document.createElement('li');
    completed ? li.classList.add("birthday-friends-item", "finish") : li.classList.add("birthday-friends-item");
    today ? li.classList.add("birthday-friends-item", "today") : li.classList.add("birthday-friends-item");
    li.id = id;

    // create p + text
    const p = document.createElement('p');
    const span = document.createElement('span');
    p.classList.add('text');
    span.classList.add('date');
    span.textContent = `${date}`;
    p.textContent = `${name} дата: `;
    p.append(span);

    // add buttons
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('birthday-friends-delete-btn');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Изменить';
    editBtn.classList.add('birthday-friends-edit-btn');

    //add li element
    li.append(p,editBtn, deleteBtn);

    return li;
}

// add new tasks
addFriendsBtn.addEventListener('click', function (){
    const isValid = validationInput(nameFriend, dateFriend);
    if(!isValid){
        return;
    }

    createNewMan(nameFriend.value,dateFriend.value);
})

//validation input
function validationInput(nameFriend, dateFriend){

    if(!nameFriend.value.trim().length){
        nameFriend.classList.add('error');
        nameFriend.value = 'Вы не указали имя';
        return false;
    }
    else if(!dateFriend.value.trim().length){
        dateFriend.classList.add('error');
        return false;
    }
    else{
        nameFriend.classList.remove('error');
        dateFriend.classList.remove('error');
    }
    return true;
}

//create new man
function createNewMan(nameFriend,dateFriend) {

    const newFriend = createNewTask(nameFriend,dateFriend)
    arrayTasks.push(newFriend);

    // add task on page
    return birthdayFriends.insertAdjacentElement('beforeend', createTasksElement(newFriend));
}

// create new task
function createNewTask(name, date){
    //date verification
    let dateNow = new Date();
    let today = dateNow.getFullYear() + '-' + String(dateNow.getMonth() + 1).padStart(2, '0') + '-' + String(dateNow.getDate()).padStart(2, '0');

    // new task
    return {
        id: Math.random(),
        name,
        date,
        completed: false,
        today: date === today ? true : false,
    }
}

//functions delete edit
birthdayFriends.addEventListener('click', function ({target}){
    const targetAtr = target.classList.value;

    switch (targetAtr) {
        case 'birthday-friends-delete-btn':
            deleteBtn(target)
            break;
        case 'birthday-friends-edit-btn':
            editBtn(target)
            break;
    }
})

// delete btn on one li
function deleteBtn(target){
    const elemDelete = target.closest('li');
    if(elemDelete.classList.contains('birthday-friends-item')){
        elemDelete.remove();
    }
}

// edit btn on one li
function editBtn(target){

    const isValid = validationInput(nameFriend, dateFriend);
    if(!isValid){
        return;
    }
    const elemText = target.closest('li').querySelector('.text');
    let spanDate = document.createElement('span');
    spanDate.classList.add('date');
    spanDate.textContent = `${dateFriend.value}`;
    elemText.textContent = `${nameFriend.value} дата: `;
    elemText.appendChild(spanDate);
}

// completed one li
function completedTask(friends){
    console.log(friends);
}

