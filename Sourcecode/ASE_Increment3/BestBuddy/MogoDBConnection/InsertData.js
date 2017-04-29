/**
 * Created by Vijaya Yeruva on 4/10/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://twitter:twitter@ds159180.mlab.com:59180/bestbuddy';
var insertDocument = function(db, callback) {
    db.collection('twitter').insertOne( {
        "tid" : "1491864886.0338187",
        "ttext" : "RT @WeLoveRobDyrdek: Honestly if you're sad just watch this https:\/\/t.co\/X7Ix3MK1g2",
        "tsentiment": "-0.008333333333333304"},
        function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the restaurants collection.");
        callback();
    });
};
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocument(db, function() {
        db.close();
    });
});