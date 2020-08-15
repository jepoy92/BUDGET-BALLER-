


const user = {
    firstName: "John",
    lastName: "Smith",
    moneyLocation : ["Bank","Card","Cash"],
    moneyAvailable : [true,true,true],
    money : [0,0,0]

};


const income ={
    date : "",
    place : "",
    name : "",
    amount : 0,

    desciption : "",
    frecuency : ""

};

const categories ={
    entertainment : "",
    food : "",
    travel :"",
    home : "",
    car : "",
    bill : ""

};

function loadBankInfo(){

    var BankBalance  = document.getElementById("Bank-Amount");
    
    $.ajax({
        url: "https://ws.adanta.mx/api/Customer/Account/22",
        type: 'GET',
        dataType: 'json',
        success: function (Customer) {
            console.log(Customer);
            BankBalance.textContent = Customer.balance ;
            console.log("Customer Bank Balance:  " + Customer.balance);

        }
    });

}

function loadCardInfo(){

    var CardBalance = document.getElementById("Card-Amount");
    
    $.ajax({
        url: "https://ws.adanta.mx/api/Customer/Account/22",
        type: 'GET',
        dataType: 'json',
        success: function (Customer) {
            CardBalance.textContent = Customer.card;
            
            console.log("Customer Card Balance:  " + Customer.card);

        }
    });


    
}

function loadInfoCash(){
   
    var CashBalance = document.getElementById("Cash-Amount");

    if(JSON.parse(localStorage.getItem("Cash-Storaged"))){
        var storedCash = JSON.parse(localStorage.getItem("Cash-Storaged"));
        console.log("Cash Storaged:   "  + storedCash);
        CashBalance.textContent = storedCash;
            
    }
        
    else
        console.log("not storage");

    
}

function loadBalance(){
    var balance = document.getElementById("Balance-Amount");
    var allbalances = parseInt( $("#Bank-Amount").text());
            allbalances+= parseInt( $("#Card-Amount").text());
                allbalances+= parseInt( $("#Cash-Amount").text());

    balance.textContent = allbalances;

}

function SetCashStorage(cashToSave){
    if(JSON.parse(localStorage.getItem("Cash-Storaged")))
        var cash = JSON.parse(localStorage.getItem("Cash-Storaged"));
    else
        var cash = 0;

  
    cash= cashToSave;
    localStorage.setItem("Cash-Storaged", JSON.stringify(cash));


}



function loadMoneyInfo(){

    loadBankInfo();
    loadCardInfo();
    loadInfoCash();

    loadBalance();

}

function loadIncomes(){


}

function loadExpenses() {


    if(JSON.parse(localStorage.getItem("Storaged-Expenses"))){
        var StoragedExpenses = JSON.parse(localStorage.getItem("Storaged-Expenses"));
        console.log(StoragedExpenses);
        
        
        var ExpenseList = document.getElementById("Expenses-List");
        var ExpenseElement = document.createElement("tr");

        var ExpenseDate = document.createElement("td");
        ExpenseDate.setAttribute("id","date");

        var ExpensePlace = document.createElement("td");
        ExpensePlace.setAttribute("id","place");

        var ExpenseName = document.createElement("td");
        ExpenseName.setAttribute("id","name");

        var ExpenseAmount = document.createElement("td");
        ExpenseAmount.setAttribute("id","amount");

        var ExpenseCategory = document.createElement("td");
        ExpenseCategory.setAttribute("id","category");

        
        StoragedExpenses.forEach(element => {
            ExpenseDate.textContent = element.date;
            ExpensePlace.textContent = element.place;
            ExpenseName.textContent = element.name;
            ExpenseAmount.textContent = element.amount;
            ExpenseCategory.textContent = element.category;
            
        });

        ExpenseElement.appendChild(ExpenseDate);
        ExpenseElement.appendChild(ExpensePlace);
        ExpenseElement.appendChild(ExpenseName);
        ExpenseElement.appendChild(ExpenseAmount);
        ExpenseElement.appendChild(ExpenseCategory);

        ExpenseList.prepend(ExpenseElement);
                   
    }
        
    else
        console.log("not storaged");
    
}

function SetExpense(expense){

    if(JSON.parse(localStorage.getItem("Storaged-Expenses")))
        var ExpensesList = JSON.parse(localStorage.getItem("Storaged-Expenses"));
    else
        var ExpensesList = [];

  
    ExpensesList.push(expense);
    localStorage.setItem("Storaged-Expenses", JSON.stringify(ExpensesList));

    loadExpenses();




}


/* Program Starts Here */
//demo storage
SetCashStorage("200");

//load the money info from differents sources
loadMoneyInfo();

//load the incomes 
loadIncomes();

//load the expenses
loadExpenses();





$("#Add-Button").click( function(event){
    console.log("Button Clicked");


    



});



class Expense {
    constructor(date, place, name, amount,  category ,frecuency) {
        this.date = date;
        this.place = place;
        this.name = name;
        this.amount = amount;
        this.category = category;
        this.frecuency = frecuency; 
    }
  
    info() {
      console.log(this);
    };
  
    
  }


$("#modal-button-submit").click( function(event){
    var ExpenseDate = moment().format("MM/DD/YYYY");
    var ExpenseName  = $("#expense-name").val();
    var ExpenseAmount= $("#expense-amount").val();
    var ExpenseFrecuency = $("#select-frequency").val();
    var ExpenseCategory = $("#select-category").val();
    
    var ExpensePlace= "";
    if(document.getElementById("bank-radio").checked == true)
        ExpensePlace = "bank";
    if(document.getElementById("card-radio").checked == true)
        ExpensePlace = "card";
    if(document.getElementById("cash-radio").checked == true)
        ExpensePlace = "cash";


        


    
    const newExpense = new Expense(ExpenseDate,ExpensePlace ,ExpenseName,ExpenseAmount,ExpenseCategory,ExpenseFrecuency);
    
    console.log(newExpense);

    SetExpense(newExpense);

    


});

$("#modal-button-cancel").click( function(event){
    

});