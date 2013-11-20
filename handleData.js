/*global console*/
'use strict';

var MongoClient = require('mongodb').MongoClient;

exports.savePageData = function (dataToSave, collectionName) {
    MongoClient.connect('mongodb://127.0.0.1:27017/insikten', function (err, db) {

        if (err) {
            throw err;
        }

        var collection = db.collection(collectionName);

        collection.insert(dataToSave, {w: 1, safe: true}, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("inserted %d items to collection %s ", dataToSave.length, collectionName);
        });
    });
};

exports.deleteAll = function () {
    MongoClient.connect('mongodb://127.0.0.1:27017/insikten', function (err, db) {

        if (err) {
            throw err;
        }

        var collection = db.collection('pages');

        collection.remove({w: 0}, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("Removed all data!");
        });
    });
};