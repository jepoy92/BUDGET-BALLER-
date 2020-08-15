$(document).ready(function () {

  var savedCalendar = {
    savedPayment: [{
      date: "",
      name: "",
      amount: ""
    }]
  }

  // This section builds the calendar using for loops creating a table
  // Set current year and month to variables
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth();

  // Function to build the calendar
  function renderCalendar(year, month) {
      let startOfMonth = new Date(year, month).getDay();
      let numOfDays = 32 - new Date(year, month, 32).getDate();
      let renderNum = 1;

      let tableBody = document.getElementById('table-body');
      let renderMonth = document.getElementById('month');
      let renderYear = document.getElementById('year');

      const today = new Date(currentYear, currentMonth);
      const monthString = today.toLocaleString('default', { month: 'long'});

      renderMonth.textContent = monthString;
      renderYear.textContent = year;

      for (i = 0; i < 6; i++) {
          let row = document.createElement('tr');
          for (j = 0; j < 7; j++) {
              if (i === 0 && j < startOfMonth) {
                  let td = document.createElement('td');
                  td.classList.add('empty');
                  row.append(td);
              } else if (renderNum > numOfDays) {
                  break;
              } else {
                  let td = document.createElement('td');
                  td.setAttribute('id', renderNum);
                  td.textContent = renderNum;
                  row.append(td);
                  renderNum++;
              }
          }
          tableBody.append(row);
      }
  }

  // Call function to build calendar based on given month and year
  renderCalendar(currentYear, currentMonth);
  // Button functionality to go to previous month
  $('#previous-month').on('click', function(){
    currentMonth--;
    clearCalendar();
    console.log(currentMonth);
    renderCalendar(currentYear, currentMonth);
  });
  // Button functionality to go to next month
  $('#next-month').on('click', function(){
    currentMonth++;
    clearCalendar();
    console.log(currentMonth);
    renderCalendar(currentYear, currentMonth);
  });

  // Clear the calendar
  function clearCalendar() {
    $('#table-body').html("");
  }
  
  // Event listener for calendar date click
  $("td").on("click", function (event) {
    console.log("Clicky Clack");
    var paymentDate = $(this)[0].firstChild.textContent;
    var selectedDay = $(this);

    console.log(paymentDate);

    // This will change the modal from hidden to display
    $('#modal').toggleClass('modal-display');

    // Submit information
    $('#modal-button-submit').on('click', function(event){
      event.preventDefault();
      getModalInformation(selectedDay);
      clearModal();
    });

    // Cancel modal
    $('#modal-button-cancel').on('click', function(event){
      event.preventDefault();
      clearModal();
    });
  });

  // Get info from modal
  function getModalInformation(selectedDay, paymentDate) {
    var expenseName = $('#expense-name').val();
    var expenseAmount = $('#expense-amount').val();
    var expenseFrequency = $('#select-frequency').val();
    var expenseCategory = $('#select-category').val();
    var selectedDate = selectedDay.text();

    // Just a whole bunch of sanity checks
    console.log(expenseName);
    console.log(expenseAmount);
    console.log(expenseFrequency);
    console.log(expenseCategory);

    // This is supposed to write the info to the date <td> tag but it is not working...
    selectedDay.text(selectedDate + " " + expenseName + " " + expenseAmount);
    console.log(selectedDay);

    clearModal();
  }

  // Clear modal on close
  function clearModal() {
    // This will change the modal to hidden
    $('#modal').addClass('modal-display');
    $('#expense-name').val("");
    $('#expense-amount').val("");
    $('#select-frequency').val("weekly");
    $('#select-category').val("entertainment");
  }
});