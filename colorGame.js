/**
	Interactive javascript for the rbg game 
	A multi-level game with levels of hard vs easy 
	that allows a user to guess the color based on
	an rgb hint to the user
*/

var colors = [];
var pickedColor, squares, colorDisplay, backgroundColor,
    messageDisplay, h1, resetButton, modeButtons;
var numSquares = 6;

$(document).ready(function() {
    squares = document.querySelectorAll(".square");
    colorDisplay = document.getElementById("colorDisplay");
    backgroundColor = document.querySelector("body");
    messageDisplay = document.querySelector("#message");
    h1 = document.querySelector("h1");
    resetDisplay = document.querySelector("#reset");
    resetButton = document.getElementById("resetButton");
    modeButtons = document.querySelectorAll(".mode");

    //colorDisplay.textContent = pickedColor;

    //make sure that the default state is selected to hard mode
    modeButtons[1].classList.add("selected");

    init();

    resetButton.addEventListener("click", function() {
        reset();
    });
});

/**
 * Function to intialize square colors and the main header
 * 
 */
function init() {

    //create a new array of colors 
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    setupModeButtons();

    setupSquares();
}

/**
 *	Set up the mode - challenge level - of the game 
 */
function setupModeButtons() {
    //mode button listeners intialization 
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            //check squares to be displayed
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

/**
 *  Create the random colors on the square grid.
 *   Add event listeners for each of the individual squares:
 * 		event will allow sqaures to disappear of they match the correct
 *		square
 */
function setupSquares() {
    //square listeners intialization
    for (var i = 0; i < squares.length; i++) {
        //intial colors to squares
        squares[i].style.background = colors[i];

        //add click listeners to squares 
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.background;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
                resetDisplay.textContent = "Play again?";

            } else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}
/**
 * 	Generate new square grid with random colors
 * 		Pick a new winning color
 *		Allow the page to display all the created changes
 */
function reset() {
    //create a new array of colors 
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();

    colorDisplay.textContent = pickedColor;

    //remove color from header
    h1.style.background = "steelblue";
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";

    //reset the grid 
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            //insure all squares are visible
            squares[i].style.display = "block";
            //intial colors to squares
            squares[i].style.background = colors[i];

        } else {
            squares[i].style.display = "none";
        }
    }
}
/**
 * Change the grid color to the winning 
 *
 */
function changeColors(color) {
    //loop through all colors 
    for (var i = 0; i < colors.length; i++) {
        //change each color to match given color 
        squares[i].style.background = color;
    }
}

/**
 * Select a random color to be the winner 
 *
 */
function pickColor() {
    //pick random index in the colors array 
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

/**
 * Create an array of rgb colors 
 *  with length specified in the parameter
 */
function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        //generate random color
        arr[i] = generateRandomColor();
    }
    return arr;
}

/**
 *  Create a random rgb color
 *   Composed of a red,green,blue
 */
function generateRandomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    return "rgb(" + red + ", " + green +
        ", " + blue + ")";
}
