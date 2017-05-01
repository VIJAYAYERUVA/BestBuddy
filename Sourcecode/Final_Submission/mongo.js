/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var result={'body': []};
var url = 'mongodb://VIJAYAYERUVA:VIJAYAYERUVA@ds123361.mlab.com:23361/restapi';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
        processRecord(function(){
            res.write("Successfully processed");
            res.end();
        });
    });
})

var insertDocument = function(db, data, callback) {
    db.collection('BESTBUDDY').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the Sentiment collection.");
        callback();
    });
};

var processRecord = function(callback) {
        var PythonShell = require('python-shell');

        var options = {
          mode: 'text',
          pythonPath: '/usr/bin/python3.4',
          pythonOptions: ['-u'],
          scriptPath: '/home/vijaya/Downloads/BestBuddy/',
        };

        PythonShell.run('UI.py', options, function (err) {
          //if (err) throw err;
          // results is an array consisting of messages collected during execution
          console.log("python results");
        });
        console.log("Processed the record.");
        callback();
};

app.post('/get-data',function (req,res) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findUser(db, function() {
            db.close();
        });
    });
    var findUser = function(db, callback) {
        var cursor =db.collection('Sentiment').find();
        cursor.toArray(function(err, doc) {
            assert.equal(err, null);
            j=doc;
            JSON.stringify(j);
            doc1=j;
            for (var i=0;i<doc.length;i++) {
                result.body.push({"ID":doc[i]._id,"Text": doc[i].text,"Sentiment": doc[i].Sentiment});
            }console.log(result);
            res.contentType('application/json');
            res.write(JSON.stringify(j));
            res.end();
        });
    };
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
