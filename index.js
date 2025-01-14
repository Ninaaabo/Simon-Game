var colors = ["green", "red", "yellow", "blue"];
var keys = ["a", "s", "d", "w"];
var input = "";
var result = "";
var inGame = false;
var level = 1;


function pressedAnimation(color, changeClass){
    new Audio("./sounds/" + color + ".mp3").play();
    $("." + color).addClass(changeClass);
    setTimeout(() => {$("." + color).removeClass(changeClass);}, 100);
}

$(document).keypress(function(event){
    if(keys.includes(event.key)) {
        if(!inGame) {
            pressedAnimation(colors[keys.indexOf(event.key)], "pressed");
            setTimeout(gameStart, 400);
        }
        else{
            input += keys.indexOf(event.key);
            if (check())
            { 
                pressedAnimation(colors[keys.indexOf(event.key)], "pressed");
                console.log("got right");
            }
        }
    }
})

colors.forEach((color) => $("." + color).click(function(){
    if(!inGame) {
        pressedAnimation(color, "pressed");
        setTimeout(gameStart, 400);
    }
    else{
        input += colors.indexOf(color);
        if (check()) pressedAnimation(color, "pressed");
    }    
}));

function chooseNext(){
    var choice = Math.floor(Math.random()*4);
    result += choice;
    console.log("res in choose next: " + result);
    $("#level-title").text("Level " + level++);
    pressedAnimation(colors[choice], "pressed");
}

function check(){
    if(!result.startsWith(input)) {
        new Audio("./sounds/wrong.mp3").play();
        pressedAnimation(colors[input[-1]], "game-over pressed")
        input = "";
        result = "";
        $("#level-title").text("Game over at level " + level + ". Press any Color to Start");
        $("body").addClass("game-over");
        setTimeout(() => {$("body").removeClass("game-over");}, 200);        
        level = 1;
        inGame = false;
        return false;
    }
    else if(input.length === result.length){
        input = "";
        setTimeout(chooseNext, 500);
    }
    return true;

}

function gameStart(){
    inGame = true;
    chooseNext();
}
