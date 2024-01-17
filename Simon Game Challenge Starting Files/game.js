// This is used to store different color
var buttonColours = ["red", "blue", "green", "yellow"];
// This is to store the sequence of color for a game
var gamePattern = [];
// This is to store the user's click pattern
var userClickedPattern = [];
// flag variabel to see whether the game has started or not
var started = false;

var level = 0;


// eventlistner when user clicked the button
$('.btn').click(function() {
    if (started) {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1)
    }
})

// eventlistner when user press any key
$(document).keypress(function(event) {
    if (started === false) {
        // $('#level-title').text('Level 0'); //?????
        countDown();
        // setTimeout(nextSequence(), 5500);
        started = true; // the game has started
    }
})


function nextSequence() {
    // increase the level by 1 every time nextSequence() is called.
    level++;

    // update the h1 with this change in the value of level.
    $('#level-title').text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    // randomly choosen color
    var randomChosenColour = buttonColours[randomNumber];
    // Add randomChosenColour to the end of the gamePattern.
    gamePattern.push(randomChosenColour);
    // add flash-animation to the color selected
    setTimeout(function() {
        $(`#${randomChosenColour}`).addClass('flash-animation');
    }, 500);
    $(`#${randomChosenColour}`).removeClass('flash-animation');
    // play sound
    playSound(randomChosenColour);
    console.log(randomNumber);
}

// function to play sounds
function playSound(name) {
    // play sound for the color selected
    var audio = new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

// function for animation
function animatePress(currentColour) {
    $(`#${currentColour}`).addClass('pressed');
    setTimeout(function() {
        $(`#${currentColour}`).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Success');
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(nextSequence(), 1000);
            userClickedPattern = [];
        }
    }
    else {
        console.log('Failed');
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);
        playSound('wrong');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function countDown() {
    var count = 3;
    var countdownInterval = setInterval(function() {
        $('#level-title').text(count);
        count--;
        if (count === 0) {
            clearInterval(countdownInterval);
            nextSequence();
        }
    }, 1000);
}