#!/usr/bin/env node

function Solve (args) {
    var input = args.shift(),
        numbers = input.split(' '),
        sumEven = 0, sumOdd = 0,
        maxEven = -1000000, maxOdd = -1000000,
        minEven =  1000000, minOdd =  1000000,
        hasEven = false,
        n;

    for (var i = 0; i < numbers.length; i++) {
        n = parseFloat(numbers[i]);

        if (i % 2 == 0) {
            sumOdd += n;
            if (maxOdd < n) {
                maxOdd = n;
            }

            if (minOdd > n) {
                minOdd = n
            }
        } else {
            hasEven = true;
            sumEven += n;
            if (maxEven < n) {
                maxEven = n;
            }

            if (minEven > n) {
                minEven = n
            }
        }
    }

    sumEven = parseFloat(sumEven.toFixed(2));
    minEven = parseFloat(minEven.toFixed(2));
    maxEven = parseFloat(maxEven.toFixed(2));
    sumOdd = parseFloat(sumOdd.toFixed(2));
    minOdd = parseFloat(minOdd.toFixed(2));
    maxOdd = parseFloat(maxOdd.toFixed(2));

    if (!hasEven) {
        sumEven = 'No';
        minEven = 'No';
        maxEven = 'No';
    }

    return [
        'OddSum=' + sumOdd,
        'OddMin=' + minOdd,
        'OddMax=' + maxOdd,
        'EvenSum=' + sumEven,
        'EvenMin=' + minEven,
        'EvenMax=' + maxEven
    ].join(', ');
}

var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

rl.once("line", function( hour ) {
    var args = [ hour.toString().trim() ];

    console.log( Solve( args ) );
    process.exit(0);
});
