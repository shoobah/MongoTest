/*global console*/
'use strict';
/**
 * Created by Anders on 2013-11-19.
 */
var handleData = require('./handleData.js'),
    fs = require('fs'),

    start = process.hrtime(),
    elapsed_time = function (note) {
        var precision = 3; // 3 decimal places
        var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
        console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
        start = process.hrtime(); // reset the timer
    };

fs.readFile('./Data/flatlist.json', {encoding: 'utf8'}, function (err, data) {
    if (err) {
        throw err;
    }

    var obj = JSON.parse(data),
        total = 0,
        max = 0,
        biggestPage,
        number = 0;

    elapsed_time("Data parsed");

    for (var i = 0; i < obj.length; i++) {
        var size = Object.size(obj[i]);
        if (size > max) {
            max = size;
            biggestPage = obj[i];
        }
        total += size;
        number += 1;
    }
    elapsed_time("Check stuff");
    console.log("Totalt %d KiB", total / 1024);
    console.log("Största sidan %s är %d KiB", biggestPage.PageName, max / 1024);
    console.log("Medelstorleken för %d sidor är %d KiB", number, total / number / 1024);

    handleData.savePageData(obj, 'pages');
    elapsed_time("Data inserted");
});

Object.size = function roughSizeOfObject(object) {
    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while (stack.length) {
        var value = stack.pop();

        if (typeof value === 'boolean') {
            bytes += 4;
        }
        else if (typeof value === 'string') {
            bytes += value.length * 2;
        }
        else if (typeof value === 'number') {
            bytes += 8;
        }
        else if
            (
            typeof value === 'object' && objectList.indexOf(value) === -1
            ) {
            objectList.push(value);

            for (var i in value) {
                if (value.hasOwnProperty(i)) {
                    stack.push(value[i]);
                }
            }
        }
    }
    return bytes;
};

//insertdata.save([obj, obj2]);