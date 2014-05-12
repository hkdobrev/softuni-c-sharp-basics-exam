#!/usr/bin/env node

function getWeight( word ) {
    var weights = {
        a: 5,
        b: -12,
        c: 47,
        d: 7,
        e: -32
    },
        wordLength = 5,
        sum = 0,
        visited = {
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0
        },
        character;

    while ( wordLength-- > 0 ) {
        character = word[ wordLength ];
        if ( !visited[ character ] ) {
            sum += weights[ character ];
            visited[ character ] = true;
        }
    }

    return sum;
}

function Solve(args) {
    var start = parseInt(args.shift(), 10),
        end = parseInt(args.shift(), 10),
        letters = ['a', 'b', 'c', 'd', 'e'],
        LIMIT = 5,
        i,j,k,l,m,
        results = [];

    function doPermute(input, results, numRepeat, index ) {
        var word, weight;

        for (var i = 0; i < input.length; i++) {
            results[index] = i

            if (index < numRepeat) {
                doPermute(input, results, numRepeat, index + 1);
            } else {
                word = [];
                for (var j = 0; j < numRepeat; j++) {
                    word[j] = input[results[j]];
                }
                weight = getWeight(word);
                if (weight >= start && weight <= end) {
                    console.log(word, weight);
                    results.push(word);
                }
            }
        }
    }

    doPermute(letters, results, letters.length, 0);

    // return results;
}

var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

rl.once("line", function( start ) {
    var args = [ start.toString().trim() ];

    rl.once("line", function( end ) {
        args.push( end.toString().trim() );
        console.log( Solve( args ) );
        process.exit(0);
    });
});
