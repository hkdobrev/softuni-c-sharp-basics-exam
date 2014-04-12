#!/usr/bin/env node

function Solve (args) {
    var
        LIMIT = 19,
        leftMostBit = 1 << (LIMIT - 1),
        n = args.shift(),
        f = args.shift(),
        r = args.shift(),
        fixed = n >> f & 1,
        i = 0,
        right, previous;

    for ( ; i < r; i++ ) {
        right = n & 1;
        previous = (n >> (f + 1)) & 1;
        n >>= 1;
        if ( right ) {
            n = n | leftMostBit;
        }
        previous = n >> f & 1;
        if ( previous ) {
            n |= (previous << (f - 1));
        } else {
            n &= ~(1 << (f - 1));
        }
        n |= (fixed << f);
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
