/**
 * Created by Vijaya Yeruva on 4/10/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://twitter:twitter@ds159180.mlab.com:59180/bestbuddy';
var findUser = function(db, callback) {
    var cursor =db.collection('twitter').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            callback();
        }
    });
};
var findUserwithSentiment = function(db,callback) {
    var cursor = db.collection('twitter').find({"tsentiment":"0.0"});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("Twitter ID:" + doc.tid);
            console.log("Twitter Text:" + doc.ttext);
            console.log("Twitter Sentiment:" + doc.tsentiment);
        }
    });
}
var findUserwithText = function(db, callback) {
    var cursor = db.collection('twitter').find({"ttext":"like"});
    cursor.each(function(err,doc){
       assert.equal(err,null);
       if(doc != null)
       {
           console.log("Twitter ID:" + doc.fname);
           console.log("Twitter Text:" + doc.lname);
           console.log("Twitter Sentiment:" + doc.address.city);
       }
    });
}
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findUserwithSentiment(db, function() {
        db.close();
    });
});