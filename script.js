const staffs = [
    {
        id: 1,
        name: "John",
        age: 30,
        gender: "male",
        salary: 5000,
        married: false,
        skills: ["html", "css", "js"],
        employment_at: "2020-01-01"
    },
    {
        id: 2,
        name: "Jane",
        age: 25,
        gender: "female",
        salary: 4000,
        married: true,
        skills: ["html", "css", "js", "php"],
        employment_at: "2023-06-21"
    },
    {
        id: 3,
        name: "Bob",
        age: 35,
        gender: "male",
        salary: 6000,
        married: false,
        skills: ["html", "css", "js", "python"],
        employment_at: "2021-03-15"
    },
    {
        id: 4,
        name: "Alice",
        age: 28,
        gender: "female",
        salary: 4500,
        married: true,
        skills: ["html", "css"],
        employment_at: "2022-09-01"
    },
    {
        id: 5,
        name: "Charlie",
        age: 40,
        gender: "male",
        salary: 7000,
        married: true,
        skills: ["html", "css", "js", "python", "java"],
        employment_at: "2020-07-10"
    },
    {
        id: 6,
        name: "Emily",
        age: 32,
        gender: "female",
        salary: 5000,
        married: true,
        skills: ["js", "C++"],
        employment_at: "2023-02-28"
    },
    {
        id: 7,
        name: "David",
        age: 29,
        gender: "male",
        salary: 5500,
        married: true,
        skills: ["html", "css", "js"],
        employment_at: "2021-11-05"
    },
    {
        id: 8,
        name: "Sophia",
        age: 27,
        gender: "female",
        salary: 4000,
        married: true,
        skills: ["html", "css", "js"],
        employment_at: "2022-08-15"
    }
]





let modal = document.getElementById('modal');

// let modal = document.querySelector('#modal');

let form = document.querySelector('form')
let saveBtn = document.querySelector('.save-modal')
// let filter = document.getElementById('filter');
// let tableBody = document.getElementById('table-body');
// let male = document.getElementById('male');
// let female = document.getElementById('female');
// let staffName = document.getElementById('staff-name');
// let staffDate = document.getElementById('staff-date');
// let staffSalary = document.getElementById('staff-salary');
// let staffAge = document.getElementById('staff-age');
// let staffSkills = document.getElementById('staff-skills');
let btnOpenModal = document.querySelector('.open-modal');
let btnCloseModal = document.querySelector('.close-modal');


function modalToOpen() {
    modal.classList.add('show');
}

function modalToClose() {
    modal.classList.remove('show');
}

let formData;
let data;

function saveForm() {
    formData = new FormData(form);
    data = Object.fromEntries(formData.entries());
    console.log(data)
    modal.classList.remove('show');
}

saveBtn.addEventListener('click', saveForm);
btnOpenModal.addEventListener('click', modalToOpen);
btnCloseModal.addEventListener('click', modalToClose);
// let formData = new FormData(form);
// let data = Object.entries(formData.entries());
// let save = e



// modal.onsubmit = async (e) => {
//     e.preventDefault();

//     let response = await fetch('#', {
//       method: 'POST',
//       body: new FormData(modal)
//     });

//     let result = await response.json();

//     console.log(result.message);
//   };




