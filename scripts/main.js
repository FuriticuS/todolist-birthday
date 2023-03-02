const nameFriend = document.getElementById('name-friend');
const dateFriend = document.getElementById('date-friend');
const addFriendsBtn = document.getElementById('add-friend');
const birthdayFriends = document.querySelector('.birthday-friends');
let arrayTasks = [];
let editLi = false;

//load page
window.addEventListener('load', init);

//initializing
function init() {
    // load localstorage array of tasks
    const tasks = JSON.parse(localStorage.getItem('birthday')) || [];

    //add localstorage on arrayTasks or []
    arrayTasks = tasks;
    sortArrayTasks(arrayTasks);
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
    return fragment;
}

//create tasks element
function createTasksElement({id, name, date, completed, today}) {

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
    li.append(p, editBtn, deleteBtn);

    return li;
}

// add new tasks
addFriendsBtn.addEventListener('click', function () {
    if(!editLi){
        const isValid = validationInput(nameFriend, dateFriend);
        if (!isValid) {
            return;
        }
        createNewMan(nameFriend.value, dateFriend.value);
    }
})

//validation input
function validationInput(nameFriend, dateFriend) {

    if (!nameFriend.value.trim().length) {
        nameFriend.classList.add('error');
        nameFriend.value = 'Вы не указали имя';
        return false;
    } else if (!dateFriend.value.trim().length) {
        dateFriend.classList.add('error');
        return false;
    } else {
        nameFriend.classList.remove('error');
        dateFriend.classList.remove('error');
        return true;
    }

}

//create new man
function createNewMan(nameFriend, dateFriend) {

    const newFriend = createNewTask(nameFriend, dateFriend)
    arrayTasks.push(newFriend);

    // add task on page
    return birthdayFriends.insertAdjacentElement('beforeend', createTasksElement(newFriend));
}

// create new task
function createNewTask(name, date) {
    //date verification
    let formatDate = `${date.split('-')[2]}.${date.split('-')[1]}.${date.split('-')[0]}`

    let timeDate = +moment(formatDate, 'YYYY-MM-DD').format('X');
    let today = +moment(new Date()).format('X');

    // получить getDate(); и сравнить
    let todayDay = new Date().getDay();
    if (today === timeDate) {
        todayDay = true;
    }

    // new task
    return {
        id: Math.random(),
        name,
        date: formatDate,
        completed: today > timeDate ? true : false,
        today: moment(formatDate, ('DD.MM.YYYY')).format('DD.MM.YYYY') === moment().format('DD.MM.YYYY') ? true : false,
    }
}

//functions delete edit
birthdayFriends.addEventListener('click', function ({target}) {
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
function deleteBtn(target) {
    const elemDelete = target.closest('li');
    if (elemDelete.classList.contains('birthday-friends-item')) {
        elemDelete.remove();
    }

    const elemId = elemDelete.id;
    arrayTasks.findIndex(item => {
        if (item.id === +elemId) {
           return arrayTasks.splice(item.id,1);
        }
    })

}

// edit btn on one li
function editBtn(target) {
    editLi = true;
    target.closest('li').style = "border: 2px solid red";

    const isValid = validationInput(nameFriend, dateFriend);
    if (!isValid) {
        return;
    }
    editBtnTaks(target);

    target.closest('li').style = "border: none";
    editLi = false;
}
function editBtnTaks(target){
    const elemText = target.closest('li').querySelector('.text');
    let spanDate = document.createElement('span');
    spanDate.classList.add('date');
    spanDate.textContent = `${moment(dateFriend.value, 'YYYY-MM-DD').format('DD.MM.YYYY')}`;
    elemText.textContent = `${nameFriend.value} дата: `;
    elemText.appendChild(spanDate);

    let nameEdit = nameFriend.value;
    let dateEdit = spanDate.textContent;

    const elemId = target.closest('li').id;
    arrayTasks = arrayTasks.map(item => {
        if (item.id === +elemId) {
            return {
                ...item,
                name: nameEdit,
                date: dateEdit
            }
        }else{return item}
    })
}

// sort friends birthday
function sortArrayTasks(arrayTasks) {
    if (arrayTasks != null){
        arrayTasks.sort(function (a, b) {
            let item1 = +moment(a.date, 'DD.MM.YYYY').format('X');
            let item2 = +moment(b.date, 'DD.MM.YYYY').format('X');
            return item1 - item2;
        })
    }

}

//load localstorage items
window.addEventListener('unload', () => {
    localStorage.setItem('birthday', JSON.stringify(arrayTasks));
})
