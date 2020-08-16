
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
    var CardBalance = document.getElementById("Card-Amount");
    
    $.ajax({
        url: "https://ws.adanta.mx/api/Customer/Account/22",
        type: 'GET',
        dataType: 'json',
        success: function (Customer) {
            console.log(Customer);
            BankBalance.textContent = Customer.balance ;
            console.log("Customer Bank Balance:  " + Customer.balance);
            CardBalance.textContent = Customer.card;
            console.log("Customer Card Balance:  " + Customer.card);
            loadExpenses();
            loadBalance();

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

    console.log("Current balance is: " + allbalances);

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
    loadInfoCash();

    loadBalance();

}

function SubsFromBalance(TotalBank,TotalCard,TotalCash){
   
    $("#Bank-Amount").text($("#Bank-Amount").text()-TotalBank);
    $("#Card-Amount").text($("#Card-Amount").text()-TotalCard);
    $("#Cash-Amount").text($("#Cash-Amount").text()-TotalCash);

    loadBalance();


}


function loadIncomes(){
    



}

function ClearExpenses(){
    var ExpensesList = document.getElementById("Expenses-List");
        ExpensesList.innerHTML = "";


}

function loadExpenses() {
    
    var TotalBank = 0;
    var TotalCard = 0;
    var TotalCash =0;

    ClearExpenses();

    if(JSON.parse(localStorage.getItem("Storaged-Expenses"))){
        var StoragedExpenses = JSON.parse(localStorage.getItem("Storaged-Expenses"));
        console.log(StoragedExpenses);
        
        StoragedExpenses.forEach(element => {

            var ExpenseList = document.getElementById("Expenses-List");
            
            var ExpenseElement = document.createElement("tr");

            var ExpenseDate = document.createElement("td");
            ExpenseDate.setAttribute("id","date");

            
            var ExpensePlace  = document.createElement("td");
                ExpensePlace.setAttribute("id","place");
            var PlaceImg = document.createElement("img");
            if(element.place == "bank"){
                PlaceImg.setAttribute("src","Assets/bank.png");
                PlaceImg.setAttribute("alt","icon of a bank");

            } 
            else if(element.place == "card"){
                PlaceImg.setAttribute("src","Assets/credit-card.png");
                PlaceImg.setAttribute("alt","icon of a card");

            }  
            else if(element.place == "cash"){
                PlaceImg.setAttribute("src","Assets/cash.png");
                PlaceImg.setAttribute("alt","icon of a bill");

            }
            
            ExpensePlace.append(PlaceImg);


            var ExpenseName = document.createElement("td");
            ExpenseName.setAttribute("id","name");

            var ExpenseAmount = document.createElement("td");
            ExpenseAmount.setAttribute("id","amount");
            var AmountImg = document.createElement("img");
            
            AmountImg.setAttribute("src","Assets/DOLLA-DOLLA-BILLS.png");
            AmountImg.setAttribute("alt","icon of dollar");
            
            var ExpenseCategory = document.createElement("td");
            ExpenseCategory.setAttribute("id","category");



            ExpenseDate.textContent = element.date;
            ExpenseName.textContent = element.name;
            ExpenseAmount.textContent = element.amount;
            ExpenseAmount.prepend(AmountImg);
            ExpenseCategory.textContent = element.category;


            ExpenseElement.appendChild(ExpenseDate);
            ExpenseElement.appendChild(ExpensePlace);
            ExpenseElement.appendChild(ExpenseName);
            ExpenseElement.appendChild(ExpenseAmount);
            ExpenseElement.appendChild(ExpenseCategory);

            ExpenseList.prepend(ExpenseElement);


            switch (element.place) {
                case "bank":
                    TotalBank += parseInt(element.amount);
                    break;

                case "card":
                    TotalCard += parseInt(element.amount);
                    break;

                case "cash":
                    TotalCash += parseInt(element.amount);
                    break;
            
                default:
                    break;
            }
            
            
            
        });

         

        SubsFromBalance(TotalBank,TotalCard,TotalCash);
                   
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

    loadMoneyInfo();



}

function clearModal(){

    $("#expense-name").val("");
    $("#expense-amount").val("");
    $("#select-frequency").val("Once");
    $("#select-category").val("Food");
    
    
    document.getElementById("bank-radio").checked = false;    
    document.getElementById("card-radio").checked = false;
    document.getElementById("cash-radio").checked = false;

    $("#modal").addClass("modal-display");
        

}


function clearModal2(){
    $("#modal2").addClass("modal-display");

}


/* Program Starts Here */
//demo storage
SetCashStorage("500");

//load the money info from differents sources
loadMoneyInfo();

//load the incomes 
loadIncomes();

//load the expenses
//loadExpenses();



$("#Add-Expense").click( function(event){
    console.log("Button Clicked");

    $("#modal").toggleClass("modal-display");


});

$("#Add-Income").click( function(event){
    console.log("Button Clicked");

    $("#modal2").toggleClass("modal-display");


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
    var ExpenseAmount = $("#expense-amount").val();
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

    clearModal();


});

$("#modal-button-cancel").click( function(event){
    
    clearModal();

});


$("#modal2-button-submit").click( function(event){
    clearModal2();

});


$("#modal2-button-cancel").click( function(event){
    
    clearModal2();

});