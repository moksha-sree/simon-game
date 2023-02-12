var s=['green','red','yellow','blue'];
var seq = [];
var userseq = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    level++;
    $("#level-title").text("Level " + level);
    computerInput();
    started = true;
  }
});

function computerInput(){
        userseq = [];
        $('#level-title').text('Level '+ seq.length);
        var sound = s[Math.floor(Math.random()*4)];
        seq.push(sound);
        console.log(seq);
        $("#" +sound).fadeIn(100).fadeOut(100).fadeIn(100);
        playAudio(sound);
        console.log('sequence is : ' + seq);
}

$('.btn').click(function(){

    var color = $(this).attr('id');
    userseq.push(color);
    playAudio(color);
    addAnimation(color);
    console.log(userseq);
    checkAnswer(userseq.length - 1);
})

function checkAnswer(currentLevel){
    if (seq[currentLevel] === userseq[currentLevel]) {
        if (userseq.length === seq.length){
          setTimeout(function () {
            computerInput();
          }, 1000);
        }
      } else {
        
        playAudio("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }

}

function playAudio(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}

function startOver() {
  level = 0;
  seq = [];
  started = false;
}


function addAnimation(sound){

    document.getElementById(sound).classList.add('pressed');
        setTimeout(function(){
            document.getElementById(sound).classList.remove('pressed');
        },100);
}