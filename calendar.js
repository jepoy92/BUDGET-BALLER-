$(document).ready(function () {
  // This section builds the calendar using for loops creating a table
  var currentMonth = moment().format("MMMM YYYY");
  $("<h1>").text(currentMonth).prependTo("#calendar-area");
$('#month-generate').attr('style', 'margin: 200px;')

  var currentMonth = moment().format("MMMM");
  $("<h1>").text(currentMonth).prependTo("#month-name");

  // Create Table Elemenet for the calendar to be written to
  $('<table>').appendTo('#month-generate');

  // creating table rows for each week
  for (let i = 0; i < 6; i++) {
    var newRow = $("<tr>").attr("id", "week" + i).attr("class", "container").attr("style", "");
    $("table").append(newRow);
  }

    $("table").attr('style', 'text-align: center;').append(newRow);
 
  // Display weekday text
  // Array with days of the week
  var weekDayText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  // Creating table header elements to hold the weekday text
  for (let i = 0; i < weekDayText.length; i++) {
    var weekDay = weekDayText[i];
    $("<th>").text(weekDay).attr("style","border: 1px solid black; text-align: center; width: 150px;").appendTo("#week0");
  }

  // creating the days
  //Variable to assist with counting days in the calendar
  var dayCount = 0;

  for (let i = 1; i < weekDayText.length; i++) {
    var weekDay = weekDayText[i];
    // console.log(currentDay);
    for (let j = 0; j < weekDayText.length; j++) {
      dayCount++;
      // Gets the current date and adds one for each iteration
      var currentDay = moment().date(dayCount + 1).format("D");

      // Creates table data element for each day of the month
      // var newDay = $("<td>").attr("style", "border: 1px solid black; height: 150px; width: 150px; margin: 10px;");

      var newDay = $("<td>").attr("style", "border: 1px solid black; height: 100px; width: 100px; margin: 10px; text-align: center;");
      $("#week" + i).append(newDay);

      // Write the date in each table data element
      var dayText = $("<p>").text(currentDay).attr("class", "float-left").attr("style"," margin-bottom: 150px; border: 1px solid black; width: 30px; height: 30px;");
      newDay.append(dayText);
    }
  }
  
  // Event listener for calendar date click
  $("td").on("click", function (event) {
    console.log("Clicky Clack");
    var paymentDate = $(this)[0].firstChild.textContent;
    var selectedDay = $(this).innerHTML;

    console.log(paymentDate);

    // This will change the modal from hidden to display
    // $('#calendar-modal').attr('stylye', 'display: block;');

    // Submit information
    $('#modal-button-submit').on('click', function(event){
      event.preventDefault();
      getModalInformation();
      clearModal();
    });

    // Cancel modal
    $('#modal-button-cancel').on('click', function(event){
      event.preventDefault();
      clearModal();
    });
  });

  // Get info from modal
  function getModalInformation() {
    var expenseName = $('#expense-name').val();
    var expenseAmount = $('#expense-amount').val();
    var expenseFrequency = $('#select-frequency').val();
    var expenseCategory = $('#select-category').val();

    // Just a whole bunch of sanity checks
    console.log(expenseName);
    console.log(expenseAmount);
    console.log(expenseFrequency);
    console.log(expenseCategory);

    // This is supposed to write the info to the date <td> tag but it is not working...
    selectedDay = expenseName + expenseAmount;
    console.log(selectedDay);

    clearModal();
  }

  // Clear modal on close
  function clearModal() {
    // This will change the modal to hidden
    // $('#calendar-modal').attr('stylye', 'display: none;');
    $('#expense-name').val("");
    $('#expense-amount').val("");
  }
});
