# unit-4-game-rpg
Bootcamp Assignment 8/25/2018 - RPG Game

I might be the only person in the class who has not watch a full episode of Star Wars, so I switched it up just a bit and created a Hollywood Stars Battle.
Each star has Star Points instead of Health Points.

Stars can battle each other just like the old west shoot-out.  When the Player's Star attacks the b-list Opponent, the opponent instantly counter-attacks.  It is possible for the Star-Power points to drop below zero on the same round for both the Player's Star and the b-list Opponent.  In this situation, both are dead and the game is over.

# Object Properties
* The game starts with 10 characters, although only 4 will be part of the game play.
* The characters are in an array 'charactersAll' and the # of characters to start the game can also be changed by changing the property 'charNumToPlay'.
* 'charactersAll' array is shuffled to ensure random chance for any 4 of the characters to be chosen to start the game.
* After the 'charactersAll' array is shuffled, the first 4 indexed items in the array are pushed to the 'characters' array.
* Three generic arrays exists to create a list of values for Health Points, Attack Points and Counter Attack Points.  The arrays are called 'valDeck', 'valDeck1', and 'valDeck2'.  Health Points can range from 100 to 200.  Attack Points and Counter Attack Points can range from 1 to 25.  After the values in the generic array is created, then the first 4 indexed values in each array is added to the 'healthArray', 'attackArray', and 'counterAttackArray'. 
* The 4 characters' are displayed in the browser
* player chooses a character by clicking on the picture.  Information about the player is stored in the variables 'player', 'playerHealth', 'playerAttackBase', 'playerAttack', and 'playerCounter'.
* The chosen character is removed from the 'characters' array.
* The remaining three characters are displayed so the player can pick an opponent.  Information about the opponent is stored in the variables 'opponent', 'opponentHealth', 'opponentAttack', and 'opponentCounter;.

# Object Methods
* The only method that exists in the object is 'shuffle' used by the generic valDeck's to create the necessary character values and the character point values.

# Functions
* All functions are wrapped inside jQuery's document.ready.
* NOTE:  I have a question about whether to use $(document).ready(function() {} or $(function() {}.  I feel the former is noted as being deprecated in the jQuery documentation.  
* Generic Functions
  * elementToggle - adds or removes a class from an element.  In this application used to show or hide divs.
  * 

* restart()
  * Hide Containers
  * Empty the Character Array
  * Shuffle the All Character List so the 4 out of the 10 characters are picked at random
  * Create the Health Points, Attack Points, and Counter Attack Points Arrays
  * Fill the character array and the points arrays with the 1st four 
  * Create the character list
  * Create empty player circle
  * Show the Character Container

* createCharList()
  * Remove eny elements previously created to clear the dom
  * identify the characters in the array and create the HTML to hold them in a list
  * create a string to insert the correct picture
  * create a string to append to the div
  * append

* createPlayerCircle()
  * Remove eny elements previously created to clear the dom
  * create a string to insert the correct picture
  * create a string to append to the div
  * append

* createBattleField()
  * Remove eny elements previously created to clear the dom
  * create a string to insert the correct picture
  * create a string to append to the div
  * append
  * Hide the Opponent List Container

* four on-click listeners
  * characterList
  * opponentsAvailList
  * attack "button" (this isn't a button, it's a .png file)
  * restart button




