function initializeGame(){
	squares = [];
	turns = 0;
	males = [];
	females = [];
	children = [];

	var totalW = 0;
	var totalH = 0;
	var rowCount = 0;
	var colCount = 0;
	var xInitCount = 0;
	var yInitCount = 0;
	while (totalH < maxH){
		totalW = 0;
		xInitCount = 0;
		colCount = 0;
		squares.push([]);

		while (totalW < maxW){
			var s = square.clone();
			s.css("left", totalW+borderW);
			s.css("top", totalH+borderW);

			var sObj = $.extend(true, {}, squareObj);
			sObj.elem = s;
			sObj.x = xInitCount;
			sObj.y = yInitCount;

			$("#board").append(sObj.elem);
			squares[squares.length-1].push(sObj);

			totalW += w + borderW*2;
			colCount++;
			xInitCount++;
		}

		totalH += w + borderW*2;
		rowCount++;
		yInitCount++;
	}
	// Initialize one male + one female
	var x = Math.floor(colCount/2);
	var y = Math.floor(rowCount/2);
	//males.push(person.clone().init("male", randEmptySquare(), 20));
	//females.push(person.clone().init("female", randEmptySquare(), 20));
	males.push(person.clone().init("male", getSquareFromCoords(x,y), copulatingAge));
	females.push(person.clone().init("female", getSquareFromCoords(x+1,y), copulatingAge));

	if (verbose)
		console.log("New generation");
};