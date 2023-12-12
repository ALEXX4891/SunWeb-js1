// eslint-disable-next-line no-unused-vars, no-undef
var app = new Vue({
    el: '#app',
    data: {
        modalShow: false,
        staffObj: {},
        filterInput: '',
        limit: 10,
        offset: 0,
        data: [],
        staffsListForRender: [],
        sortDirection: true,
        sortParam: '',
        baseUrl: 'https://api.slingacademy.com/v1/sample-data',
        activeBtn:0,
        totalPages: 0,
        page: 0,    
        errors  : {
            first_name: false,
            last_name: false,
            age: false,
            employmentAt: false,
            state: false,
            street: false,
            skills: false, 
        },  
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
        pages: function(){
            let pages = [];
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
            return pages
        },  
    },
    created () {
            this.staffsList();
	},
    methods: {
        async staffsList() {
            let url = `/users?offset=${this.offset}&limit=${this.limit}${this.filterInput ? `&search=${this.filterInput}` : ''}`;                 
            const responce = await fetch(this.baseUrl + url);
            this.data = await responce.json();

            if (!responce.ok) {
                console.log("Данные на сервере отсутсуют");
                return null;
            } 
            this.totalPages = Math.ceil(this.data.total_users / this.limit);
            this.staffsListForRender = [];
            this.preRenderTableOfStaff([...this.data.users]);

        },
        deleteStaff(staffObj) {
            if (confirm(`Вы точно хотите удалить сотрудника ${staffObj.first_name} c ID № ${staffObj.id}?`)) {
                this.staffsListForRender = this.staffsListForRender.filter(x => x.id != staffObj.id);
            } else {
                console.log(`Произошла ошибка`)
                return;
            }
        
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
            .catch(error => {
                console.log(`Произошла ошибка: ${error}`)
            })
        },
        saveForm() {
            const formData = new FormData(this.$refs.form);

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
         
            this.staffsListForRender = [...this.staffsListForRender, this.data];
        },

        validateFirstName() {
            let value = this.data.first_name;
            const regEx = /^[А-яA-zёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                this.errors.first_name = true;
                return false;
            }
            this.errors.first_name = false;
            return regEx.test(value);
        },  
    
        validateLastName() {
            let value = this.data.last_name;
            const regEx = /^[А-яA-zёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                this.errors.last_name = true;
                return false;
            }
            this.errors.last_name = false;
            return regEx.test(value);
        },
    
        validateAge() {
            let value = this.data.age;
            const regEx = /^\d{1,2}$/;
            if (!regEx.test(value)) {
                this.errors.age = true;
                return false;
            }
            this.errors.age = false;
            return regEx.test(value);
        },
    
        validateDate() {
            let value = this.data.employmentAt;
            const regEx = /\d{1,4}.\d{1,2}.\d{1,2}/;
            if (!regEx.test(value)) {
                this.errors.employmentAt = true;
                return false;
            }
            this.errors.employmentAt = false;
            return regEx.test(value);
        },
    
        validateState() {
            let value = this.data.state;
            const regEx = /^[А-яA-zёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                this.errors.state = true;
                return false;
            }
            this.errors.state = false;
            return regEx.test(value);
        },
    
        validateStreet() {
            let value = this.data.street;
            const regEx = /^[А-яA-zёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                this.errors.street = true;
                return false;
            }
            this.errors.street = false;
            return regEx.test(value);
        },
    
        validateSkills() {
            let value = this.data.skills;
            const regEx = /^[А-яA-zёЁ\s-]{1,11}$/;
            if (!regEx.test(value)) {
                this.errors.skills = true;
                return false;
            }
            this.errors.skills = false;
            return regEx.test(value);
        },

        sortArr(arr) {
            return [...arr].sort((a, b) =>
              (this.sortDirection ? a[this.sortParam] < b[this.sortParam] : a[this.sortParam] > b[this.sortParam])
                ? -1
                : 1
            );
        },
        preRenderTableOfStaff(arr) {
            return [...arr].forEach(item => {
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
            gender: staffObj.gender,
            state: staffObj.state,
            street: staffObj.street,
            };
        },
        changePage(e) {
            this.offset = (e.target.textContent - 1) * this.limit;
        }
    },
    watch: {
        offset: function () {
            this.staffsList()
        },

        filterInput: function(){
            this.staffsList();
        }
    },
})