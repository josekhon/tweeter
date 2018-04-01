"use strict";

const ObjectId = require("mongodb").ObjectID;
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

      db.collection("tweets").insertOne(newTweet, function(err, res) {
        if (err) {
          console.log(err);
        }
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(function(err, res) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, res.sort(sortNewestFirst));
      });
    },

   // Like tweet in DB. True or false
    likeTweet: function(id, callback) {
      db.collection("tweets").findOne({
        _id: ObjectId(id)
      }, function(err, tweet) {

        if (err) {
          return callback(err);
        }

        if (tweet.liked === true) {
          db.collection("tweets").updateOne({
            _id: ObjectId(id)
          }, {
            $set: {
              "liked": false
            }
          }, function(err, result) {
            if (err) {
              return callback(err);
            }
            return callback(null, false);
          });
        } else if (tweet.liked === false || tweet.liked === undefined) {
          db.collection("tweets").updateOne({
            _id: ObjectId(id)
          }, {
            $set: {
              "liked": true
            }
          }, function(err, result) {
            if (err) {
              return callback(err);
            }
            return callback(null, true);
          });
        }

      });
    }
  };
}

