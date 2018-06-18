const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName); //データベース名

  removeDocument(db, function() {
    client.close();
  });
});

//insert statement
const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('node_test'); //コレクション名
  // Insert some documents
  collection.insertMany([
    {cd : 1001}, {cd : 1002}, {a : 1003}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

//find all statement
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('node_test');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

//find filter statement
// var findDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('node_test');
//   // Find some documents
//   collection.find({'cd': 1001}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     console.log("Found the following records");
//     console.log(docs);
//     callback(docs);
//   });
// }

//update statement
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('node_test');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 1003 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });
}

//Remove the document
var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('node_test');
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });
}
