// const staffs = [
//     {
//         id: 1,
//         name: "John",
//         age: 30,
//         gender: "male",
//         salary: 5000,
//         married: false,
//         skills: ["html", "css", "js"],
//         employmentAt: "2020-01-01"
//     },
//     {
//         id: 2,
//         name: "Jane",
//         age: 25,
//         gender: "female",
//         salary: 4000,
//         married: true,
//         skills: ["html", "css", "js", "php"],
//         employmentAt: "2023-06-21"
//     },
//     {
//         id: 3,
//         name: "Bob",
//         age: 35,
//         gender: "male",
//         salary: 6000,
//         married: false,
//         skills: ["html", "css", "js", "python"],
//         employmentAt: "2021-03-15"
//     },
//     {
//         id: 4,
//         name: "Alice",
//         age: 28,
//         gender: "female",
//         salary: 4500,
//         married: true,
//         skills: ["html", "css"],
//         employmentAt: "2022-09-01"
//     },
//     {
//         id: 5,
//         name: "Charlie",
//         age: 40,
//         gender: "male",
//         salary: 7000,
//         married: true,
//         skills: ["html", "css", "js", "python", "java"],
//         employmentAt: "2020-07-10"
//     },
//     {
//         id: 6,
//         name: "Emily",
//         age: 32,
//         gender: "female",
//         salary: 5000,
//         married: true,
//         skills: ["js", "C++"],
//         employmentAt: "2023-02-28"
//     },
//     {
//         id: 7,
//         name: "David",
//         age: 29,
//         gender: "male",
//         salary: 5500,
//         married: true,
//         skills: ["html", "css", "js"],
//         employmentAt: "2021-11-05"
//     },
//     {
//         id: 8,
//         name: "Sophia",
//         age: 27,
//         gender: "female",
//         salary: 4000,
//         married: true,
//         skills: ["html", "css", "js"],
//         employmentAt: "2022-08-15"
//     },
//     {
//         id: 9,
//         name: "Jane",
//         age: 55,
//         gender: "female",
//         salary: 4500,
//         married: false,
//         skills: ["css", "js", "php"],
//         employmentAt: "2020-05-22"
//     }
// ]


const baseUrl = 'https://api.slingacademy.com/v1/sample-data';

// let staffs = [];
let responce;
let staffsListForRender = [];
let staffsList2;

const staffsList = async function getStaffsFromDB(limit=10, offset=0) {
    const url = `/users?offset=${offset}&limit=${limit}`;
    responce = await fetch(baseUrl + url);
    let data = await responce.json();
    // console.log(staffsList.users);
    if (!responce.ok) {
        console.log("Данные на сервере отсутсуют");
        return null;
    } 
    console.log(data.users)
    staffsList2 = [...data.users];
    // console.log(staffsList2)
    preRenderTableOfStaff(staffsList2);
    console.log(staffsListForRender)
    
    renderTableOfStaff(staffsListForRender);


    // return staffsListForRender;

    // staffsList = [];
}

// await getStaffsFromDB();
let limit = 10;
let offset = 0;
// await getStaffsFromDB(limit, offset);
staffsList(limit, offset);


// if (staffsList) {
//     staffsListForRender = [...staffsList];    
//     console.log(staffsListForRender)
// }

const modal = document.getElementById('modal');
const filterInput = document.getElementById('filter');
const tableBody = document.getElementById('table-body');
const form = document.querySelector('form');
const saveBtn = document.querySelector('.save-modal');
const btnOpenModal = document.querySelector('.open-modal');

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
}

// пререндер нужен нам для обработки и обработки даннныхЖ
// Пререндер объекта:
function preRender(staffObj) {
    return {
    id: staffObj.id,
    first_name: staffObj.first_name,
    last_name: staffObj.last_name,
    age: new Date().getFullYear() - new Date(staffObj.date_of_birth).getFullYear(),
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
    tableBody.innerHTML = '';
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    //присваиваем id новому сотруднику:
    data.id = Math.max.apply(null, staffsListForRender.map(a => a.id)) + 1; 
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
    sortArr(staffsListForRender, "salary", sortDirection);
});





