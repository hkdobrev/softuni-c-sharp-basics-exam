#!/usr/bin/env node

function Solve (args) {
    var
        startHour = parseInt(args.shift(), 10),
        startMinute = parseInt(args.shift(), 10),
        startPartOfDay = args.shift(),
        durationHours = parseInt(args.shift(), 10),
        durationMinutes = parseInt(args.shift(), 10),
        endPartOfDay = 'AM',
        endHour, endMinute, endHourString, endMinuteString;

    if (startPartOfDay == 'PM' && startHour < 12) {
        startHour += 12;
    } else if (startPartOfDay == 'AM' && startHour == 12) {
        startHour = 0;
    }

    endHour = startHour + durationHours;
    endMinute = startMinute + durationMinutes;

    if (endMinute >= 60) {
        endMinute -= 60;
        endHour++;
    }

    while (endHour >= 24) {
        endHour -= 24;
    }

    if (endHour >= 12) {
        endPartOfDay = 'PM';
    }

    if (endHour > 12) {
        endHour -= 12;
    } else if (endHour == 0) {
        endHour = 12;
    }

    if (endHour < 10) {
        endHour = '0' + endHour;
    }

    if (endMinute < 10) {
        endMinute = '0' + endMinute;
    }

    return [endHour + '', endMinute + '', endPartOfDay].join(':');
}

var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true
    });

rl.once("line", function( hour ) {
    var args = [ hour.toString().trim() ];

    rl.once("line", function( minutes ) {
        args.push( minutes.toString().trim() );

        rl.once("line", function( partOfDay ) {
            args.push( partOfDay.toString().trim() );

            rl.once("line", function( durationHours ) {
                args.push( durationHours.toString().trim() );

                rl.once("line", function( durationMinutes ) {
                    args.push( durationMinutes.toString().trim() );

                    console.log( Solve( args ) );
                    process.exit(0);
                });
            });
        });
    });
});
