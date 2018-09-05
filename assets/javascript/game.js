var game = {
    states : [ "notStarted", "playerCharChosen", "opponentCharChosen", "battleInProgress", 
"opponentDefeated", "gameOver" ],
    currentState : "NotStarted",
    charactersAll : [ "Nicole Kidman", "Name2",  "Name3", "Name4", "Name5" , "Name6" , "Name7" , "Name8" , "Name9" ],
    charNumToPlay: 4,
    characters : [ "Name1", "Name2",  "Name3", "Name4" ],
    healthArray : [ 1, 2, 3, 4 ],
    attackArray : [ ],
    counterAttackArray : [ ],
    player : "",
    playerPoloroid : "",
    playerHealth : 0,
    playerAttackBase : 0,
    playerAttack : 0,
    playerCounter : 0,
    opponent: "",
    opponentPoloroid : "",
    opponentHealth : 0,
    opponentAttack : 0,
    opponentCounter : 0,
    //characterVal : [ 0, 0, 0, 0],
    //matchNum : 0,
    valDeck: [],
    valDeck1: [],
    valDeck2: [],

    //runningCalc : 0,
    //wins : 0,
    //losses : 0,

    randomIntFromInterval : function(min,max) {
        game.matchNum = Math.floor(Math.random()*(max-min+1)+min);
        return game.matchNum;
    },

    shuffle : function(array) {
        var i = 0
          , j = 0
          , temp = null
      
        for (i = array.length - 1; i > 0; i -= 1) {
          j = Math.floor(Math.random() * (i + 1))
          temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }

        return array;
      },
}

//$(document).ready(function() {
    $(function() {
        //when the page loads the first time:
        restart();

    function restart(){
        //hide containers where needed opponentListContainer
        elementToggle("#opponentListContainer", "d-none", "add");
        elementToggle("#playerCircle", "d-none", "add");
        elementToggle("#battlefield", "d-none", "add");
        elementToggle("#msgBoard", "d-none", "add");
        elementToggle("#restart", "d-none", "add");

        //empty the character array
        characters = [];

        //shuffle the charactersAll array so that the chosen characters change with every new game.
        game.shuffle(game.charactersAll);

        
        //create random health power
        for (var j=0; j<100; j++) {
            game.valDeck[j] = [j+100];
//            console.log(game.valDeck[j]);
        }
        game.shuffle(game.valDeck);

        //create random attack power
        for (var k=0; k<25; k++) {
            game.valDeck1[k] = [k+1];
 //           console.log(game.valDeck1[k]);
        }
        game.shuffle(game.valDeck1);

        //create random counter attack power
        for (var l=0; l<25; l++) {
            game.valDeck2[l] = [l+1];
//            console.log(game.valDeck2[l]);
        }
        game.shuffle(game.valDeck2);

        for (var i=0; i<game.charNumToPlay; i++) {
            //fill the character array with 4 characters from the characterAll array
            game.characters[i] = ( game.charactersAll[i] );
            //fill the health power array with 4 items from the valDeck
            game.healthArray[i] = ( game.valDeck[i] );
            game.attackArray[i] = ( game.valDeck1[i] );
            game.counterAttackArray[i] = ( game.valDeck2[i] );

        }
    

        createCharList("characterList", "character");
        //clear playerCircle
        game.player = "";
        game.playerPoloroid = "";
        game.playerHealth = 0;
        game.playerAttack = 0;
        game.playerAttackBase = 0;
        game.playerCounter = 0;
        createPlayerCircle(game.player, game.playerHealth, "notStarted");

        elementToggle("#characterContainer", "d-none", "show");

/*         for (var z=0; z<game.characters.length; z++) {
            console.log("attack: " + game.attackArray[z]);
            console.log("counter: " + game.counterAttackArray[z]);
    
        }
 */

    };

    //changes the class d-none so that the element either is hidden or not hidden
    function elementToggle(elementIn, classIn, actionIn) {
        if (actionIn === "add") {
            $(elementIn).addClass(classIn);
        } else if (actionIn === "show") {
            $(elementIn).removeClass(classIn);
        }
    };

    //create character list html block
    function createCharList (elementIn, typeIn) {
        //remove anything previously created to get a clean slate for the dom.
        var list = document.getElementById(elementIn);
        while (list.hasChildNodes()) {   
            list.removeChild(list.firstChild);
        }

        //identify the characters in the array and create the HTML to hold them in a list
        for (var i=0; i<game.characters.length; i++) {
            name=game.characters[i];
            healthPoints="HP "+game.healthArray[i];
            charID=typeIn+"-"+[i];
            charindex=[i];

            //construct the the html to append
            str = '<div class="col"> \
                    <div class="row h-100"> \
                        <div class="col my-auto mx-auto text-right"> \
                            <p class="m-0 pr-3">' + name + '</p> \
                            <p class="m-0 pr-3">' + healthPoints + '</p> \
                        </div> \
                        <div class="col my-auto mx-auto text-right"> \
                            <img class="img-responsive d-inline p-1 ' + typeIn + '" id="' + charID + '" data-' + typeIn + '-index="' + charindex + '" src="assets/images/poloroidFrame1.jpg" alt="' + name + '" /> \
                        </div> \
                    </div> \
                </div>'

            $("#"+elementIn).append(str);

        } //end loop

    }; //end function

    function createPlayerCircle (player,phealth, gameStatusIn) {
        //remove anything previously created to get a clean slate for the dom.
        var list = document.getElementById("playerCircle");
        while (list.hasChildNodes()) {   
            list.removeChild(list.firstChild);
        }

poloroid = "PoloroidFrame4.png";

        //construct the the html to append
        str = '<div class="col"> \
                <h2 class="text-left"><strong>Starlet</strong></h2> \
                <div class="row"> \
                    <div class="col-2 text-center"> \
                        <img class="img-responsive d-inline p-1 character" id="playerImg" src="assets/images/' + poloroid + '" alt="' + player +'" value=1 /> \
                        <p class="m-0">' + player + '</p> \
                        <p class="m-0">HP: ' + phealth + '</p> \
                    </div> \
                </div> \
            </div>'
        
        $("#playerCircle").append(str);

        //change game status
        gameStatus = gameStatusIn

    }; //end function


    function createBattleField (player, phealth, gameStatusIn, who) {
        //remove anything previously created to get a clean slate for the dom.
        var list = document.getElementById(who);
        while (list.hasChildNodes()) {   
            list.removeChild(list.firstChild);
        }

        //construct the html to append
        if(who === 'defender') {
            battlelabel='Starlet';
        } else {
            battlelabel='b-list';
        }

        poloroid = "PoloroidFrame4.png";

        str = '<p>'+ battlelabel +'</p> \
                    <img class="img-responsive d-inline p-1 ' + who +'" id="'+who+'Img" src="assets/images/' + poloroid + '" alt="' + player +'" value=1 /> \
                        <p class="m-0">' + player + '</p> \
                        <p id="' +who+ '-hp" class="m-0">HP: ' + phealth + '</p> \
                    </div> \
                </div> \
            </div>'
        
        $("#"+who).append(str);

        //hide opponent list container
        elementToggle("#opponentListContainer", "d-none", "add");

        //change game status
        gameStatus = gameStatusIn;

    }; //end function

    //create on-click listener for the character class
    $("#characterList").on("click",".character",function() {
        //which character was clicked?
        x = $(this).attr("data-character-index");
        //add character to player variable 
        game.player = game.characters[x];
        //add character's health to playerHealth variable
        game.playerHealth = game.healthArray[x];
        game.playerAttack = game.attackArray[x];
        game.playerAttackBase = game.attackArray[x];
        game.playerCounter = game.counterAttackArray[x];
        //add character to player circle
        createPlayerCircle(game.player, game.playerHealth, "playerCharChosen");
        //remove character for character list array
        game.characters.splice(x,1);
        //remove health Points for character in array
        game.healthArray.splice(x,1);
        game.attackArray.splice(x,1);
        game.counterAttackArray.splice(x,1);
        //recreate characterlist
        createCharList("characterList", "character");
        //create the List of Available Opponents
        createCharList("opponentsAvailList", "opponent1")

        //show Players Circle and Opponents List
        elementToggle("#playerCircle", "d-none", "show");
        elementToggle("#opponentListContainer", "d-none", "show");
    
        //hide Character List
        elementToggle("#characterContainer", "d-none", "add");

    });

    //create on-click listener for the opponent class
    $('#opponentsAvailList').on('click', '.opponent1', function() {
         //which character was clicked?
        x = $(this).attr("data-opponent1-index");
        //add character to opponent variable 
        game.opponent = game.characters[x];
        //add character's health to opponentHealth variable
        game.opponentHealth = game.healthArray[x];
        game.opponentAttack = game.attackArray[x];
        game.opponentCounter = game.counterAttackArray[x];
        //add player and opponent to battle field
        createBattleField(game.player, game.playerHealth, "opponentCharChosen", "defender");
        createBattleField(game.opponent, game.opponentHealth, "opponentCharChosen", "enemy");
        //remove character for character list array
        game.characters.splice(x,1);
        //remove health Points for character in array
        game.healthArray.splice(x,1);
        game.attackArray.splice(x,1);
        game.counterAttackArray.splice(x,1);
        //recreate characterlist
        createCharList("characterList", "character");
        //create the List of Available Opponents
        createCharList("opponentsAvailList", "opponent1")
        //show Battle Field and continue to show Opponents List; Character list still hidden
        elementToggle("#battlefield", "d-none", "show");
        elementToggle("#attack", "d-none", "show");
        //hide message board
        elementToggle("#msgBoard", "d-none", "add");
        //hide the player circle
        elementToggle("#playerCircle", "d-none", "add");


    });

    $("#attack").on('click', '.attack', function() {
        console.log("Attack Happened");

        //math

        //clear message board

        //remove anything previously created to get a clean slate for the dom.
        var list = document.getElementById("attackMsg");
        while (list.hasChildNodes()) {   
            list.removeChild(list.firstChild);
        }

        //create the message for the board
         var msg = '<p>You attacked ' + game.opponent + ' for ' + game.playerAttack + ' damage.</p> \
        <p>' + game.opponent + ' attacked you back for ' + game.opponentCounter + ' damage.</p>'

        //calc health points
        game.opponentHealth -= game.playerAttack;
        game.playerHealth -= game.opponentCounter;

        //test for death

        switch(true) {
            case (game.playerHealth <=0):
                console.log ("Player Dead!");
                //game over -- player dead
                msg += '<p>You have been defeated ... game over</p>';
                //hide the attack button
                elementToggle("#attack", "d-none", "add");
                break;
            case (game.opponentHealth <=0):
                console.log ("Opponent Dead!");
                //game over -- player dead
                //check to see if there are any other opponents
                console.log(game.characters.length);
                if(game.characters.length > 0) {
                    msg += '<p>You have defeated ' + game.opponent + ', you can choose another enemy to fight.</p>';
                    //hide the attack button
                    elementToggle("#attack", "d-none", "add");
                    //show opponent list container
                    elementToggle("#opponentListContainer", "d-none", "show");

                } else {
                    msg += '<p>You are the winner!... game over</p>'
                }
                break;
            default:
                console.log("Keep Playing");
        }

        //if player dead -- end of game

        //if opponent dead -- end of battle, pick another enemy

        //game continues

        //append the message
        $("#attackMsg").append(msg);

        //show the board (it may be showing or it may be hidden)
        elementToggle("#msgBoard", "d-none", "show");

        //update the health points, attack and counter attack variables
        

        game.playerAttack = parseInt(game.playerAttack) + parseInt(game.playerAttackBase);


        
        
        //display new health points on the character
        $('#defender-hp').text('hp: '+game.playerHealth);
        //display new health points on the enemy
        $('#enemy-hp').text('hp: '+game.opponentHealth);
        //defender-hp
        //enemy-hp




//        <p>You have been defeated ... game over</p>
// <p>You have defeated Enemy Name, you can choose another enemy to fight.</p>
//<p>No enemy here.  You must choose an enemy to continue the game.</p> 


    });



    $("#restartDiv").on("click",".restart",function() {
        restart();
    });

});


