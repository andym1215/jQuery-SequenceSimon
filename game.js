// Setting up the button colors as variables
var buttonColours = ["red", "blue", "green", "yellow"];
// creating empty variables to be filled by functions later on
var gamePattern = [];
var userClickedPattern = [];
// variables to dictate what level you are on and whether or not you have even
// started playing the game yet.
var started = false;
var level = 0;
// this is the event listener for the entire html document waiting for a keypress
// to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
// This is the event listener for clicking the colored squares
$(".btn").click(function() {
// this is where we set up a variable to match whether the user selected the
// correct color in the correct sequence
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
// This is the function that holds an if-statement to validate if the user
// selected the correct color sequence and plays the "wrong" sound if not selected
// setting up the function startOver if the sequence was not correct
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}
// this is the funciton behind creating the random next sequence in the game.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
// creates the animation of "pressing the button"
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
// plays the sounds when both the game is leading and when you are clicking on colors
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// This is the function that restarts the entire game to 0
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
