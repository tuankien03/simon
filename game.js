let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
$(document).keypress((e) => {
    if (level == 0) {
        nextSequence();
    }
})



const nextSequence = () => {
    level++;
    $('h1').text('Level ' + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$('.btn').click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})

function playSound(sound) {
    var audio = new Audio('./sounds/' + sound + '.mp3');
    audio.play();
}

function animatePress(press) {
    $('#' + press).addClass('pressed');
    setTimeout(() => {
        $('#' + press).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log('sucess')
        if (userClickedPattern.length == gamePattern.length) {
            userClickedPattern = [];
            setTimeout(nextSequence(), 1000);
        }
    } else {
        console.log('wrong');
        $('body').addClass('game-over');
        playSound('wrong');
        $('h1').text('Game Over, Press Any Key to Restart');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}



