var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}


$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;



  }
});


$(".btn").click(function() {
  var userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);

  checkAnswer(userClickedPattern.length - 1);
});



function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
    startOver();
  }

}


function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  $("#" + randomChoosenColour).fadeIn(90).fadeOut(90).fadeIn(90);
  playSound(randomChoosenColour);

}

//Sound Section
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animation Section
function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
