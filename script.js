const baseUrl = 'https://api.slingacademy.com/v1/sample-data';

// let responce;
let staffsListForRender = [];
let usersFromDB;

const staffsList = async function getStaffsFromDB(limit=10, offset=0) {    
    const url = `/users?offset=${offset}&limit=${limit}`;
    const responce = await fetch(baseUrl + url);
    let data = await responce.json();
    if (!responce.ok) {
        console.log("Данные на сервере отсутсуют");
        return null;
    } 
    staffsListForRender = [];
    usersFromDB = [...data.users];
    preRenderTableOfStaff(usersFromDB);
    renderTableOfStaff(staffsListForRender);
}

let limit = 5;
let offset = 0;
staffsList(limit, offset);

const modal = document.getElementById('modal');
const filterInput = document.getElementById('filter');
const tableBody = document.getElementById('table-body');
const form = document.querySelector('form');
const saveBtn = document.querySelector('.save-modal');
const btnOpenModal = document.querySelector('.open-modal');
// const errorLastName = document.getElementById('error-last_name');
// const errorAge = document.getElementById('error-age');
// const errorDate = document.getElementById('error-date');
// const errorState = document.getElementById('error-state');
// const errorStreet = document.getElementById('error-street');
// const errorSkills = document.getElementById('error-skills');






saveBtn.addEventListener('click', saveForm);
btnOpenModal.addEventListener('click', modalToOpen);

// находим кнопки закрытия модалки и навешиваем событие закрытия
document.querySelectorAll('[data-bs-dismiss="modal"]')
    .forEach(btn => { btn.addEventListener('click', modalToClose); });

function modalToOpen() {
    modal.classList.add('show');
}

function modalToClose() {
    modal.classList.remove('show');
}

// получаем строку таблицы сотрудника и выводим её в таблицу:
function getStaffItem(staffObj) {
    const $tableRow = document.createElement("tr"),
        $tableDataId = document.createElement("td"),
        $tableDataName = document.createElement("td"),
        $tableDataLastName = document.createElement("td"),
        $tableDataAge = document.createElement("td"),
        $tableDataGender = document.createElement("td"),
        $tableDataState = document.createElement("td"),
        $tableDataStreet = document.createElement("td"),
        $tableDeleteStaff = document.createElement("td"),
        $deleteButton = document.createElement("button");
        $deleteButton.classList.add('btn-close');
  
    $tableDataId.textContent = staffObj.id;
    $tableDataName.textContent = staffObj.first_name;
    $tableDataLastName.textContent = staffObj.last_name;
    $tableDataAge.textContent = staffObj.age;
    $tableDataGender.textContent = staffObj.gender;
    $tableDataState.textContent = staffObj.state;
    $tableDataStreet.textContent = staffObj.street;

    $tableRow.append($tableDataId);
    $tableRow.append($tableDataName);
    $tableRow.append($tableDataLastName);
    $tableRow.append($tableDataAge);
    $tableRow.append($tableDataGender);
    $tableRow.append($tableDataState);
    $tableRow.append($tableDataStreet);
    $tableDeleteStaff.append($deleteButton)
    $tableRow.append($tableDeleteStaff);

    tableBody.append($tableRow);

    // УДАЛЕНИЕ:
    // присваеваем id студента кнопке:
    $deleteButton.setAttribute("id", staffObj.id);

    // добавляем обработчик на кнопку - удаление задачи
    $deleteButton.addEventListener("click", function () {
        onDelete({ staffObj, element: $tableRow });
    });

    $tableRow.setAttribute("id", staffObj.id);
    return $tableRow;
}

// удаление строки таблицы
function onDelete({ staffObj, element }) {
    if (!confirm(`Вы точно хотите удалить сотрудника ${staffObj.name} c ID № ${staffObj.id}?`)) {
      return;
    }
    element.remove();
    staffsListForRender = staffsListForRender.filter(x => x.id != staffObj.id);
    renderTableOfStaff(staffsListForRender);

    fetch(`https://jsonplaceholder.typicode.com/posts/${staffObj.id}`, {
        method: "DELETE",
    })
    .then((response) => {
        if (response.ok) {
            console.log(`статус запроса: ${response.status}`);
            return response.json();

        } else {
            throw new Error(`Ошибка запроса: ${response.status}`);
        }
    })
    .then(data => {
        console.log(`Данные: ${data}`);
    })
    .catch(error => {
        console.log(`Произошла ошибка: ${error}`)
    })
}

// пререндер нужен нам для обработки и обработки даннныхЖ
// Пререндер объекта:
function preRender(staffObj) {
    return {
    id: staffObj.id,
    first_name: staffObj.first_name,
    last_name: staffObj.last_name,
    age: staffObj.age ? staffObj.age : new Date().getFullYear() - new Date(staffObj.date_of_birth).getFullYear(),
    // age: staffObj.age,
    gender: staffObj.gender,
    state: staffObj.state,
    street: staffObj.street,
    };
}

// запуск пререндера таблицы
function preRenderTableOfStaff(arr) {
    return arr.forEach(item => {
        staffsListForRender.push(preRender(item));
    });     
}

// запуск рендерa:
function renderTableOfStaff(arr) {
    tableBody.innerHTML = ""; // очищаем тело таблицы
    let copyList = [...arr]; // создаем копию массива
    if (filterInput.value.trim() !== "") {
        copyList = filterTable(filterInput, copyList);
    }
    copyList.forEach(staffObj => {
        getStaffItem(staffObj)
    });     
}

// Добавление строки с новым пользователем:
function saveForm() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    let res = 0;

    
    const validation = [validateFirstName, validateLastName, validateAge, validateDate, validateState, validateStreet, validateSkills];
    validation.map(func => {
        const isValid = func();
        res += isValid ? 0 : 1;
    });


    if (res != 0) {
        return
    }  
 
    // ВАЛИДАЦИЯ:
    function validateFirstName() {
        let value = data.first_name;
        const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/g;
        if (!regEx.test(value)) {
            document.querySelector('#staff-first_name').classList.add('is-invalid')
            return
        }
        document.querySelector('#staff-first_name').classList.remove('is-invalid')
        return regEx.test(value);
    }  

    function validateLastName() {
        let value = data.last_name;
        const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/g;
        if (!regEx.test(value)) {
            document.querySelector('#staff-last_name').classList.add('is-invalid')
            return
        }
        document.querySelector('#staff-last_name').classList.remove('is-invalid')
        return regEx.test(value);
    }

    function validateAge() {
        let value = data.age;
        const regEx = /^\d{1,2}$/;
        if (!regEx.test(value)) {
            document.querySelector('#staff-age').classList.add('is-invalid')
            return
        }
        document.querySelector('#staff-age').classList.remove('is-invalid')
        return regEx.test(value);
    }

    function validateDate() {
        let value = data.employmentAt;
        const regEx = /\d{1,4}.\d{1,2}.\d{1,2}/;
        if (!regEx.test(value)) {
            document.querySelector('#staff-date').classList.add('is-invalid')
            return
        }
        document.querySelector('#staff-date').classList.remove('is-invalid')
        return regEx.test(value);
    }

    function validateState() {
        let value = data.state;
        const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/g;
        if (!regEx.test(value)) {
            document.querySelector('#staff-state').classList.add('is-invalid')
            return
        }
        document.querySelector('#staff-state').classList.remove('is-invalid')
        return regEx.test(value);
    }

    function validateStreet() {
        let value = data.street;
        const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/g;
        if (!regEx.test(value)) {
            document.querySelector('#staff-street').classList.add('is-invalid')
            return
        }
        document.querySelector('#staff-street').classList.remove('is-invalid')
        return regEx.test(value);
    }

    function validateSkills() {
        let value = data.skills;
        const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/g;
        if (!regEx.test(value)) {
            document.querySelector('#staff-skills').classList.add('is-invalid')
            return
        }
        document.querySelector('#staff-skills').classList.remove('is-invalid')
        return regEx.test(value);
    }

    tableBody.innerHTML = '';
    //присваиваем id новому сотруднику:
    data.id = Math.max.apply(null, staffsListForRender.map(a => a.id)) + 1; 
    // console.log(data);
    // console.log(preRender(data));
    staffsListForRender.push(preRender(data));
    renderTableOfStaff(staffsListForRender);    
}

// ФИЛЬТРАЦИЯ:
// фильтрация массива сотрудников:
function filterTable(filterInput, arr) {
    return arr.filter((oneStaff) =>
    oneStaff['first_name'].toLowerCase().includes(filterInput.value.trim().toLowerCase())
    );
}

filterInput.addEventListener("input", () => {
    renderTableOfStaff(staffsListForRender);
});

// СОРТИРОВКА:
const ageSortTableBtn = document.querySelector('[data-sort="age"]');
ageSortTableBtn.style.cursor = 'pointer';
const salarySortTableBtn = document.querySelector('[data-sort="last_name"]');
salarySortTableBtn.style.cursor = 'pointer';
const idSortTableBtn = document.querySelector('[data-sort="id"]');
idSortTableBtn.style.cursor = 'pointer';

let sortDirection = true;

const sortArr = (arr, property, sortDirection) => {
  arr.sort((a, b) =>
    (sortDirection ? a[property] < b[property] : a[property] > b[property])
      ? -1
      : 1
  );
  renderTableOfStaff(arr);
};

ageSortTableBtn.addEventListener("click", () => {
    sortDirection = !sortDirection;
    sortArr(staffsListForRender, "age", sortDirection);
});

idSortTableBtn.addEventListener("click", () => {
    sortDirection = !sortDirection;
    sortArr(staffsListForRender, "id", sortDirection);
});

salarySortTableBtn.addEventListener("click", () => {
    sortDirection = !sortDirection;
    sortArr(staffsListForRender, "last_name", sortDirection);
});

// ПАГИНАЦИЯ
// создаем кнопки пагинации:
function createPageButtons() {
    let activeBtn = 0;
    const totalPages = 10;
    const paginationContainer = document.createElement('div');
    const paginationDiv = document.body.appendChild(paginationContainer);
    paginationContainer.classList.add('pagination', 'd-flex', 'justify-content-center');

    // Add page buttons
    for (let i = 0; i < totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('page-item', 'btn');
        pageButton.textContent = i + 1;
        pageButton.addEventListener('click', () => {
            offset = i * limit;
            activeBtn = i;
            tableBody.innerHTML = ""; // очищаем тело таблицы
            staffsList(limit, offset);
            updateActiveButtonStates();
        });

        document.body.appendChild(paginationContainer);
        paginationDiv.appendChild(pageButton);
    }   

    // выделяем кнопку активной / не активной
    function updateActiveButtonStates() {
        let pageButtons = document.querySelectorAll('.page-item');
        pageButtons.forEach((button, index) => {
            if (index === activeBtn) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    updateActiveButtonStates();
}

createPageButtons();