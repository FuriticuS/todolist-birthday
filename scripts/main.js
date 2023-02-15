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
    },
    {
        id: Math.random(),
        name: 'task 3',
        date: '10.24.1239',
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

    renderTasks(arrayTasks);
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
    console.log(fragment)
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
    p.textContent = `${name} дата: ${date}`;

    // add buttons
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('birthday-friends-delete-btn');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Изменить';
    editBtn.classList.add('birthday-friends-edit-btn');

    //add li element
    li.append(p, editBtn, deleteBtn);

    return li;
}

// add new tasks
addFriendsBtn.addEventListener('click', function (e){
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
    }

    if(!dateFriend.value.trim().length){
        dateFriend.classList.add('error');
    }
}

//create new man
function createNewMan(nameFriend,dateFriend) {
    arrayTasks.push(createNewTask(nameFriend,dateFriend));
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
