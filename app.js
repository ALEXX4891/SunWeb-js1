// eslint-disable-next-line no-unused-vars, no-undef
var app = new Vue({
    el: '#app',
    data: {
        modalShow: false,
        staffObj: {},
        filterInput: '',
        limit: 10,
        offset: 0,
        data: {},
        usersFromDB: [],
        staffsListForRender: [],
        sortDirection: true,
        sortParam: '',
        baseUrl: 'https://api.slingacademy.com/v1/sample-data',
        activeBtn:0,
        totalPages: 0,
        page: 0,   
    },
    computed: {
        sortedList: function(){
            let sortParam = this.sortParam;
            if (sortParam) {
                return this.sortArr(this.staffsListForRender);
                
            } else {
                return this.staffsListForRender
            }
        },
        filteredList: function(){
            let search = this.filterInput.toLowerCase().trim();
            return this.sortedList.filter(function (elem) {
             
                if(search==='') return true;
                else return elem.first_name.toLowerCase().indexOf(search) > -1;
            })
        },
        pages: function(){
            let pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages
        }    
        
        
    },
    created () {
            this.staffsList();
	},

    mounted() {
    },
    methods: {
        async staffsList() {
            let url = `/users?offset=${this.offset}&limit=${this.limit}`;                 
            const responce = await fetch(this.baseUrl + url);
            let data = await responce.json();
            if (!responce.ok) {
                console.log("Данные на сервере отсутсуют");
                return null;
            } 
            this.totalPages = data.total_users / this.limit;
            this.staffsListForRender = [];
            this.usersFromDB = [...data.users];
            this.preRenderTableOfStaff(this.usersFromDB);

        },
        deleteStaff(staffObj) {
            if (!confirm(`Вы точно хотите удалить сотрудника ${staffObj.first_name} c ID № ${staffObj.id}?`)) {
              return;
            }
            // element.remove();
            this.staffsListForRender = this.staffsListForRender.filter(x => x.id != staffObj.id);
            // renderTableOfStaff(staffsListForRender);
        
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
        },
        saveForm() {
            let form = document.querySelector('form');
            let formData = new FormData(form);
            this.data = Object.fromEntries(formData.entries());
            this.data.id = Math.max.apply(null, this.staffsListForRender.map(a => a.id)) + 1; 
            let res = 0;
    
            const validation = [this.validateFirstName, this.validateLastName, this.validateAge, this.validateDate, this.validateState, this.validateStreet, this.validateSkills];
            validation.map(func => {
                const isValid = func();

                res += isValid ? 0 : 1;
            });
        
            if (res != 0) {
                return
            }
         
            this.staffsListForRender.push(this.preRender(this.data));
        },

        validateFirstName() {
            let value = this.data.first_name;
            const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                document.querySelector('#staff-first_name').classList.add('is-invalid')
                return
            }
            document.querySelector('#staff-first_name').classList.remove('is-invalid')
            return regEx.test(value);
        },  
    
        validateLastName() {
            let value = this.data.last_name;
            const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                document.querySelector('#staff-last_name').classList.add('is-invalid')
                return
            }
            document.querySelector('#staff-last_name').classList.remove('is-invalid')
            return regEx.test(value);
        },
    
        validateAge() {
            let value = this.data.age;
            const regEx = /^\d{1,2}$/;
            if (!regEx.test(value)) {
                document.querySelector('#staff-age').classList.add('is-invalid')
                return
            }
            document.querySelector('#staff-age').classList.remove('is-invalid')
            return regEx.test(value);
        },
    
        validateDate() {
            let value = this.data.employmentAt;
            const regEx = /\d{1,4}.\d{1,2}.\d{1,2}/;
            if (!regEx.test(value)) {
                document.querySelector('#staff-date').classList.add('is-invalid')
                return
            }
            document.querySelector('#staff-date').classList.remove('is-invalid')
            return regEx.test(value);
        },
    
        validateState() {
            let value = this.data.state;
            const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                document.querySelector('#staff-state').classList.add('is-invalid')
                return
            }
            document.querySelector('#staff-state').classList.remove('is-invalid')
            return regEx.test(value);
        },
    
        validateStreet() {
            let value = this.data.street;
            const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                document.querySelector('#staff-street').classList.add('is-invalid')
                return
            }
            document.querySelector('#staff-street').classList.remove('is-invalid')
            return regEx.test(value);
        },
    
        validateSkills() {
            let value = this.data.skills;
            const regEx = /^[a-zA-Zа-яА-ЯёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                document.querySelector('#staff-skills').classList.add('is-invalid')
                return
            }
            document.querySelector('#staff-skills').classList.remove('is-invalid')
            return regEx.test(value);
        },

        sortArr(arr) {
            return arr.sort((a, b) =>
              (this.sortDirection ? a[this.sortParam] < b[this.sortParam] : a[this.sortParam] > b[this.sortParam])
                ? -1
                : 1
            );
        },
        preRenderTableOfStaff(arr) {
            return arr.forEach(item => {
                this.staffsListForRender.push(this.preRender(item));
            });     
        },
        preRender(staffObj) {
            return {
            id: staffObj.id,
            first_name: staffObj.first_name,
            last_name: staffObj.last_name,
            age: staffObj.age ?
                staffObj.age :
                new Date().
                getFullYear() - new Date(staffObj.date_of_birth).
                getFullYear(),
            // age: staffObj.age,
            gender: staffObj.gender,
            state: staffObj.state,
            street: staffObj.street,
            };
        },
        filterTable(filterInput, arr) {
            return arr.filter((oneStaff) =>
            oneStaff['first_name']
            .toLowerCase()
            .includes(filterInput.trim().toLowerCase())
            );
        },
        changePage(e) {
            this.offset = (e.target.textContent - 1) * this.limit;
        }

    },
    watch: {
        offset: function () {
            this.staffsList()
        }
    },

    
})