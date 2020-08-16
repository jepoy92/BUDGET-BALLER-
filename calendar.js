// This section builds the calendar using for loops creating a table
// Set current year and month to variables
var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();

// Function to build the calendar
function renderCalendar(year, month) {
  // Using Date() to calculate date information to display on the calendar
  let startOfMonth = new Date(year, month).getDay();
  let numOfDays = 32 - new Date(year, month, 32).getDate();
  let renderNum = 1;

  // Retrieve HTML elements to write to
  let tableBody = document.getElementById("table-body");
  let renderMonth = document.getElementById("month");
  let renderYear = document.getElementById("year");

  // Formats the current month into a String to be written at the top of the calendar. Ex: 7 === Augsut
  const today = new Date(currentYear, currentMonth);
  const monthString = today.toLocaleString("default", { month: "long" });

  renderMonth.textContent = monthString;
  renderYear.textContent = year;

  // Loop through to create the rows (weeks) of the calendar
  for (i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    // Loop through to create each day of the week
    for (j = 0; j < 7; j++) {

      // Loop to check what day of the week the first day of the month starts
      // Creates empty days prior to creating the first day of the month
      if (i === 0 && j < startOfMonth) {
        let td = document.createElement("td");
        td.classList.add("empty");
        td.classList.add("calendar-table-data");
        row.append(td);

        // If the last day of the month has been written then break out of the loop
      } else if (renderNum > numOfDays) {
        break;

        // Write the actual days of the month
      } else {
        // This will be the "box" for each day
        let td = document.createElement("td");
        td.setAttribute("id", renderNum);
        td.setAttribute("class", "calendar-table-data");

        // This will hold the date of each day
        let pTag = document.createElement("p");
        pTag.textContent = renderNum;
        pTag.setAttribute("class", "calendar-ptag");

        row.append(td);
        td.append(pTag);
        renderNum++;
      }
    }
    // Append constructed rows to the table element
    tableBody.append(row);
  }
}

// Call function to build calendar based on given month and year
renderCalendar(currentYear, currentMonth);

// Button functionality to go to previous month
$("#previous-month").on("click", function () {
  currentMonth--;
  clearCalendar();
  renderCalendar(currentYear, currentMonth);
});

// Button functionality to go to next month
$("#next-month").on("click", function () {
  currentMonth++;
  clearCalendar();
  renderCalendar(currentYear, currentMonth);
});

// Clear the calendar
function clearCalendar() {
  $("#table-body").html("");
}


function loadExpenses() {
  if(JSON.parse(localStorage.getItem("Storaged-Expenses"))){
      var StoragedExpenses = JSON.parse(localStorage.getItem("Storaged-Expenses"));
      console.log(StoragedExpenses);
      
      StoragedExpenses.forEach(element => {
          var newDate = moment(element.date).format('DD');
          var newName = element.name;
          var newAmount = element.amount;

          // console.log(element);
          // console.log(newDate);

          var newText = document.createElement('p');
          newText.textContent = (" " + newName + " " + newAmount);

          $('#' + newDate).append(newText);
      });
  }
  else
      console.log("not storaged");
}

loadExpenses();

function SetExpense(expense){

  if(JSON.parse(localStorage.getItem("Storaged-Expenses")))
      var ExpensesList = JSON.parse(localStorage.getItem("Storaged-Expenses"));
  else
      var ExpensesList = [];


  ExpensesList.push(expense);
  localStorage.setItem("Storaged-Expenses", JSON.stringify(ExpensesList));

  loadExpenses();
}

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


// Event listener for calendar date click
$("td").on("click", function (event) {
  var paymentDate = $(this)[0].firstChild.textContent;
  var selectedDay = $(this);

  console.log(paymentDate);
  console.log("Calendar: " + selectedDay);

  // This will change the modal from hidden to display
  $("#modal").toggleClass("modal-display");

  // Submit information
  $("#modal-button-submit").on("click", function (event) {
    event.preventDefault();
    getModalInformation(selectedDay);
    clearModal();
  });

  // Cancel modal
  $("#modal-button-cancel").on("click", function (event) {
    event.preventDefault();
    clearModal();
  });
});

// Get info from modal
function getModalInformation(selectedDay, paymentDate) {
  var ExpenseName = $("#expense-name").val();
  var ExpenseAmount = $("#expense-amount").val();
  var ExpenseFrecuency = $("#select-frequency").val();
  var ExpenseCategory = $("#select-category").val();
  var ExpenseDate = selectedDay.text();

  console.log("Get Modal Info: " + selectedDay);
  // Just a whole bunch of sanity checks
  console.log(ExpenseName);
  console.log(ExpenseAmount);
  console.log(ExpenseFrecuency);
  console.log(ExpenseCategory);

  var newText = document.createElement('p');
  newText.textContent = (" " + ExpenseName + " " + ExpenseAmount);
  selectedDay.append(newText);

  const newExpense = new Expense(ExpenseDate,"place",ExpenseName,ExpenseAmount,ExpenseCategory,ExpenseFrecuency);

  SetExpense(newExpense);
  clearModal();
}

// Clear modal on close
function clearModal() {
  // This will change the modal to hidden
  selectedDay = "";
  console.log("Clear Modal: " + selectedDay);
  $("#modal").addClass("modal-display");
  $("#expense-name").val("");
  $("#expense-amount").val("");
  $("#select-frequency").val("weekly");
  $("#select-category").val("entertainment");
}

