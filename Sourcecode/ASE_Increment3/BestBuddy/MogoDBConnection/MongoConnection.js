/**
 * Created by Vijaya Yeruva on 4/10/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://twitter:twitter@ds159180.mlab.com:59180/bestbuddy';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});