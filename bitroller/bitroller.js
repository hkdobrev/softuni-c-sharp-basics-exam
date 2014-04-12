#!/usr/bin/env node

function Solve (args) {
    console.log(args);
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
