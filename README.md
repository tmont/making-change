# Makin' dat change

A function to make change from any number of coins
with arbitrary denominations. It uses
[backtracking](https://en.wikipedia.org/wiki/Backtracking)
to find the optimal solution. This uses JavaScript/Node.

It's not very efficient; some memoization could probably be used
to filter results that are already sub-optimal compared to
previous results.

This was inspired by Asaph's never-ending goal to get interviewees
to help him [make change](https://github.com/asaph/makechange).

## Usage
This module exports a single function:

```javascript
var makeChange = require('/path/to/making-change'),
    coins = [ 25, 10, 5, 1 ],
    changeToMake = 91;

console.log(makeChange(coins, changeToMake));

/*
[ { coinValue: 25, numCoins: 3 },
  { coinValue: 10, numCoins: 1 },
  { coinValue: 5, numCoins: 1 },
  { coinValue: 1, numCoins: 1 } ]
*/
```

NOTE: the `coins` given to the function MUST be sorted!
Obviously, it would be trivial to handle that within the function,
but meh.

If change cannot be made with the given coin denominations,
it will return `null`.


## Development

To run the tests, `npm install` and then `npm test`.
