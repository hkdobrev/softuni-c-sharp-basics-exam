#!/usr/bin/env node

function Solve (args) {
    var
        LIMIT = 19,
        leftMostBitPosition = LIMIT - 1,
        leftMostBit = 1 << leftMostBitPosition,
        n = parseInt(args.shift(), 10),
        fixedPosition = parseInt(args.shift(), 10),
        r = parseInt(args.shift(), 10),
        // Get the value on the fixed position
        fixed = n >> fixedPosition & 1,
        right, previous;

    while ( r-- ) {
        // Get the most right bit
        if (fixedPosition == 0) {
            right = (n & (1 << 1)) >> 1;
        } else {
            right = n & 1;
        }

        // Move everything to the right
        n >>= 1;

        // Set the most left bit if the previous most right was set
        if ( right ) {
            n = n | leftMostBit;
        }

        // Get the bit which is in the fixed position
        previous = n >> fixedPosition & 1;

        // Set the next bit with its value (jump the fixed position)
        if ( previous ) {
            n |= (previous << (fixedPosition - 1));
        } else {
            n &= ~(1 << (fixedPosition - 1));
        }

        // Set the fixed position with the fixed value
        n |= (fixed << fixedPosition);
    }

    return n;
}

var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

rl.once("line", function( n ) {
    var args = [ n.toString().trim() ];

    rl.once("line", function( f ) {
        args.push( f.toString().trim() );

        rl.once("line", function( r ) {
            args.push( r.toString().trim() );
            console.log( Solve( args ) );
            process.exit(0);
        });
    });
});
