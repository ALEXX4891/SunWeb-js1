var app = new Vue({
    el: '#app',
    data: {
        modalShow: false,
        users: {},
        filterInput: '',
        limit: 10,
        offset: 0,
        // staffsList: [],
        usersFromDB: [],
        staffsListForRender: [],
        sortDirection: true,
        sortParam: '',
        baseUrl: 'https://api.slingacademy.com/v1/sample-data',
        activeBtn:0,
        totalPages: 0,
        // pageNumber: 1,        
        
    },
    computed: {
        // addStuff() {
        //     return this.staffsListForRender.push(this.users)
        // },
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
            // this.staffsList();
            // this.preRenderTableOfStaff(this.usersFromDB);
            // this.renderTableOfStaff(this.staffsListForRender);
            // this.createPageButtons();
            this.updateActiveButtonStates();
    },
    methods: {
        async staffsList() {
            let url = `/users?offset=${this.offset}&limit=${this.limit}`;                 
            const responce = await fetch(this.baseUrl + url);
            let data = await responce.json();
            // console.log(data)
            if (!responce.ok) {
                console.log("Данные на сервере отсутсуют");
                return null;
            } 
            this.totalPages = data.total_users / this.limit;
            this.staffsListForRender = [];
            this.usersFromDB = [...data.users];
            this.preRenderTableOfStaff(this.usersFromDB);

        },
        // createPageButtons() {

            // const paginationContainer = document.createElement('div');
            // const paginationDiv = document.body.appendChild(paginationContainer);
            // paginationContainer.classList.add('pagination', 'd-flex', 'justify-content-center');
        
            // Add page buttons
            // for (let i = 0; i < this.totalPages; i++) {
                // const pageButton = document.createElement('button');
                // pageButton.classList.add('page-item', 'btn');
                // pageButton.textContent = i + 1;
                // pageButton.addEventListener('click', () => {
                //     this.offset = i * this.limit;
                //     this.activeBtn = i;
                //     this.tableBody.innerHTML = ""; // очищаем тело таблицы
                //     this.staffsList(this.limit, this.offset);
                //     this.updateActiveButtonStates();
                // });        
                // document.body.appendChild(paginationContainer);
                // paginationDiv.appendChild(pageButton);
        // },           

        // выделяем кнопку активной / не активной
        // updateActiveButtonStates() {
        //     // let pageButtons = document.querySelectorAll('.page-item');
        //     // pageButtons.forEach((button, index) => {
        //     //     if (index === this.activeBtn) {
        //     //         button.classList.add('active');
        //     //     } else {
        //     //         button.classList.remove('active');
        //     //     }
        //     // });
        // },

        // saveForm() {
            // const formData = new FormData(form);
            // const data = Object.fromEntries(formData.entries());
            // this.staffsListForRender = [...this.staffsListForRender, {
            // }];

        // },

        // openModal() {
        //     this.modalShow = true;
        // },
        sortArr(arr) {
            return arr.sort((a, b) =>
              (this.sortDirection ? a[this.sortParam] < b[this.sortParam] : a[this.sortParam] > b[this.sortParam])
                ? -1
                : 1
            );
            // renderTableOfStaff(arr);
        },
        // renderTableOfStaff(arr) {
        //     // this.tableBody.innerHTML = ""; // очищаем тело таблицы
        //     let copyList = [...arr]; // создаем копию массива
        //     if (this.filterInput.trim() !== "") {
        //         copyList = this.filterTable(this.filterInput, copyList);
        //     }
        //     copyList.forEach(staffObj => {
        //         this.getStaffItem(staffObj)
        //     });     
        // },
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
            // console.log((e.target.textContent - 1) * this.limit);
            this.offset = (e.target.textContent - 1) * this.limit;
        }

    },
    watch: {
        offset: function () {
            this.staffsList()
        }

        // эта функция запускается при любом изменении вопроса
    //     filterInput: function () {
    //         this.staffsList = [...this.staffsListForRender]
    //     //   this.answer = 'Ожидаю, когда вы закончите печатать...'
    //       this.filterTable(this.filterInput, this.staffsList)
    //     }
    },

    
})