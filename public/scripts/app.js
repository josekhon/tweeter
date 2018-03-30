
// Function to re-encode text to convert unsafe characters
//encoded into safe encoded representation

function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Takes the Object database and creates HTML article

function createTweetElement(tweets) {
  let user = tweets.user.name;
  let avatar = tweets.user.avatars.small;
  let userHandle = tweets.user.handle;
  let content = tweets.content.text;
  let dateCreated = tweets.created_at;
  let heartClasses = tweets.liked ? 'liked' : '';
  const tweetHTML =
`<article>
<header>
<img class="avatar" src="${escape(avatar)}" />
<h3 class="userName">${escape(user)}</h3>
<p class="handle">${escape(userHandle)}</p>
</header>
 <p class="tweet-content">${escape(content)}</p>
<footer>
<div>
<p class="date">${escape(dateCreated)} Days ago</p>
</div>
<div class="icons">
     <i class="fas fa-heart ${heartClasses}" data-tweet="${tweets._id}"></i>
     <i class="fas fa-flag"></i>
     <i class="fas fa-retweet"></i>
   </div>
 </footer>
</article>`;

  return tweetHTML;
}



// Array of tweets taken and prepended to the tweets container section

function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
    $("#tweets-container").prepend(createTweetElement(tweet));
  });
}



$(document).ready(function() {


  $("#newTweet").on("submit", function(event) {
    event.preventDefault();
    let tweetChar = $("#newTweet textarea").val().length;
    if (tweetChar > 140) {
      alert("It's a tweet, not an essay! Try again");
    } else if (tweetChar === 0) {
      alert("Come on, you have to tweet something!");
    } else {

      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $("#newTweet").serialize(),
        success: function(data) {
          loadTweets();
          $("#tweetSubmit").val("");
          $(".new-tweet").hide();

        }
      });
    }
  });

  $("body").on("click", ".fa-heart", function(event) {
    var button = $(this);
    var tweetID = button.attr("data-tweet");
    console.log(button);
    $.ajax({
      type:"PUT",
      url:`/tweets/${tweetID}/liked`,
      success: data => {
      button.toggleClass("liked");

    }
    });

  });





// Ajax used to GET tweets as a JSON object
//If Successful then tweet is prepended to tweets container calling the render function

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
      success: function(data) {
        $("#tweets-container").empty();
        renderTweets(data);
      }
    });
  }
  loadTweets();

// Toggles the compose form when Compose button on the navbar clicked

  $(".new-tweet").hide();
  $("#compose").on("click", function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();

  });

});










