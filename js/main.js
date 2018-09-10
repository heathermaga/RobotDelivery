// ************************************
// Heather Maga
// September 09 2018
// There is a massive amount of duplicate code that could & should be optimized
// ************************************

// ***** Hide all the empty alert boxes
function readyPage() {
  $('.alert').filter(function() {
    return $.trim($(this).text()) === ''
  }).hide();

}

// ***** clear the text and call the readyPage
// ***** to hide all the alert boxes
function resetPage() {
  $('input[type=text]').val('');
  var alertBoxes = document.getElementsByClassName('alert');
  for (var i = 0; i < alertBoxes.length; i++) {
    alertBoxes[i].innerHTML = "";
  }
  readyPage();
}

// ***** check to see if there is text
// ***** in any alert box and display if there is
function checkAlerts() {
  $('.alert').filter(function() {
    return $.trim($(this).text()) != ''
  }).show();
}

// ***** this restricts the characters that can be
// ***** entered into the movement box
function checkCharacters(e) {
  var k;
  document.all ? k = e.keyCode : k = e.which;
  var char = String.fromCharCode(k);
  if (!char.match(/[\^<>v]/i)) return false;
  return true;
}

// ***** this restricts the characters that can be
// ***** entered into the two number only boxes
function checkNumbers(e) {
  var k;
  document.all ? k = e.keyCode : k = e.which;
  var char = String.fromCharCode(k);
  if (!char.match(/[0-9]|\./)) return false;
  return true;
}

// ***** Robot constructor
function Robot(xPos, yPos) {
  this.x = xPos;
  this.y = yPos;
}

// ***** Present constructor
function Present(xPos, yPos) {
  this.x = xPos;
  this.y = yPos;
}


// step thru one turn
function runOnce() {
  var numberOfRobots = 1; //the number of robots, defaulting to 1
  numberOfRobots = document.getElementById('numberOfRobots').value
  var movesEntered = document.getElementById('robotMoves').value //the movement sequence, given as a string
  var presentQuery = document.getElementById('housePresents').value
  var numberOfMoves = movesEntered.length;

  var errorMessage = ""; //errorResult

  var Robots = [];
  var Presents = [];


  if (numberOfRobots > 20) {
    errorMessage = "You entered more than 20 for the number of robots. Please try again!"
  } else if (numberOfRobots == 0) {
    errorMessage = "You entered 0 for the number of robots. That is not a valid amount. Please try again!"
  } else if (!movesEntered) {
    errorMessage = "You have not entered any moves for the robot. Please try again!"
  } else if (!presentQuery) {
    errorMessage = "You have not entered a presents query number. Please try again!"
  } else {
    document.getElementById("simpleResult").textContent = "You Entered: " + numberOfRobots + " robots. and the following sequence of " + numberOfMoves + " moves: " + movesEntered;
    // query for current position of robots
    //Create the robots and add to array
    for (i = 0; i < numberOfRobots; i++) {
      Robots.push(new Robot(0, 0));
    }

    var loops
    if (Robots.length > numberOfMoves) {
      loops = numberOfMoves;
    } else {
      loops = Robots.length
    }

    var moves = movesEntered.split('');
    var curPos = [];

    for (i = 0; i < loops; i++) {
      curPos = [];

      Robots.forEach(function(element) {
        curPos.push(element.x.toString() + element.y.toString());
      });

      switch (moves[i].toUpperCase()) {
        case "<":
          Robots[i].x = Robots[i].x - 1;
          break;
        case ">":
          Robots[i].x = Robots[i].x + 1;
          break;
        case "V":
          Robots[i].y = Robots[i].y - 1;
          break;
        case "^":
          Robots[i].y = Robots[i].y + 1;
          break;
      }

      // check if there is a robot at location
      var foundMatch = false;

      var BobX = Robots[i].x;
      var BobY = Robots[i].y;
      var BobXY = BobX.toString() + BobY.toString();

      var foundMatch = curPos.indexOf(BobXY);

      if (foundMatch < 0) {
        Presents.push(new Present(Robots[i].x, Robots[i].y));
      }

    }

		// Display robot locations
    var displayWhere = "<h2>Robot Locations <small class='text-muted'>After One Move</small></h2>";
    var i = 1;
    Robots.forEach(function(element) {
      displayWhere = displayWhere + "<strong>Robot " + i + ": </strong> " + element.x.toString() + ", " + element.y.toString() + "<br />";
      i++;
    });
    document.getElementById("whereResultsOne").innerHTML = displayWhere;

    // ******************For Debug Only**************************
    //Presents.forEach(function(element) {
    //  console.log(element);
    //});
    // **********************************************************

		//get all the unique present Locations
		var uniqueLocations = Array.from(new Set(Presents))
		var ULXY = [];
		var simpPres = [];
		var countPresentsAtLocations = [];
		var onlyCount=[];

    uniqueLocations.forEach(function(element) {
      ULXY.push (element.x.toString() + element.y.toString());
    });

		Presents.forEach(function(element) {
      simpPres.push (element.x.toString() + element.y.toString());
    });

		ULXY.forEach(function(element) {
      result = simpPres.filter(i => i === element).length;
			countPresentsAtLocations.push(element,result);
			onlyCount.push(result);
    });

		matchingNumber = onlyCount.filter(i => i >= presentQuery).length;

		//Display how many presents delivered
		if (Presents.length > 1)
			document.getElementById("presentCountOne").innerHTML = "<strong>There were " + Presents.length + " presents delivered and  " + matchingNumber + " locations had " + presentQuery + " or more presents delivered after one move.";
		else {
			document.getElementById("presentCountOne").innerHTML = "<strong>There was " + Presents.length + " present delivered after one move.";
		}

  }
  document.getElementById("errorResult").textContent = errorMessage;
  checkAlerts();
}

// keep moving until no moves left
function fullRunThru() {
  var numberOfRobots = 1; //the number of robots, defaulting to 1
  numberOfRobots = document.getElementById('numberOfRobots').value
  var movesEntered = document.getElementById('robotMoves').value //the movement sequence, given as a string
  var presentQuery = document.getElementById('housePresents').value
  var numberOfMoves = movesEntered.length;

  var errorMessage = ""; //errorResult

  var Robots = [];
  var Presents = [];


  if (numberOfRobots > 20) {
    errorMessage = "You entered more than 20 for the number of robots. Please try again!"
  } else if (numberOfRobots == 0) {
    errorMessage = "You entered 0 for the number of robots. That is not a valid amount. Please try again!"
  } else if (!movesEntered) {
    errorMessage = "You have not entered any moves for the robot. Please try again!"
  } else if (!presentQuery) {
    errorMessage = "You have not entered a presents query number. Please try again!"
  } else {
    document.getElementById("simpleResult").textContent = "You Entered: " + numberOfRobots + " robots. and the following sequence of " + numberOfMoves + " moves: " + movesEntered;
    // query for current position of robots
    //Create the robots and add to array
    for (i = 0; i < numberOfRobots; i++) {
      Robots.push(new Robot(0, 0));
    }


// this is where things need to change.

    var moves = movesEntered.split('');
    var curPos = [];
		var robotLoopCount=0;

//console.log (numberOfRobots);

    for (i = 0; i < numberOfMoves; i++) {

		console.log (robotLoopCount);
		console.log (i);

		if(numberOfRobots <= robotLoopCount){
			robotLoopCount=0
		}

			curPos = [];
      Robots.forEach(function(element) {
        curPos.push(element.x.toString() + element.y.toString());
      });

      switch (moves[i].toUpperCase()) {
        case "<":
          Robots[robotLoopCount].x = Robots[robotLoopCount].x - 1;
          break;
        case ">":
          Robots[robotLoopCount].x = Robots[robotLoopCount].x + 1;
          break;
        case "V":
          Robots[robotLoopCount].y = Robots[robotLoopCount].y - 1;
          break;
        case "^":
          Robots[robotLoopCount].y = Robots[robotLoopCount].y + 1;
          break;
      }

      // check if there is a robot at location
      var foundMatch = false;

      var BobX = Robots[robotLoopCount].x;
      var BobY = Robots[robotLoopCount].y;
      var BobXY = BobX.toString() + BobY.toString();

      var foundMatch = curPos.indexOf(BobXY);

      if (foundMatch < 0) {
        Presents.push(new Present(Robots[robotLoopCount].x, Robots[robotLoopCount].y));
      }

			robotLoopCount++;

    }

		// Display robot locations
    var displayWhere = "<h2>Robot Locations <small class='text-muted'>After All Moves</small></h2>";
    var i = 1;
    Robots.forEach(function(element) {
      displayWhere = displayWhere + "<strong>Robot " + i + ": </strong> " + element.x.toString() + ", " + element.y.toString() + "<br />";
      i++;
    });
    document.getElementById("whereResultsFull").innerHTML = displayWhere;

		//get all the unique present Locations
		var uniqueLocations = Array.from(new Set(Presents))
		var ULXY = [];
		var simpPres = [];
		var countPresentsAtLocations = [];
		var onlyCount=[];

    uniqueLocations.forEach(function(element) {
      ULXY.push (element.x.toString() + element.y.toString());
    });

		Presents.forEach(function(element) {
      simpPres.push (element.x.toString() + element.y.toString());
    });

		ULXY.forEach(function(element) {
      result = simpPres.filter(i => i === element).length;
			countPresentsAtLocations.push(element,result);
			onlyCount.push(result);
    });

		matchingNumber = onlyCount.filter(i => i >= presentQuery).length;

		//Display how many presents delivered
		if (Presents.length > 1)
			document.getElementById("presentCountFull").innerHTML = "<strong>There were " + Presents.length + " presents delivered and  " + matchingNumber + " locations had " + presentQuery + " or more presents delivered after all moves compelted.";
		else {
			document.getElementById("presentCountFull").innerHTML = "<strong>There was " + Presents.length + " present delivered after all moves completed.";
		}

  }
  document.getElementById("errorResult").textContent = errorMessage;
  checkAlerts();
}
