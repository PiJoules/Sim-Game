


initializeGame();


(function game(){
	setTimeout(function(){
		for (var i = 0; i < males.length; i++)
			males[i].moveToRand();
		for (var i = 0; i < females.length; i++)
			females[i].moveToRand();

		for (var i = 0; i < females.length; i++){
			var child = females[i].copulate();
			if (child !== null){
				children.push(child);
			}
		}

		for (var i = 0; i < children.length; i++){
			if (children[i].gender === "male")
				males.push(children[i]);
			else if (children[i].gender === "female")
				females.push(children[i]);
		}
		if (verbose && children.length > 0){
			var end = children.length === 1 ? " child born" : " children born";
			console.log(children.length + end);
		}
		children = []; // empty array

		// Time transition actions

		// Calculate resources
		for (var y = 0; y < squares.length; y++){
			for (var x = 0; x < squares[0].length; x++){
				var square = squares[y][x];
				if (square.isEmpty())
					square.resources++;
				else
					square.resources -= personConsumption;
				if (square.resources < 0)
					square.resources = 0;
				else if (square.resources > maxResources)
					square.resources = maxResources;

				// Adjust color depending on resources count
				if (square.isEmpty()){
					square.setColor(backgroundColor(square.resources/parseFloat(maxResources)));
				}
			}
		}

		turns++;

		// Check fro game over
		if (males.length <= 0 && females.length <= 0)
			initializeGame();

		game();
	}, 100);
})();