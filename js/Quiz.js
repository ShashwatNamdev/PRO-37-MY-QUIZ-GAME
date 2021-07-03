class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question();
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    textSize(30);
    fill("black");
    text("Showing the result of Quiz", 250, 20);
    text("-----------------------------------",250,38);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();
    //write condition to check if contestantInfor is not undefined
    if(contestant !== undefined){
       var displayAnswer = 230;
       fill("blue");
       textSize(20);
       text("NOTE: Contestant who answered correct are highlighted in green color!", 130, 230);
       
       //  write code to add a note here
       
       //write code to highlight contest who answered correctly
       for(var plr in contestant){
        var correctAnswer = "2";
        if(correctAnswer === contestant[plr].answer)
        fill("green");
        
        else
        fill("red");
        displayAnswer+=30;
        textSize(15);
        text(contestant[plr].name + ": " + contestant[plr].answer, 250, displayAnswer);
      }
    }
  }
}
