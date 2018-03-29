"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {

        db.collection("tweets").insertOne(newTweet, function(err, res) {
          if(err) {
           console.log(err);
          } callback(null, true);
        });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
    db.collection("tweets").find().toArray(function(err, res) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, res.sort(sortNewestFirst));
    });

  }
}

}

