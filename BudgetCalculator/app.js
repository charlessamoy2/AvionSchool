/* back end stuff */
const Expense = function(id, description,value) {
    this.id = id;
    this.description = description;
    this.value = value;
};

const Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
}
 
const data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
}

const calculateTotals = function(type) {
    let sum = 0;
    data.allItems[type].forEach(function(i) {
        sum += i.value;
    });
    data.totals[type] = sum;
}

const moneyController = {
    addItem: function(type, description, value) {
        let newItem, ID;

        if (data.allItems[type].length>0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1
        } else {
            ID = 0;
        }

        if (type === 'exp') {
            newItem = new Expense(ID, description, value);
        } else if (type === 'inc') {
            newItem = new Income(ID,description,value);
        }

        data.allItems[type].push(newItem);

        return newItem;
    },

    deleteItem: function(type,id) {
        let ids, index;

        ids = data.allItems[type].map(function(current) {
            return current.id;
        });

        index = ids.indexOf(id);

        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
        
    },

    calculateBudget: function() {
        calculateTotals('exp');
        calculateTotals('inc');

        data.budget = data.totals.inc - data.totals.exp;
    },

    getBudget: function() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp
        };
    }
}

/* front end stuff */
const htmlClasses = {
    inputType: '.add_type',
    inputDescription: '.add_description',
    inputValue: '.add_value',
    inputBtn: '.add_btn',
    incomeList: '.income_list',
    expensesList: '.expenses_list',
    budgetLabel: '.total-value',
    incomeLabel: '.budget_income_value',
    expensesLabel: '.budget_expenses_value',
    moneyList: '.money_list',
    dateLabel: '.new_date',
    deleteBtn: '.item_delete_btn'
}

const formatNumber = function(num, type) {
    let result, int, dec;

    num = Math.abs(num).toFixed(2);

    result = num.split('.');

    int = result[0];
    if (int.length > 6) {
        int = int.substr(0,int.length-6) + ',' + int.substr(int.length - 6, 3) + ',' + int.substr(int.length-3,3);
    } else if (int.length>3) {
        int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3);
    }

    dec = result[1];

    if(type === 'exp') {
        type = '-'
    } else if (type === 'inc') {
        type = '+'
    }

    return type + ' ' + int + '.' + dec;
}

const frontendController = {
    getInput: function() {
        return {
            type: document.querySelector(htmlClasses.inputType).value,
            description: document.querySelector(htmlClasses.inputDescription).value,
            value: parseFloat(document.querySelector(htmlClasses.inputValue).value) 
        };
    },

    addListItem: function(obj, type) {
        let html,element;

        if(type === 'inc') {
            element = htmlClasses.incomeList;

            html = `<div class="item clearfix" id="inc-${obj.id}">
            <div class="item_description">${obj.description}</div>
            <div class="right-side clearfix">
            <div class="item_value">${formatNumber(obj.value,type)}</div>
            <button class="item_delete_btn"><i class="far fa-trash-alt"></i></button>
            </div>
            </div>
            </div>`;

        } else if (type === 'exp') {
            element = htmlClasses.expensesList;

            html = `<div class="item clearfix" id="exp-${obj.id}">
            <div class="item_description">${obj.description}</div>
            <div class="right-side clearfix">
            <div class="item_value">${formatNumber(obj.value,type)}</div>
            <button class="item_delete_btn"><i class="far fa-trash-alt"></i></button>
            </div>
            </div>
            </div>`;

        }

        document.querySelector(element).insertAdjacentHTML('beforeend',html);
    },

    deleteListItem: function(selectedID) {
        const element = document.getElementById(selectedID);
        element.remove(element);
    },

    clearFields: function() {
        let fields, fieldsArr;

        fields = document.querySelectorAll(htmlClasses.inputDescription+', '+htmlClasses.inputValue);
        fieldsArr = Array.prototype.slice.call(fields);

        fieldsArr.forEach(function(current) {
            current.value = "";
        });

        fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
        let type;

        if (obj.budget > 0) {
            type = 'inc';
        } else {
            type = 'exp';
        }

        document.querySelector(htmlClasses.budgetLabel).textContent = formatNumber(obj.budget,type);
        document.querySelector(htmlClasses.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
        document.querySelector(htmlClasses.expensesLabel).textContent = formatNumber(obj.totalExp,'exp');
    },

    displayMonth: function() {
        let now, months, month, year;

        now = new Date();

        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        month = now.getMonth();
        
        year = now.getFullYear();

        document.querySelector(htmlClasses.dateLabel).textContent = months[month] + ' ' + year;
    }
}

const controller = (function(moneyController,frontendController) {
    const setupEventListeners = function() {
        document.querySelector(htmlClasses.inputBtn).addEventListener('click',mainAddItem);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                mainAddItem();
            }
        });
        document.querySelector(htmlClasses.moneyList).addEventListener('click',mainDeleteItem);
        document.querySelector(htmlClasses.inputType).addEventListener('change',changeBorders);
    };

    const updateBudget = function () {
        moneyController.calculateBudget();
        
        const budget = moneyController.getBudget();

        frontendController.displayBudget(budget);
    };

    const mainAddItem = function() {
        let input, newItem;

        input = frontendController.getInput();

        if (input.description !== "" && input.value && input.value > 0) {
            newItem = moneyController.addItem(input.type, input.description, input.value);
            frontendController.addListItem(newItem, input.type);
            frontendController.clearFields();
            updateBudget();
        }
    }

    const mainDeleteItem = function (event) {
        let itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitID = itemID.split('-');

            type = splitID[0];
            ID = parseInt(splitID[1]);

            moneyController.deleteItem(type,ID);

            frontendController.deleteListItem(itemID);

            updateBudget();
        }
    };

    const changeBorders = function() {
        const queries = document.querySelectorAll(htmlClasses.inputType + ',' + htmlClasses.inputDescription + ',' + htmlClasses.inputValue);
        const addBtn = document.querySelector(htmlClasses.inputBtn).firstElementChild;

        queries.forEach(
            function(current){
                current.classList.toggle('red');
            }
        );
        addBtn.classList.toggle('redButton');
    }

    return {
        init: function() {
            frontendController.displayMonth();
            frontendController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
            });
            setupEventListeners();
            }
    }
})(moneyController,frontendController);

controller.init();