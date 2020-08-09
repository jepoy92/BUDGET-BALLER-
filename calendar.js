$(document).ready(function () {
    var currentMonth = moment().format("MMMM YYYY");
    $('<h1>').text(currentMonth).prependTo('#calendar-area');

    // creating week rows
    for (let i = 0; i < 6; i++) {
      var newRow = $('<tr>').attr('id', 'week' + i).attr('class', 'container').attr('style', '');
      $('table').append(newRow);
    }

    // Display weekday text
    var weekDayText = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 0; i < weekDayText.length; i++) {
      var weekDay = weekDayText[i];
      $('<th>').text(weekDay).attr('style', 'border: 1px solid black; text-align: center; width: 150px;').attr('class', '').appendTo('#week0');
    }

    // creating the days
    var dayCount = 0;
    
    for (let i = 1; i < weekDayText.length; i++) {
      var weekDay = weekDayText[i];
      console.log(currentDay);
      for (let j = 0; j < weekDayText.length; j++) {
        dayCount++;
        var currentDay = moment().date(dayCount + 1).format('D');

        var newDay = $('<td>').attr('style', 'border: 1px solid black; height: 150px; width: 150px; margin: 10px;');
        $('#week' + i).append(newDay);

        var dayText = $('<p>').text(currentDay).attr('class', 'float-left').attr('style', ' margin-bottom: 150px; border: 1px solid black; width: 30px; height: 30px;');
        newDay.append(dayText);
      }
    }

    

  });