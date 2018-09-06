var game = {
    states : [ "notStarted", "playerCharChosen", "opponentCharChosen", "battleInProgress", "opponentDefeated", "gameOver" ],
    currentState : "NotStarted",
    valDeck1: [],
    valDeck2: [],
    valDeck3: [],
    charactersAll : [ "Nicole Kidman", "George Clooney",  "Johnny Depp", "Salma Hayek", "Reese Witherspoon" , "Morgan Freeman" , "Will Smith" , "Helen Mirren" , "Emma Stone" , "Patrick Stewart"],
    charNumToPlay: 4,
    characters : [],
    healthArray : [],
    attackArray : [],
    counterAttackArray : [],
    player : "",
    playerHealth : 0,
    playerAttackBase : 0,
    playerAttack : 0,
    playerCounter : 0,
    opponent: "",
    opponentHealth : 0,
    opponentAttack : 0,
    opponentCounter : 0,

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

        /*
        Adding and removing a class to show or hide a element, usually a div.  
        In this application, the only class that uses this function is d-none (a bootstrap class), 
        but the function is generic so could be used elsewhere.
        */
        function elementToggle(elementIn, classIn, actionIn) {
            if (actionIn === "hide") {
                $(elementIn).addClass(classIn);
            } else if (actionIn === "show") {
                $(elementIn).removeClass(classIn);
            }
        };

    function restart(){
        //hide containers where needed opponentListContainer
        elementToggle("#opponentListContainer", "d-none", "hide");
        elementToggle("#playerCircle", "d-none", "hide");
        elementToggle("#battlefield", "d-none", "hide");
        elementToggle("#msgBoard", "d-none", "hide");
        elementToggle("#restart", "d-none", "hide");

        //empty the character array
        characters = [];

        //shuffle the charactersAll array so that the chosen characters change with every new game.
        game.shuffle(game.charactersAll);

        
        //create random health power
        for (var j=0; j<100; j++) {
            game.valDeck1[j] = [j+100];
        }
        game.shuffle(game.valDeck1);

        //create random attack power
        for (var k=0; k<25; k++) {
            game.valDeck2[k] = [k+1];
        }
        game.shuffle(game.valDeck2);

        //create random counter attack power
        for (var l=0; l<25; l++) {
            game.valDeck3[l] = [l+1];
        }
        game.shuffle(game.valDeck3);

        for (var i=0; i<game.charNumToPlay; i++) {
            //fill the character array with 4 characters from the characterAll array
            game.characters[i] = ( game.charactersAll[i] );
            //fill the health power array with 4 items from the valDeck
            game.healthArray[i] = ( game.valDeck1[i] );
            game.attackArray[i] = ( game.valDeck2[i] );
            game.counterAttackArray[i] = ( game.valDeck3[i] );

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
            healthPoints="Star-Power: "+game.healthArray[i];
            charID=typeIn+"-"+[i];
            charindex=[i];

            cat1 = "PoloroidFrame1.jpg";
                var temp1 = name;
                cat1 = temp1.replace(" ","_") + "_Polaroid.png";

            //construct the the html to append
            str = '<div class="col"> \
                    <div class="row h-100"> \
                        <div class="col my-auto mx-auto text-right"> \
                            <p class="m-0 pr-0">' + name + '</p> \
                            <p class="m-0 pr-0">' + healthPoints + '</p> \
                        </div> \
                        <div class="col m-0 p-0 my-auto mx-auto text-right"> \
                            <img class="img-responsive d-inline p-1 ' + typeIn + '" id="' + charID + '" data-' + typeIn + '-index="' + charindex + '" src="assets/images/' + cat1 + '" alt="' + name + '" /> \
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


console.log("player 180: " + player);
cat = "PoloroidFrame4.png";
    var temp = player;
    cat = temp.replace(" ","_") + "_starlet.png";


        //construct the the html to append
        str = '<div class="col"> \
                <h2 class="text-left"><strong>Starlet</strong></h2> \
                <div class="row"> \
                    <div class="col-2 text-center"> \
                        <img class="img-responsive d-inline p-1 character" id="playerImg" src="assets/images/' + cat + '" alt="' + player +'" value=1 /> \
                        <p class="m-0">Star-Power: ' + phealth + '</p> \
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

        cat = "PoloroidFrame4.png";
            var temp = player;
            cat = temp.replace(" ","_") + "_starlet.png";

        str = '<p>'+ battlelabel +'</p> \
                    <img class="img-responsive d-inline p-1 ' + who +'" id="'+who+'Img" src="assets/images/' + cat + '" alt="' + player +'" value=1 /> \
                        <p id="' +who+ '-sp" class="m-0">Star-Power: ' + phealth + '</p> \
                    </div> \
                </div> \
            </div>'
        
        $("#"+who).append(str);

        //hide opponent list container
        elementToggle("#opponentListContainer", "d-none", "hide");

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
        elementToggle("#characterContainer", "d-none", "hide");

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
        elementToggle("#msgBoard", "d-none", "hide");
        //hide the player circle
        elementToggle("#playerCircle", "d-none", "hide");


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

                //swap photo
                //get photo name
                
                cat2 = "PoloroidFrame4.png";
                    var temp2 = game.player;
                    cat2 = 'assets\\images\\' + temp2.replace(" ","_") + "_Dead.png";
                $("#defenderImg").attr("src",cat2);

                //is opponent also dead?
                if (game.opponentHealth <=0) {
                    cat3 = "PoloroidFrame4.png";
                        var temp3 = game.opponent;
                        cat3 = 'assets\\images\\' + temp3.replace(" ","_") + "_Dead.png";
                    $("#enemyImg").attr("src",cat3);
                }



                //msg board
                msg += '<p>You have been defeated ... game over</p>';
                //hide the attack button
                elementToggle("#attack", "d-none", "hide");
                break;
            case (game.opponentHealth <=0):
                console.log ("Opponent Dead!");
                //game over -- opponent dead
                cat3 = "PoloroidFrame4.png";
                    var temp3 = game.opponent;
                    cat3 = 'assets\\images\\' + temp3.replace(" ","_") + "_Dead.png";
                $("#enemyImg").attr("src",cat3);

                //check to see if there are any other opponents
                console.log(game.characters.length);
                if(game.characters.length > 0) {
                    msg += '<p>You have defeated ' + game.opponent + ', you can choose another enemy to fight.</p>';
                    //show opponent list container
                    elementToggle("#opponentListContainer", "d-none", "show");
                } else {
                    msg += '<p>You are the winner!... game over</p>'
                }
                //hide the attack button
                elementToggle("#attack", "d-none", "hide");

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
        $('#defender-sp').text('Star-Power: '+game.playerHealth);
        //display new health points on the enemy
        $('#enemy-sp').text('Star-Power: '+game.opponentHealth);




//        <p>You have been defeated ... game over</p>
// <p>You have defeated Enemy Name, you can choose another enemy to fight.</p>
//<p>No enemy here.  You must choose an enemy to continue the game.</p> 


    });



    $("#restartDiv").on("click",".restart",function() {
        restart();
    });

});
