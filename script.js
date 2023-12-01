const staffs = [
    {
        id: 1,
        name: "John",
        age: 30,
        gender: "male",
        salary: 5000,
        married: false,
        skills: ["html", "css", "js"],
        employmentAt: "2020-01-01"
    },
    {
        id: 2,
        name: "Jane",
        age: 25,
        gender: "female",
        salary: 4000,
        married: true,
        skills: ["html", "css", "js", "php"],
        employmentAt: "2023-06-21"
    },
    {
        id: 3,
        name: "Bob",
        age: 35,
        gender: "male",
        salary: 6000,
        married: false,
        skills: ["html", "css", "js", "python"],
        employmentAt: "2021-03-15"
    },
    {
        id: 4,
        name: "Alice",
        age: 28,
        gender: "female",
        salary: 4500,
        married: true,
        skills: ["html", "css"],
        employmentAt: "2022-09-01"
    },
    {
        id: 5,
        name: "Charlie",
        age: 40,
        gender: "male",
        salary: 7000,
        married: true,
        skills: ["html", "css", "js", "python", "java"],
        employmentAt: "2020-07-10"
    },
    {
        id: 6,
        name: "Emily",
        age: 32,
        gender: "female",
        salary: 5000,
        married: true,
        skills: ["js", "C++"],
        employmentAt: "2023-02-28"
    },
    {
        id: 7,
        name: "David",
        age: 29,
        gender: "male",
        salary: 5500,
        married: true,
        skills: ["html", "css", "js"],
        employmentAt: "2021-11-05"
    },
    {
        id: 8,
        name: "Sophia",
        age: 27,
        gender: "female",
        salary: 4000,
        married: true,
        skills: ["html", "css", "js"],
        employmentAt: "2022-08-15"
    }
]



const copyStaffs = [...staffs];
let staffsListForRender = [];
// let arrayOfStaffs = [];


const modal = document.getElementById('modal');

const tableBody = document.getElementById('table-body');
const form = document.querySelector('form');
const saveBtn = document.querySelector('.save-modal');

const btnOpenModal = document.querySelector('.open-modal');
const btnCloseModal = document.querySelector('.close-modal');


function modalToOpen() {
    modal.classList.add('show');
}

function modalToClose() {
    modal.classList.remove('show');
}

let formData;
let data;

// data:
// age:"545"
// employmentAt:"2023-12-02"
// gender:"female"
// name:"папап"
// salary:"45454"
// skills:"пвпвппавпв"


saveBtn.addEventListener('click', saveForm);
btnOpenModal.addEventListener('click', modalToOpen);
btnCloseModal.addEventListener('click', modalToClose);


// получаем строку таблицы сотрудника и выводим её в таблицу:
function getStaffItem(staffObj) {
    const $tableRow = document.createElement("tr"),
        $tableDataId = document.createElement("td"),
        $tableDataName = document.createElement("td"),
        $tableDataSkills = document.createElement("td"),
        $tableDataDate = document.createElement("td"),
        $tableDataGender = document.createElement("td"),
        $tableDataAge = document.createElement("td"),
        $tableDataSalary = document.createElement("td");
  
    $tableDataId.textContent = staffObj.id;
    $tableDataName.textContent = staffObj.name;
    $tableDataSkills.textContent = staffObj.skills;
    $tableDataDate.textContent = staffObj.date;
    $tableDataGender.textContent = staffObj.gender;
    $tableDataAge.textContent = staffObj.age;
    $tableDataSalary.textContent = staffObj.salary;



    // $tableDataId
    // $tableDataName
    // $tableDataDate
    // $tableDataGender
    // $tableDataAge
    // $tableDataSalary
  
    $tableRow.append($tableDataId);
    $tableRow.append($tableDataName);
    $tableRow.append($tableDataSkills);
    $tableRow.append($tableDataDate);
    $tableRow.append($tableDataGender);
    $tableRow.append($tableDataAge);
    $tableRow.append($tableDataSalary);

    tableBody.append($tableRow);
    // table.append(tableBody);
}


// for (const staffObj of copyStaffs) {
//     getStaffItem(staffObj);
// }


// пререндер нужен нам для обработки и обработки даннныхЖ
let staffsObjForRender = {};
function preRender(staffObj) {
    staffsObjForRender = {
    id: staffObj.id,
    name: staffObj.name,
    age: +staffObj.age,
    gender: staffObj.gender,
    salary: +staffObj.salary,
    skills: staffObj.skills,
    date: staffObj.employmentAt,
    // married: staffObj.married,
    };
}


staffsListForRender = [];
// запуск пререндера таблицы

function preRenderTableOfStaff(arr) {
    arr.forEach(item => {
        preRender(item)
        // staffsListForRender = []
        staffsListForRender.push(staffsObjForRender);
    });     
}
preRenderTableOfStaff(copyStaffs);


// запуск рендерa:
function renderTableOfStaff(arr) {
    formData = new FormData(form);
    preRenderTableOfStaff(copyStaffs)
    arr.forEach(item => {
        getStaffItem(item)
    });     
}

renderTableOfStaff(staffsListForRender);



function saveForm() {
    data = Object.fromEntries(formData.entries());
    console.log(data)
    //присваиваем id новому сотруднику:
    data.id = Math.max.apply(null, staffsListForRender.map(a => a.id)) + 1; 
    // console.log(data)
    data.date = data.employmentAt;
    data.salary = +data.salary;
    delete data.employmentAt;
    modal.classList.remove('show');
    // staffsListForRender.push(data);
    // preRender(data);
    staffsListForRender.push(data)
    tableBody.innerHTML = '';
    preRenderTableOfStaff(staffsListForRender)
    renderTableOfStaff(staffsListForRender);

    // for (const staffObj of staffsListForRender) {
    //     getStaffItem(staffObj);
    // }
    // getStaffItem(staffsListForRender);
    // console.log(staffsListForRender);
}

// let str = '';
// function filterList(str) {
//     staffsListForRender.filter((el) => el.some(str));

//     for (const staffObj of staffsListForRender) {
//         getStaffItem(staffObj);
//     }
    
// }

function filterTable(param, arr, str) {
    return arr.filter((oneStaff) =>
      oneStaff[param].toLowerCase().includes(str)
    //   oneStaff[param].toLowerCase().includes(col.value.trim().toLowerCase())

    );
}

let res = filterTable('name', staffsListForRender, 'jane');

function sortTable(arr, property, sortDirection) {
    arr.sort((a, b) =>
    (sortDirection ? a[property] < b[property] : a[property] > b[property])
      ? -1
      : 1
  );
  renderStudentsTable(arr);
}