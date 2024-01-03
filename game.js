var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }

});

function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  // if (gamePattern.length == userClickedPattern.length) {
  //   if (compareArray(userClickedPattern, gamePattern)) {
  //     setTimeout(function() {
  //       nextSequence();
  //     }, 1000);
  //     while (userClickedPattern.length > 0) {
  //       userClickedPattern.pop();
  //     }
  //   }
  //   else {
  //     var audio = new Audio("sounds/wrong.mp3");
  //     audio.play();
  //     $("#level-title").text("Game Over, Press Any Key to Restart");
  //     $("body").addClass("game-over");
  //     setTimeout(function() {
  //       $("body").removeClass("game-over");
  //     }, 100);
  //     $(document).keypress(function() {
  //       window.location.reload();
  //     });
  //   }
  // }

});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {


    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      while (userClickedPattern.length > 0) {
        userClickedPattern.pop();
      }
    }
  }
  else{
    playSound("wrong");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function compareArray(a, b) {
  var arrayLength = a.length;
  for (var i = 0; i < arrayLength; i++) {
    if (a[i] != b[i]) return false;
  }
  return true;
}
