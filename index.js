function makeChange(coins, value) {
	var solutions = [];
	makeChangeBacktracking(coins, value, [], solutions);

	if (!solutions.length) {
		//no solution was found
		return null;
	}

	var solutionsWithCount = solutions
		.map(function(solution) {
			return {
				cardinality: solution.reduce(function(coinCount, item) {
					return coinCount + item.numCoins;
				}, 0),
				solution: solution
			};
		})
		.sort(function(a, b) {
			if (a.cardinality === b.cardinality) {
				return 0;
			}

			return a.cardinality < b.cardinality ? -1 : 1;
		});

	//favor the solution with the least number of coins
	return solutionsWithCount[0].solution;

}

function makeChangeBacktracking(coins, value, resultCoins, solutions) {
	var newResult = resultCoins.concat([]);

	for (var i = 0; i < coins.length; i++) {
		var coinValue = coins[i];
		if (coinValue > value) {
			//e.g. trying to change 5 cents with a quarter: can't be done
			//so try the next coin
			continue;
		}

		var remainingValue = value % coinValue,
			numCoins = Math.floor(value / coinValue);

		newResult.push({
			coinValue: coinValue,
			numCoins: numCoins
		});

		if (remainingValue === 0) {
			//it worked!
			solutions.push(newResult.concat([]));

			//but let's keep trying, maybe there's something better?
			newResult.pop();
			continue;
		}

		//there's still some remaining money to change, so keep going
		makeChangeBacktracking(coins, remainingValue, newResult, solutions);

		//keep trying until we run out of coins
		newResult.pop();
	}

	//none of the coins worked out, not a solution :(
	return null;
}

module.exports = makeChange;
