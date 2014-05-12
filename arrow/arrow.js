#!/usr/bin/env node

function Solve (args) {
    var n = parseInt(args.shift(), 10),
        w = 2 * n - 1,
        line,
        lines = [];

    for (var i = 0; i < w; i++) {
        line = '';
        for (var j = 0; j < w; j++) {
            if (i < n) {
                if ( i == 0) {
                    if (j < n / 2 - 1 || j > n + n / 2 - 1) {
                        line += '.';
                    } else {
                        line += '#';
                    }
                } else {
                    if ((j == n / 2 - 1) || (j == n + n / 2 - 1)) {
                        line += '#'
                    } else {
                        line += '.';
                    }
                }
            }
        }
        lines.push(line);
    }

    return lines.join("\n");
}

var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

rl.once("line", function( n ) {
    console.log( Solve( [ n.toString().trim() ] ) );
    process.exit(0);
});
