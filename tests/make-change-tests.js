var should = require('should'),
	makeChange = require('../index');

describe('Makin\' dat change', function() {
	function verifyResult(result, expectedValue) {
		var actualValue = result.reduce(function(sum, item) {
			return sum + (item.coinValue * item.numCoins);
		}, 0);

		actualValue.should.equal(expectedValue);
	}

	it('should choose largest coins first', function() {
		var coins = [ 1, 5, 10, 25 ].reverse(),
			change = 91;

		var result = makeChange(coins, change);
		should.exist(result);

		result.should.eql([
			{ coinValue: 25, numCoins: 3 },
			{ coinValue: 10, numCoins: 1 },
			{ coinValue: 5, numCoins: 1 },
			{ coinValue: 1, numCoins: 1 }
		]);

		verifyResult(result, change);
	});

	it('should still work if coins are not sorted', function() {
		var coins = [ 5, 1, 25, 10 ].reverse(),
			change = 91;

		var result = makeChange(coins, change);
		should.exist(result);

		result.should.eql([
			{ coinValue: 25, numCoins: 3 },
			{ coinValue: 10, numCoins: 1 },
			{ coinValue: 5, numCoins: 1 },
			{ coinValue: 1, numCoins: 1 }
		]);

		verifyResult(result, change);
	});

	it('should find favor solution with least number of coins', function() {
		var coins = [ 1, 8, 10 ].reverse(),
			change = 24;

		var result = makeChange(coins, change);
		should.exist(result);

		result.should.eql([
			{ coinValue: 8, numCoins: 3 }
		]);

		verifyResult(result, change);
	});

	it('should handle case where change cannot be made', function() {
		var coins = [ 2, 5, 10 ].reverse(),
			change = 21;

		var result = makeChange(coins, change);
		should.not.exist(result);
	});
});