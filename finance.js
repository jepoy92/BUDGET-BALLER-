


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
            //CardBalance.textContent = Customer.card;
            CardBalance.textContent = "300";

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
    //var ExpenseDate = moment().format("MM/DD/YYYY");
    var ExpenseName  = $("#expense-name").val();
    var ExpenseAmount= $("#expense-amount").val();
    var ExpenseFrecuency = $("#select-frequency").val();
    var ExpenseCategory = $("#select-category").val();
    
    const newExpense = new Expense("10/22/92","Place" ,ExpenseName,ExpenseAmount,ExpenseCategory,ExpenseFrecuency);
    
    console.log(newExpense);

    


});

$("#modal-button-cancel").click( function(event){
    

});