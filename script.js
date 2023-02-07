// alert("hello");
let ButtonColor = ["red", "blue", "green", "yellow"];


let UserPattern = [];
let gamePattern = [];

let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    let UserColor = $(this).attr("id");
    UserPattern.push(UserColor);

    playSound(UserColor);
    AnimationCall(UserColor);
    checkAnswer(UserPattern.length - 1);
});

function checkAnswer(currentlevel) {
    if (gamePattern[currentlevel] === UserPattern[currentlevel]) {
        if (UserPattern.length === gamePattern.length) {
            setTimeout(function()  {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        $("#level-title").text("Game-Over , press any key To restart");


        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
};

function nextSequence() {
    UserPattern = [];
    level++;
    $("#level-title").text("level " + level);

    let rndNumber = Math.floor(Math.random() * 4);
    let randChosenColor = ButtonColor[rndNumber];
    gamePattern.push(randChosenColor);

    $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randChosenColor);
};


function AnimationCall(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};