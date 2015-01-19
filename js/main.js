
var verbose = true;
var w = 20; // square width
var borderW = 1; // border width
function backgroundColor(alpha){
	return "rgba(34,139,34," + alpha + ")";
};
var maxResources = 5;
var maxAge = 40;
var copulatingAge = 13; // min age at which two people can copulate
var personConsumption = 2; // rate at which resources are lost on a square

var maxW = Math.min(window.innerWidth,1360);
var maxH = Math.min(window.innerHeight,660);

var square = $("<div class='square'></div>");
square.css({
	"width": w + "px",
	"height": w + "px",
	"border": borderW + " solid black",
	"background-color": backgroundColor(1)
});
var squareObj = {
	"elem": null,
	"occupant": null, // male/female/null (string)
	"x": null,
	"y": null,
	"resources": maxResources, // cannot move onto this square if 0 resources
	"setOccupant": function(occupant){
		if (occupant === null){
			this.occupant = null;
			this.setColor(backgroundColor(1));
		}
		else if (occupant.gender === "male" || occupant.gender === "female"){
			this.occupant = occupant;
			this.setColor(occupant.color);
		}
	},
	"isEmpty": function(){
		return this.occupant === null;
	},
	"setColor": function(color){
		this.elem.css("background-color", color);
	}
};

var squares;
var turns;
var males;
var females;
var children; // queue for new people to add to males and females


// Generate random int from 0 to n-1
// For random between 0-10, pass 11 as n
function randInt(n){
	return Math.floor(Math.random()*n);
};

// Gets a random empty square
// Returns null if all filled
function randEmptySquare(){
	var emptySquares = [];
	for (var y = 0; y < squares.length; y++){
		for (var x = 0; x < squares[0].length; x++){
			if (squares[y][x].isEmpty())
				emptySquares.push(squares[y][x]);
		}
	}
	if (emptySquares.length === 0)
		return null;
	return emptySquares[randInt(emptySquares.length)];
};

// Return array of adjascent squares to given square
function getAdjascentSquares(square, onlyEmpty){
	var openSquares = [];
	for (var y = Math.max(0,square.y-1); y < Math.min(square.y+2,squares.length); y++){
		for (var x = Math.max(0,square.x-1); x < Math.min(square.x+2,squares[0].length); x++){
			if (square.x === x && square.y === y)
				continue; // ignore the center square
			if (onlyEmpty){
				if (squares[y][x].isEmpty()){
					openSquares.push(squares[y][x]);
				}
			}
			else {
				openSquares.push(squares[y][x]);
			}
		}
	}
	return openSquares;
};

function getSquareFromCoords(x, y){
	return squares[y][x];
};


