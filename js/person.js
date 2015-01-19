var person = {
	"gender": null, // male/female
	"color": null, // red/yellow
	"square": null,
	"age": null,
	"init": function(gender, square, age){
		this.gender = gender;
		if (gender === "male"){
			this.color = "red";
		}
		else if (gender === "female"){
			this.color = "yellow";
		}
		this.square = square;
		square.setOccupant(this);
		this.age = age;
		return this;
	},
	"clone": function(){
		return $.extend(true, {}, this);
	},
	"moveTo": function(destSquare){
		this.square.setOccupant(null);
		destSquare.setOccupant(this);
		this.square = destSquare;

		this.update();
	},
	"moveToRand": function(){
		var adjSquares = getAdjascentSquares(this.square, true);
		for (var i = adjSquares.length-1; i >=0; i--){
			if (!this.canMoveToSquare(adjSquares[i])){
				adjSquares.splice(i,1);
			}
		}

		if (adjSquares.length <= 0 || this.age > maxAge){
			this.kill();
			return;
		}

		adjSquares.push(this.square);
		this.moveTo(adjSquares[randInt(adjSquares.length)]);
	},

	// Can move to square if it has resources
	"canMoveToSquare": function(square){
		return square.resources > 0;
	},

	"update": function(){
		this.age++;
	},

	// Set square occupant to null
	// and remove the person from either males or females array
	"kill": function(){
		this.square.setOccupant(null);
		if (this.gender === "male"){
		    for (var i = 0; i < males.length; i++) {
		        if (males[i] === this) {
		        	males.splice(i,1);
		        }
		    }
		}
		else if (this.gender === "female"){
		    for (var i = 0; i < females.length; i++) {
		        if (females[i] === this) {
		            females.splice(i,1);
		        }
		    }
		}
		
		if (verbose)
			console.log("someone died at age " + this.age);
	},

	// Give birth if a female is next to a male
	// after moving
	"copulate": function(){
		var emptySquares = getAdjascentSquares(this.square, true);

		if (emptySquares.length === 0 || this.age < copulatingAge)
			return null;

		var adjSquares = getAdjascentSquares(this.square, false);
		for (var i = 0; i < adjSquares.length; i++){
			if (adjSquares[i].occupant !== null){
				if (adjSquares[i].occupant.gender === "male" && adjSquares[i].occupant.age >= copulatingAge){
					var rand = Math.random();
					var child;
					if (rand < 0.5)
						child = person.clone().init("male", emptySquares[randInt(emptySquares.length)], 0);
					else
						child = person.clone().init("female", emptySquares[randInt(emptySquares.length)], 0);
					return child;
				}
			}
		}

		return null;
	}
};